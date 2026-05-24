import React, { useState, useEffect } from 'react';
import { usePlanStore } from '../../store/usePlanStore';
import { useLeafletMap } from '../../hooks/useLeafletMap';
import { WeatherInfo } from '../molecules/WeatherInfo';
import { BudgetProgress } from '../molecules/BudgetProgress';
import { Button } from '../atoms/Button';
import { Trash2, Calendar, MapPin, DollarSign, CloudSun, Clock } from 'lucide-react';

export function ItineraryCard({ plan }) {
  const deletePlan = usePlanStore((state) => state.deletePlan);
  const updateWeatherForPlan = usePlanStore((state) => state.updateWeatherForPlan);
  
  const [activeDay, setActiveDay] = useState(1);
  const mapRef = useLeafletMap(plan);

  // Trigger live weather fetch on mount
  useEffect(() => {
    updateWeatherForPlan(plan.id);
  }, [plan.id, updateWeatherForPlan]);

  const totalBudget = (plan.budget_estimate?.hotel || 0) +
                       (plan.budget_estimate?.transportation || 0) +
                       (plan.budget_estimate?.food || 0) +
                       (plan.budget_estimate?.tickets || 0);

  const formatRupiah = (number) => {
    if (number === 0) return 'Rp0';
    return 'Rp' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const currentDayItinerary = plan.itinerary?.find(d => d.day === activeDay) || plan.itinerary?.[0];

  return (
    <div className="glass-panel rounded-2xl border border-outline overflow-hidden flex flex-col mb-8 transition-shadow hover:shadow-2xl">
      {/* Card Title Header */}
      <div className="px-6 py-5 border-b border-outline bg-surface-container/30 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-on-surface leading-snug">{plan.title}</h3>
          <div className="flex items-center gap-3 text-xs text-on-surface-variant font-semibold">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary" /> {plan.destination}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" /> {plan.duration_days} Days
            </span>
          </div>
        </div>
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete "${plan.title}"?`)) {
              deletePlan(plan.id);
            }
          }}
          className="!p-2.5 rounded-xl shrink-0"
          title="Delete Plan"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline">
        {/* Left Side: Map and Daily Schedule (7 Cols) */}
        <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-outline flex flex-col gap-6">
          {/* Leaflet Map Div */}
          <div>
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" /> Route Map
            </h4>
            <div
              ref={mapRef}
              style={{ height: '320px' }}
              className="w-full rounded-xl overflow-hidden border border-outline relative z-0"
            />
          </div>

          {/* Daily Schedule (Left Column below map) */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline/5 pb-2">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" /> Daily Schedule
              </h4>
              
              {/* Day Selector Tabs */}
              {plan.duration_days > 1 && (
                <div className="flex gap-1.5 bg-surface-container p-1 rounded-xl border border-outline/5 self-start sm:self-auto">
                  {Array.from({ length: plan.duration_days }, (_, i) => i + 1).map((dayNum) => (
                    <button
                      key={dayNum}
                      onClick={() => setActiveDay(dayNum)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        activeDay === dayNum
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-on-surface-variant hover:bg-surface/50 hover:text-on-surface'
                      }`}
                    >
                      Day {dayNum}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Activities Minimalist Vertical List */}
            <div className="flex flex-col gap-5 pl-4 relative border-l border-outline/15 ml-2 mt-2">
              {currentDayItinerary && currentDayItinerary.activities && currentDayItinerary.activities.length > 0 ? (
                currentDayItinerary.activities.map((act, actIdx) => (
                  <div 
                    key={actIdx} 
                    className="relative flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 group"
                  >
                    {/* Minimalist dot indicator on the left vertical border line */}
                    <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-outline group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
                    
                    {/* Time (Minimalist text) */}
                    <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-primary uppercase tracking-wider shrink-0 sm:w-28 sm:mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                      <span>{act.time}</span>
                    </div>
                    
                    {/* Activity details */}
                    <div className="flex-grow min-w-0">
                      <h5 className="text-xs font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">
                        {act.activity}
                      </h5>
                      <span className="text-[10px] text-on-surface-variant font-semibold flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-on-surface-variant/50 shrink-0" /> 
                        <span className="truncate">{act.location}</span>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-xs text-on-surface-variant font-medium">
                  No activities listed for this day.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Budget and Weather Outlook (5 Cols) */}
        <div className="lg:col-span-5 p-6 flex flex-col gap-6">
          {/* Budget Breakdown Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-primary" /> Budget Tracker
              </h4>
              <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                Total: {formatRupiah(totalBudget)}
              </span>
            </div>
            
            <div className="bg-surface-container/40 p-4 border border-outline rounded-xl">
              <BudgetProgress
                label="Lodging / Hotel"
                value={plan.budget_estimate?.hotel || 0}
                max={totalBudget}
                color="hotel"
              />
              <BudgetProgress
                label="Transportation"
                value={plan.budget_estimate?.transportation || 0}
                max={totalBudget}
                color="transport"
              />
              <BudgetProgress
                label="Food & Dining"
                value={plan.budget_estimate?.food || 0}
                max={totalBudget}
                color="food"
              />
              <BudgetProgress
                label="Tickets & Attractions"
                value={plan.budget_estimate?.tickets || 0}
                max={totalBudget}
                color="tickets"
              />
            </div>
          </div>

          {/* Weather Outlook Widget */}
          {plan.weather_forecast && (
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-primary" /> Weather Outlook
              </h4>
              <WeatherInfo
                condition={plan.weather_forecast.condition}
                temp={plan.weather_forecast.temperature}
                recommendation={plan.weather_forecast.recommendation}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
