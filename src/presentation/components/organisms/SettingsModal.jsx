import React from 'react';
import { useConfigStore } from '../../store/useConfigStore';
import { useToastStore } from '../../store/useToastStore';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { X, Sliders, Play, CheckCircle2 } from 'lucide-react';

export function SettingsModal({ isOpen, onClose }) {
  const demoMode = useConfigStore((state) => state.demoMode);
  const setDemoMode = useConfigStore((state) => state.setDemoMode);
  const apiKey = useConfigStore((state) => state.apiKey);
  const setApiKey = useConfigStore((state) => state.setApiKey);
  const apiStatus = useConfigStore((state) => state.apiStatus);

  const showToast = useToastStore((state) => state.showToast);

  if (!isOpen) return null;

  const handleDemoToggle = (e) => {
    const checked = e.target.checked;
    setDemoMode(checked);
    showToast(
      checked ? "Demo Mode activated (using local simulation)." : "AI Mode activated (connecting to live APIs).",
      "info"
    );
  };

  const handleKeyChange = (e) => {
    const keyVal = e.target.value;
    setApiKey(keyVal);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Click outside to close (backdrop handler) */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="glass-panel relative max-w-md w-full rounded-2xl border border-outline p-6 flex flex-col gap-6 z-10 animate-[slideInToast_0.25s_ease-out]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-bold text-on-surface">Assistant Configuration</h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col gap-5">
          {/* Demo Mode Config */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Run in offline Demo Mode
              </span>
              <input
                type="checkbox"
                checked={demoMode}
                onChange={handleDemoToggle}
                className="w-9 h-5 bg-surface-container border border-outline rounded-full appearance-none checked:bg-primary relative before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-white before:top-[2px] before:left-[3px] checked:before:translate-x-4 before:transition-transform cursor-pointer"
              />
            </label>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              If enabled, NusaGuide AI will use offline simulation data for Bali, Bandung, Yogyakarta, and Bogor. Perfect for trying the app without configuring keys.
            </p>
          </div>

          {/* API Keys Config */}
          <div>
            <Input
              type="password"
              value={apiKey}
              onChange={handleKeyChange}
              label="Custom Gemini API Key"
              placeholder="Enter your Gemini API key (optional)..."
              description="Provide your own Gemini key to plan trips to any Indonesian destination. Your key is stored locally in the browser and will never leave your device."
            />
          </div>

          {/* Backend Status indicator */}
          <div className="bg-surface-container/30 border border-outline rounded-xl p-4 flex flex-col gap-2.5 text-[11px]">
            <h4 className="font-bold text-on-surface uppercase tracking-wider">Server Status Indicators</h4>
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant font-medium">Gemini AI Key:</span>
              <span className="flex items-center gap-1 font-bold text-xs">
                {apiStatus.geminiActive ? (
                  <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Configured (Server)</span>
                ) : apiKey ? (
                  <span className="text-primary flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Configured (Client)</span>
                ) : (
                  <span className="text-amber-500 flex items-center gap-1"><Play className="w-3.5 h-3.5 fill-current" /> Missing (Demo only)</span>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant font-medium">OpenWeather Key:</span>
              <span className="flex items-center gap-1 font-bold text-xs">
                {apiStatus.openWeatherActive ? (
                  <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Active (Server)</span>
                ) : (
                  <span className="text-amber-500 flex items-center gap-1"><Play className="w-3.5 h-3.5 fill-current" /> Fallback Active</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-3 border-t border-outline">
          <Button onClick={onClose} size="md">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
