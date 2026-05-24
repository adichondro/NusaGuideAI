import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../../store/useChatStore';
import { usePlanStore } from '../../store/usePlanStore';
import { useToastStore } from '../../store/useToastStore';
import { useConfigStore } from '../../store/useConfigStore';
import { ChatBubble } from '../molecules/ChatBubble';
import { Button } from '../atoms/Button';
import { Trash2, Send, Bot, User, Compass } from 'lucide-react';

export function ChatContainer({ inputValue, setInputValue }) {
  const chatHistory = useChatStore((state) => state.chatHistory);
  const isTyping = useChatStore((state) => state.isTyping);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const clearHistory = useChatStore((state) => state.clearHistory);

  const savePlan = usePlanStore((state) => state.savePlan);
  const navigate = useNavigate();

  const showToast = useToastStore((state) => state.showToast);
  const demoMode = useConfigStore((state) => state.demoMode);

  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  const defaultGreeting = "Halo! Saya NusaGuide AI, asisten pemandu wisata digital Anda. Kota mana di Indonesia yang ingin Anda kunjungi? Beritahu saya durasi dan budget liburan Anda agar saya bisa membuatkan itinerary terbaik!";

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isTyping) return;

    setInputValue('');

    try {
      const response = await sendMessage(trimmedInput);
      if (response && response.type === 'itinerary' && response.plan) {
        savePlan(response.plan);
        showToast("Itinerary successfully generated and saved to library!", "success");
        setTimeout(() => {
          navigate('/saved-plans');
        }, 2000);
      }
    } catch (err) {
      showToast(err.message || "Failed to communicate with AI helper.", "error");
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear chat history?")) {
      clearHistory();
      showToast("Chat history cleared.", "success");
    }
  };

  return (
    <div className="glass-panel rounded-2xl flex flex-col h-[650px] border border-outline overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-outline flex items-center justify-between bg-surface-container/50">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg border border-primary/20 text-primary">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-on-surface">NusaGuide Planner Chat</h3>
            <span className="text-[10px] text-on-surface-variant font-medium">
              {demoMode ? "Demo mode offline simulation" : "Powered by Gemini 3.1 Flash Lite"}
            </span>
          </div>
        </div>
        <Button
          variant="danger"
          size="sm"
          onClick={handleClearChat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
          title="Clear Chat History"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </Button>
      </div>

      {/* Messages Viewport */}
      <div
        ref={messageContainerRef}
        className="flex-grow p-6 overflow-y-auto flex flex-col"
      >
        {/* Render default greeting if history is empty */}
        {chatHistory.length === 0 ? (
          <ChatBubble role="model" content={defaultGreeting} />
        ) : (
          chatHistory.map((msg, idx) => (
            <ChatBubble key={idx} role={msg.role} content={msg.content} />
          ))
        )}

        {/* Typing indicator bubble */}
        {isTyping && (
          <div className="flex w-full justify-start mb-4">
            <div className="max-w-[80%] rounded-[20px] rounded-tl-sm px-5 py-3.5 text-sm bg-surface-container-high border border-outline text-on-surface flex items-center gap-1.5">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-outline bg-surface-container/30 flex gap-3 items-center"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask NusaGuide to create an itinerary or ask a question..."
          disabled={isTyping}
          className="flex-grow bg-surface-container border border-outline rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary disabled:opacity-50 transition-colors"
        />
        <Button
          type="submit"
          disabled={isTyping || !inputValue.trim()}
          className="h-11 w-11 !p-0 rounded-xl shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
