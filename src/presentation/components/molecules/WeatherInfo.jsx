import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Wind, CloudSun, Compass, Sparkles } from 'lucide-react';

export function WeatherInfo({ condition, temp, recommendation }) {
  const getWeatherIcon = (cond) => {
    const condLower = (cond || '').toLowerCase();
    if (condLower.includes('sunny') || condLower.includes('clear')) {
      return <Sun className="w-10 h-10 text-yellow-500 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)] animate-pulse" />;
    } else if (condLower.includes('rain') || condLower.includes('shower') || condLower.includes('wet') || condLower.includes('drizzle')) {
      return <CloudRain className="w-10 h-10 text-blue-500 drop-shadow-[0_2px_8px_rgba(59,130,246,0.3)]" />;
    } else if (condLower.includes('thunder') || condLower.includes('storm')) {
      return <CloudLightning className="w-10 h-10 text-slate-600 drop-shadow-[0_2px_8px_rgba(71,85,105,0.3)]" />;
    } else if (condLower.includes('cloud')) {
      return <Cloud className="w-10 h-10 text-slate-400 drop-shadow-[0_2px_8px_rgba(148,163,184,0.2)]" />;
    } else if (condLower.includes('wind')) {
      return <Wind className="w-10 h-10 text-slate-400" />;
    }
    return <CloudSun className="w-10 h-10 text-amber-500 drop-shadow-[0_2px_8px_rgba(245,158,11,0.2)]" />;
  };

  // Generate plausible weather metrics based on condition
  const getMockMetrics = (cond) => {
    const condLower = (cond || '').toLowerCase();
    if (condLower.includes('sunny') || condLower.includes('clear')) {
      return { humidity: '62%', wind: '8 km/h', uv: 'High' };
    } else if (condLower.includes('rain') || condLower.includes('shower') || condLower.includes('storm')) {
      return { humidity: '92%', wind: '22 km/h', uv: 'Low' };
    }
    return { humidity: '76%', wind: '12 km/h', uv: 'Moderate' };
  };

  const metrics = getMockMetrics(condition);

  return (
    <div className="bg-gradient-to-br from-surface-container-low to-surface-container-high rounded-2xl p-5 border border-outline flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Primary Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white/60 dark:bg-black/10 p-3 rounded-2xl border border-white/40 dark:border-black/5 flex items-center justify-center shadow-inner">
            {getWeatherIcon(condition)}
          </div>
          <div>
            <div className="text-2xl font-extrabold text-on-surface tracking-tight leading-none mb-1">{temp}</div>
            <div className="text-xs font-bold text-primary capitalize bg-primary/10 border border-primary/10 px-2 py-0.5 rounded-full inline-block">
              {condition}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Weather Metrics Panel */}
      <div className="grid grid-cols-3 gap-2 bg-surface/50 border border-outline/5 rounded-xl p-3 text-center">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Humidity</span>
          <span className="text-xs font-extrabold text-on-surface">{metrics.humidity}</span>
        </div>
        <div className="flex flex-col gap-0.5 border-x border-outline/10">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Wind</span>
          <span className="text-xs font-extrabold text-on-surface">{metrics.wind}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">UV Index</span>
          <span className="text-xs font-extrabold text-on-surface">{metrics.uv}</span>
        </div>
      </div>

      {/* Guide Tips Card */}
      {recommendation && (
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-3.5 flex items-start gap-2.5">
          <Compass className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 animate-pulse" /> Guide Recommendation
            </span>
            <p className="text-xs font-semibold leading-relaxed text-on-surface-variant">
              {recommendation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

