import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  UserCheck, 
  Image as ImageIcon, 
  CreditCard, 
  RefreshCw,
  Bot
} from 'lucide-react';
import { TabType, ChatMessage } from '../types';

interface AIChatDrawerProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
  onToggle,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello! 👋 I am Smarty AI, your assistant for SMART TEMPLATES. I can help you write content, fix punctuation (commas & full stops), summarize long documents in 3 seconds, generate custom templates, or optimize your ID cards and photos!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    { label: 'Check my work for mistakes', prompt: 'Please check my current work for missing commas, full stops, typos, or missing contact fields.' },
    { label: 'Summarize my CV/Doc in seconds', prompt: 'Please write a concise 3-bullet summary of my current document.' },
    { label: 'Suggest high-impact action verbs', prompt: 'Give me 10 strong action verbs to make my CV experience sections stand out.' },
    { label: 'How to link portfolio to Instagram?', prompt: 'Explain step-by-step how to put my Smart Template portfolio link into my Instagram profile bio.' },
    { label: 'Batch ID card tips', prompt: 'How do I generate multiple student or staff ID cards in batch mode with school badges?' },
    { label: 'Picture smoothing advice', prompt: 'How does the AI photo smoothing work without altering my facial features?' },
  ];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue.trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          activeTab,
        }),
      });

      const data = await response.json();
      const aiReplyText = data.reply || data.text || "I'm here to help you design and finalize your template!";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Here is a helpful tip: In Smart Templates, you can click 'AI Checking' on any document, CV, or ID card to instantly audit for punctuation errors, missing phone numbers, or unuploaded profile photos!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating omnipresent message button */}
      <button
        id="btn-ai-chat-trigger"
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 p-3.5 sm:px-4 sm:py-3.5 rounded-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 text-white font-bold shadow-2xl shadow-purple-600/50 hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20"
        title="Chat with AI Assistant"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
        </div>
        <span className="hidden sm:inline text-xs sm:text-sm tracking-wide">
          AI Help Chat
        </span>
      </button>

      {/* Slide-in Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full sm:max-w-md h-[85vh] sm:h-[650px] bg-slate-950 border border-purple-500/30 rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-purple-900/40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-right-6 duration-300">
            
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-fuchsia-950/80 via-purple-950/80 to-slate-950 border-b border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-cyan-400 p-[2px]">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-fuchsia-400 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Smarty AI Assistant</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Active
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Helping with Writing, Checking & Templates
                  </p>
                </div>
              </div>
              <button
                id="btn-close-ai-chat"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Chips */}
            <div className="p-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.prompt)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-purple-600/30 border border-purple-500/20 text-[11px] text-slate-300 hover:text-fuchsia-300 transition-colors"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-950/90">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {msg.sender === 'ai' ? (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-fuchsia-600 to-purple-600 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center shrink-0 text-xs font-bold text-white">
                      You
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-br-none shadow-md shadow-fuchsia-600/20'
                        : 'bg-slate-900 border border-purple-500/20 text-slate-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className="block mt-1 text-[9px] opacity-60 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-purple-400 animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Smarty AI is formulating guidance...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-900 border-t border-purple-500/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask AI anything (e.g. proofread, rewrite)..."
                  className="flex-1 bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || loading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-purple-600/30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
