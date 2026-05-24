import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../components/organisms/Sidebar';
import { ChatContainer } from '../components/organisms/ChatContainer';

export function PlannerPage() {
  const [chatInput, setChatInput] = useState('');
  const location = useLocation();

  // Load initial prompt passed from Discover page destination clicks
  useEffect(() => {
    if (location.state && location.state.initialPrompt) {
      setChatInput(location.state.initialPrompt);
      // Clear location state so that refreshing doesn't re-fill the text
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handlePillClick = (promptText) => {
    setChatInput(promptText);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start pb-12 animate-[slideInPage_0.3s_cubic-bezier(0.4,0,0.2,1)_forwards]">
      {/* Sidebar - Instructions & Pill Prompts (1/4 columns) */}
      <div className="lg:col-span-1">
        <Sidebar onPillClick={handlePillClick} />
      </div>

      {/* Main Chat Window (3/4 columns) */}
      <div className="lg:col-span-3">
        <ChatContainer inputValue={chatInput} setInputValue={setChatInput} />
      </div>
    </div>
  );
}
