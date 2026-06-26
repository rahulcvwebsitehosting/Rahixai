import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';
import { motion } from 'framer-motion';

const Motion = motion as any;

interface UsageMonitorProps {
  count: number;
  limit: number;
  resetSeconds: number;
  language?: string;
  className?: string;
}

export const UsageMonitor: React.FC<UsageMonitorProps> = ({ 
  count, 
  limit, 
  resetSeconds,
  language = 'en',
  className = "" 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const percentage = Math.min((count / limit) * 100, 100);
  const isWarning = count >= limit * 0.7; 
  const isCritical = count >= limit * 0.9;

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header Row */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            <div className={`w-1 h-3 rounded-full ${isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-indigo-500'}`} />
            <div className={`w-1 h-3 rounded-full opacity-40 ${isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-indigo-500'}`} />
          </div>
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">
            {t.neuralLoad || 'Neural Load'}
          </span>
        </div>
        
        <div className="relative flex items-center gap-1.5">
          <span className={`text-[11px] font-mono font-bold tabular-nums ${isCritical ? 'text-rose-500' : isWarning ? 'text-amber-500' : 'text-indigo-500 dark:text-indigo-400'}`}>
            {count.toString().padStart(2, '0')} <span className="opacity-30">/</span> {limit}
          </span>
          <button 
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-indigo-400 transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
            </svg>
          </button>
          
          {showTooltip && (
            <div className="absolute bottom-full right-0 mb-3 w-56 p-3 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-[10px] text-slate-300 leading-relaxed font-medium">
                Rahix Engine active. Request limit: {limit} RPM. Capacity resets in {resetSeconds}s.
              </p>
              <div className="absolute top-full right-2 border-8 border-transparent border-t-slate-900"></div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
        <Motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full transition-all duration-700 ease-out rounded-full relative ${
            isCritical ? 'bg-rose-500' : 
            isWarning ? 'bg-amber-500' : 
            'bg-indigo-500'
          }`}
          style={{
            boxShadow: percentage > 10 ? `0 0 12px ${isCritical ? 'rgba(244,63,94,0.4)' : isWarning ? 'rgba(245,158,11,0.4)' : 'rgba(99,102,241,0.4)'}` : 'none'
          }}
        >
          {/* Scanning Effect */}
          <Motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </Motion.div>
      </div>

      {/* Footer Meta */}
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
          {t.resetsIn || 'Reset in'} {resetSeconds}s
        </span>
        {isCritical && (
          <span className="text-[9px] font-black text-rose-500 uppercase animate-pulse">
            Throttled
          </span>
        )}
      </div>
    </div>
  );
};