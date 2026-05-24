import React from 'react';
import { SuggestionPills } from '../molecules/SuggestionPills';
import { Compass, HelpCircle, ArrowRight } from 'lucide-react';

export function Sidebar({ onPillClick }) {
  const steps = [
    "Type what city or region in Indonesia you wish to explore.",
    "Tell the AI details like budget, trip duration, or specific preferences.",
    "NusaGuide AI will generate a complete customized itinerary.",
    "Plans are auto-saved to your library with interactive map paths and live weather warnings."
  ];

  return (
    <aside className="glass-panel rounded-2xl p-6 flex flex-col gap-6 h-fit">
      {/* Brand/Feature Header */}
      <div>
        <h3 className="text-lg font-bold text-on-surface mb-2 flex items-center gap-2">
          <Compass className="w-5 h-5 text-primary" />
          <span>Interactive Planner</span>
        </h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Plan your perfect Indonesian trip with NusaGuide AI. Describe your dream vacation, and we'll draft it instantly.
        </p>
      </div>

      {/* How it Works */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5 border-b border-outline pb-2">
          <HelpCircle className="w-4 h-4 text-primary" />
          <span>How It Works</span>
        </h4>
        <ol className="flex flex-col gap-3">
          {steps.map((step, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs text-on-surface leading-normal">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Prompt Suggestions */}
      <div className="pt-2 border-t border-outline">
        <SuggestionPills onPillClick={onPillClick} />
      </div>
    </aside>
  );
}
