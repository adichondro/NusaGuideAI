import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Wind, CloudSun } from 'lucide-react';

export function WeatherInfo({ condition, temp, recommendation }) {
  const getWeatherIcon = (cond) => {
    const condLower = (cond || '').toLowerCase();
    if (condLower.includes('sunny') || condLower.includes('clear')) {
      return <Sun className="w-8 h-8 text-yellow-500" />;
    } else if (condLower.includes('rain') || condLower.includes('shower') || condLower.includes('wet') || condLower.includes('drizzle')) {
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    } else if (condLower.includes('thunder') || condLower.includes('storm')) {
      return <CloudLightning className="w-8 h-8 text-slate-500" />;
    } else if (condLower.includes('cloud')) {
      return <Cloud className="w-8 h-8 text-slate-400" />;
    } else if (condLower.includes('wind')) {
      return <Wind className="w-8 h-8 text-slate-300" />;
    }
    return <CloudSun className="w-8 h-8 text-amber-500" />;
  };

  return (
    <div className="bg-surface-container rounded-xl p-4 border border-outline flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="bg-surface-container-high p-2.5 rounded-lg border border-outline/10">
          {getWeatherIcon(condition)}
        </div>
        <div>
          <div className="text-xl font-bold text-on-surface">{temp}</div>
          <div className="text-sm font-semibold text-on-surface-variant capitalize">{condition}</div>
        </div>
      </div>
      {recommendation && (
        <div className="text-xs leading-relaxed text-on-surface-variant bg-surface/30 p-2.5 rounded border border-outline-variant/10">
          <strong className="text-on-surface">Guide tip:</strong> {recommendation}
        </div>
      )}
    </div>
  );
}
