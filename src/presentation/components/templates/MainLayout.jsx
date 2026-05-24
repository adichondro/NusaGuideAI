import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { usePlanStore } from '../../store/usePlanStore';
import { useConfigStore } from '../../store/useConfigStore';
import { Navbar } from '../organisms/Navbar';
import { SettingsModal } from '../organisms/SettingsModal';
import { ToastContainer } from '../atoms/ToastContainer';
import { FloatingFooter } from '../organisms/FloatingFooter';

export function MainLayout() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const activeTab = usePlanStore((state) => state.activeTab);
  const setActiveTab = usePlanStore((state) => state.setActiveTab);
  const fetchBackendStatus = useConfigStore((state) => state.fetchBackendStatus);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch API configuration status on load
  useEffect(() => {
    fetchBackendStatus();
  }, [fetchBackendStatus]);

  // Sync from URL route path -> Zustand activeTab state
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/discover') {
      if (activeTab !== 'discover') setActiveTab('discover');
    } else if (path === '/planner') {
      if (activeTab !== 'planner') setActiveTab('planner');
    } else if (path === '/saved-plans') {
      if (activeTab !== 'saved-plans') setActiveTab('saved-plans');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0 bg-surface">
      {/* Toast Alert System overlay */}
      <ToastContainer />

      {/* Global Navbar */}
      <Navbar onSettingsOpen={() => setSettingsOpen(true)} />

      {/* Main Page Area */}
      <main className="flex-grow container mx-auto px-6 py-8 flex flex-col">
        <div className="flex-grow">
          <Outlet />
        </div>
        <FloatingFooter />
      </main>

      {/* Global Config Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
