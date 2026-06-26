
import React, { useState, useEffect } from 'react';
import { RahulLogo, COLORS, SOCIAL_LINKS, TRANSLATIONS } from '../constants';
import { ChatSession } from '../types';
import { UsageMonitor } from './UsageMonitor';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onNavigate: (view: string) => void;
  usageCount: number;
  usageLimit: number;
  usageResetSeconds: number;
  language?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  sessions, 
  currentSessionId, 
  onSelectSession, 
  onNewChat,
  onNavigate,
  usageCount,
  usageLimit,
  usageResetSeconds,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const formattedDate = currentTime.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="w-64 h-full bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col p-4 transition-colors duration-500">
      <div className="mb-8 cursor-pointer" onClick={() => onNavigate('landing')}>
        <RahulLogo />
      </div>

      <button 
        onClick={onNewChat}
        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 mb-6 bg-indigo-600 hover:bg-indigo-500 text-slate-100 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        {t.newSession}
      </button>

      <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
        <h3 className="px-3 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">{t.workspaceLogs}</h3>
        {sessions.map(session => (
          <button
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-all ${
              currentSessionId === session.id 
                ? 'bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            {session.title || 'Untitled Conversation'}
          </button>
        ))}
        {sessions.length === 0 && (
          <p className="px-3 text-sm text-slate-600 dark:text-slate-400 italic">No active logs</p>
        )}
      </div>

      {/* System Status Panel */}
      <div className="mt-4 p-5 bg-white dark:bg-slate-900/50 rounded-[24px] border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
        <UsageMonitor 
          count={usageCount} 
          limit={usageLimit} 
          resetSeconds={usageResetSeconds} 
          language={language}
        />
        
        <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] leading-tight">
                Architect Intel
              </span>
              <span className="text-[8px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                Link Stable
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded-full border border-slate-100 dark:border-white/5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-2.5 border border-slate-100 dark:border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Chronos Sync</span>
              <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-[7px] text-indigo-500 font-bold uppercase">Live</span>
            </div>
            <div className="text-sm font-mono font-bold text-slate-700 dark:text-slate-200 tabular-nums">
              {formattedTime}
            </div>
            <div className="text-[9px] text-slate-500 dark:text-slate-500 font-medium">
              {formattedDate}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <button 
          onClick={() => onNavigate('settings')}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100 transition-all flex items-center gap-2 group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:rotate-45 transition-transform duration-300">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          {t.settings}
        </button>

        <div className="flex items-center gap-3 w-full px-3 py-2 group cursor-pointer" onClick={() => onNavigate('about')}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-xs font-black text-slate-100 relative group-hover:scale-105 transition-transform shadow-lg">
            RS
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-50 dark:border-slate-950 rounded-full"></div>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">Rahul S</p>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate uppercase tracking-tighter">CTO & Lead Engineer</p>
          </div>
        </div>
      </div>
    </div>
  );
};
