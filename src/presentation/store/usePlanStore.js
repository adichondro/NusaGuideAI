import { create } from 'zustand';
import { LocalStoragePlanRepository } from '../../infrastructure/repositories/LocalStoragePlanRepository';
import { ApiWeatherRepository } from '../../infrastructure/repositories/ApiWeatherRepository';
import { SavePlanUseCase } from '../../application/usecases/savePlanUseCase';
import { DeletePlanUseCase } from '../../application/usecases/deletePlanUseCase';
import { DeleteAllPlansUseCase } from '../../application/usecases/deleteAllPlansUseCase';
import { GetSavedPlansUseCase } from '../../application/usecases/getSavedPlansUseCase';
import { GetLiveWeatherUseCase } from '../../application/usecases/getLiveWeatherUseCase';

const planRepository = new LocalStoragePlanRepository();
const weatherRepository = new ApiWeatherRepository();

const savePlanUseCase = new SavePlanUseCase(planRepository);
const deletePlanUseCase = new DeletePlanUseCase(planRepository);
const deleteAllPlansUseCase = new DeleteAllPlansUseCase(planRepository);
const getSavedPlansUseCase = new GetSavedPlansUseCase(planRepository);
const getLiveWeatherUseCase = new GetLiveWeatherUseCase(weatherRepository);

export const usePlanStore = create((set, get) => ({
  savedPlans: [],
  activeTab: 'discover',
  activeMaps: {},

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  loadPlans: () => {
    const plans = getSavedPlansUseCase.execute();
    set({ savedPlans: plans });
  },

  savePlan: (planData) => {
    const saved = savePlanUseCase.execute(planData);
    get().loadPlans();
    return saved;
  },

  deletePlan: (planId) => {
    const maps = { ...get().activeMaps };
    delete maps[planId];
    
    deletePlanUseCase.execute(planId);
    set({ activeMaps: maps });
    get().loadPlans();
  },

  deleteAllPlans: () => {
    deleteAllPlansUseCase.execute();
    set({ activeMaps: {}, savedPlans: [] });
  },

  registerMap: (planId, mapInstance) => {
    set((state) => ({
      activeMaps: { ...state.activeMaps, [planId]: mapInstance }
    }));
  },

  updateWeatherForPlan: async (planId) => {
    const plans = get().savedPlans;
    const plan = plans.find(p => p.id === planId);
    if (!plan || !plan.locations || plan.locations.length === 0) return;

    const firstLoc = plan.locations.find(loc => typeof loc.latitude === 'number' && typeof loc.longitude === 'number');
    if (!firstLoc) return;

    try {
      const liveWeather = await getLiveWeatherUseCase.execute(firstLoc.latitude, firstLoc.longitude);
      
      set((state) => ({
        savedPlans: state.savedPlans.map(p => {
          if (p.id === planId) {
            const updated = { ...p };
            updated.weather_forecast = {
              condition: liveWeather.condition,
              temperature: liveWeather.temp,
              recommendation: liveWeather.condition.toLowerCase().includes('rain') 
                ? `Live Update: Heavy wet weather detected (${liveWeather.temp}). Outdoor walking is not recommended; seek shelter in indoor cafes or museums.`
                : `Live Update: Good weather forecast (${liveWeather.temp}, ${liveWeather.condition}). Outdoor activities are highly recommended!`
            };
            return updated;
          }
          return p;
        })
      }));
    } catch (err) {
      console.warn('Failed to retrieve live weather for plan', planId, err);
    }
  }
}));
