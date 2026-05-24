import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanStore } from '../store/usePlanStore';
import { ItineraryCard } from '../components/organisms/ItineraryCard';
import { Button } from '../components/atoms/Button';
import { Bookmark, Trash2, Calendar, MapPin, Compass } from 'lucide-react';

export function SavedPlansPage() {
  const navigate = useNavigate();
  const savedPlans = usePlanStore((state) => state.savedPlans);
  const loadPlans = usePlanStore((state) => state.loadPlans);
  const deleteAllPlans = usePlanStore((state) => state.deleteAllPlans);

  // Load plans on component mount
  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete ALL saved itineraries? This action cannot be undone.")) {
      deleteAllPlans();
    }
  };

  const handleStartPlanning = () => {
    navigate('/planner');
  };

  return (
    <div className="flex flex-col gap-6 pb-12 animate-[slideInPage_0.3s_cubic-bezier(0.4,0,0.2,1)_forwards]">
      {/* Page Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-outline pb-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-on-surface">Your Saved Trip Library</h2>
        </div>
        
        {savedPlans.length > 0 && (
          <Button
            variant="danger"
            onClick={handleDeleteAll}
            icon={Trash2}
            className="flex items-center gap-1.5"
          >
            Delete All Plans
          </Button>
        )}
      </div>

      {/* Main Content Area */}
      {savedPlans.length === 0 ? (
        /* Empty State Panel */
        <div className="glass-panel rounded-2xl p-12 flex flex-col items-center text-center gap-5 border border-outline">
          <div className="bg-surface-container-high p-4 rounded-full border border-outline/10 text-on-surface-variant">
            <Bookmark className="w-8 h-8 text-on-surface-variant/40" />
          </div>
          <div>
            <h3 className="text-base font-bold text-on-surface mb-1.5">No Travel Plans Saved</h3>
            <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
              Your library is currently empty. Use the Planner chat to ask NusaGuide AI to generate a travel plan for you, and it will appear here automatically.
            </p>
          </div>
          <Button
            onClick={handleStartPlanning}
            icon={Compass}
            className="mt-2"
          >
            Start Planning
          </Button>
        </div>
      ) : (
        /* List of Saved Itineraries */
        <div className="flex flex-col">
          {savedPlans.map((plan) => (
            <ItineraryCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
}
