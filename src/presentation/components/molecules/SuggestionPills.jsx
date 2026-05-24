import React from 'react';
import { Compass } from 'lucide-react';

export function SuggestionPills({ onPillClick }) {
  const suggestions = [
    { label: "🎒 2 days vacation in Bandung", prompt: "Plan a 2-day vacation in Bandung focusing on nature and family cafes." },
    { label: "⛰️ Healing trip near Jakarta", prompt: "Plan a 1-day healing trip near Jakarta like Bogor waterfalls and cafes." },
    { label: "👨‍👩‍👧 Jogja cultural trip (Budget: 2M)", prompt: "Plan a 3-day family trip to Jogja with 2 million Rupiah budget. Focus on culture." }
  ];

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5 mb-1">
        <Compass className="w-3.5 h-3.5 text-primary" /> Prompt Suggestions
      </h4>
      <div className="flex flex-col gap-2">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onPillClick(s.prompt)}
            className="text-left text-xs px-3.5 py-2.5 rounded-lg border border-outline hover:border-primary bg-surface-container hover:bg-surface-container-high transition-all duration-200 cursor-pointer text-on-surface hover:text-white"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
