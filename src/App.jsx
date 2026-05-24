import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './presentation/components/templates/MainLayout';
import { DiscoverPage } from './presentation/pages/DiscoverPage';
import { PlannerPage } from './presentation/pages/PlannerPage';
import { SavedPlansPage } from './presentation/pages/SavedPlansPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Default Page Index Redirects to discover */}
          <Route index element={<Navigate to="/discover" replace />} />
          <Route path="discover" element={<DiscoverPage />} />
          <Route path="planner" element={<PlannerPage />} />
          <Route path="saved-plans" element={<SavedPlansPage />} />
          {/* Catch-all navigation fallback */}
          <Route path="*" element={<Navigate to="/discover" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
