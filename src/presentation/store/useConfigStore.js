import { create } from 'zustand';

export const useConfigStore = create((set) => ({
  demoMode: localStorage.getItem('nusaguide_demo_mode') !== 'false',
  apiKey: localStorage.getItem('nusaguide_api_key') || '',
  apiStatus: { geminiActive: false, openWeatherActive: false },

  setDemoMode: (val) => {
    localStorage.setItem('nusaguide_demo_mode', val);
    set({ demoMode: val });
  },

  setApiKey: (key) => {
    localStorage.setItem('nusaguide_api_key', key);
    set({ apiKey: key });
  },

  fetchBackendStatus: async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        set({ apiStatus: data });
        if (data.geminiActive) {
          localStorage.setItem('nusaguide_demo_mode', 'false');
          set({ demoMode: false });
        } else {
          localStorage.setItem('nusaguide_demo_mode', 'true');
          set({ demoMode: true });
        }
      }
    } catch (err) {
      console.warn('[NusaGuide AI] Backend status endpoint offline. Defaulting to Demo Mode.', err);
      localStorage.setItem('nusaguide_demo_mode', 'true');
      set({ demoMode: true });
    }
  }
}));
