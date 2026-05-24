import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanStore } from '../../store/usePlanStore';
import { useConfigStore } from '../../store/useConfigStore';
import { Compass, Map, Bookmark, Sliders, Play, CheckCircle2 } from 'lucide-react';

export function Navbar({ onSettingsOpen }) {
  const activeTab = usePlanStore((state) => state.activeTab);
  const demoMode = useConfigStore((state) => state.demoMode);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-outline bg-surface/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); navigate('/discover'); }}
            className="flex items-center gap-2 text-lg font-bold text-on-surface tracking-tight cursor-pointer"
          >
            <Compass className="w-6 h-6 text-primary" />
            <span>NusaGuide AI</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate('/discover')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer ${
                activeTab === 'discover' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Discover</span>
            </button>
            <button
              onClick={() => navigate('/planner')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer ${
                activeTab === 'planner' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Planner</span>
            </button>
            <button
              onClick={() => navigate('/saved-plans')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer ${
                activeTab === 'saved-plans' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Plans</span>
            </button>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                demoMode
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
              }`}
            >
              {demoMode ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Demo Mode</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AI Active</span>
                </>
              )}
            </div>
            <button
              onClick={onSettingsOpen}
              className="p-2.5 rounded-lg border border-outline hover:border-primary text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high transition-all duration-200 cursor-pointer"
              title="Assistant Config"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/90 border-t border-outline backdrop-blur-md flex items-center justify-around h-16 px-4">
        <button
          onClick={() => navigate('/discover')}
          className={`flex flex-col items-center justify-center gap-1 w-20 h-full text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
            activeTab === 'discover' ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Discover</span>
        </button>
        <button
          onClick={() => navigate('/planner')}
          className={`flex flex-col items-center justify-center gap-1 w-20 h-full text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
            activeTab === 'planner' ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <Map className="w-5 h-5" />
          <span>Planner</span>
        </button>
        <button
          onClick={() => navigate('/saved-plans')}
          className={`flex flex-col items-center justify-center gap-1 w-20 h-full text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
            activeTab === 'saved-plans' ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span>Saved Plans</span>
        </button>
      </div>
    </>
  );
}
