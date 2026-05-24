import React from 'react';
import { Github } from 'lucide-react';

export function FloatingFooter() {
  return (
    <footer className="w-full flex justify-center mt-12 mb-4 shrink-0">
      <a
        href="https://github.com/adichondro"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 h-12 px-4 rounded-full bg-surface-container/60 backdrop-blur-md border border-outline/50 shadow-sm hover:shadow-md hover:bg-surface-container-high hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
      >
        {/* Left Side Label */}
        <span className="text-[11px] font-semibold text-on-surface-variant tracking-wide">
          Product by
        </span>

        {/* Divider line */}
        <span className="w-px h-4 bg-outline/25" />

        {/* Profile Card */}
        <div className="flex items-center gap-2">
          {/* GitHub Avatar */}
          <img
            src="https://github.com/adichondro.png"
            alt="adichondro avatar"
            className="w-6 h-6 rounded-full border border-outline/30 object-cover"
            onError={(e) => {
              // Fallback if network fails
              e.target.src = 'https://avatars.githubusercontent.com/u/9919?v=4';
            }}
          />

          {/* Username */}
          <span className="text-xs font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
            adichondro
          </span>

          {/* Badge */}
          <span className="text-[9px] font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full shrink-0">
            Developer
          </span>
        </div>

        {/* Divider line */}
        <span className="w-px h-4 bg-outline/25" />

        {/* GitHub Icon */}
        <Github className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
      </a>
    </footer>
  );
}
