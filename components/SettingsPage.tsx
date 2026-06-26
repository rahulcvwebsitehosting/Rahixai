
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RahixLogo, SUPPORTED_LANGUAGES, TRANSLATIONS } from '../constants';

// Fix for framer-motion type errors
const Motion = motion as any;

interface SettingsPageProps {
  onBack: () => void;
  usageCount: number;
  usageLimit: number;
  currentLanguage: string;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack, usageCount, usageLimit, currentLanguage }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('rahix_theme') !== 'light');
  const [isPremiumInterface, setIsPremiumInterface] = useState(() => localStorage.getItem('rahix_premium_ui') === 'true');
  const [language, setLanguage] = useState(currentLanguage);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('rahix_theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('rahix_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('rahix_premium_ui', isPremiumInterface.toString());
  }, [isPremiumInterface]);

  useEffect(() => {
    localStorage.setItem('rahix_language', language);
  }, [language]);

  const percentage = Math.min((usageCount / usageLimit) * 100, 100);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-y-auto pb-24 relative selection:bg-indigo-500/30">
      <div className="ambient-orb top-[-10%] right-[-10%] bg-indigo-600/10 dark:opacity-20 opacity-20 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between sticky top-0 backdrop-blur-xl z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80">
        <RahixLogo />
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/20 text-sm font-bold text-slate-100">{t.saveAndExit}</button>
      </div>

      <div className="max-w-2xl mx-auto px-8 mt-12 space-y-10 reveal">
        {/* Profile */}
        <div className="glass-card p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex items-center gap-6 shadow-xl">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-xl font-black text-slate-100">RS</div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full"></div>
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">Rahul S</h2>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">rahulshyam2006@outlook.com</p>
          </div>
        </div>

        {/* Toggles */}
        <div className="glass-card p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md space-y-8 shadow-xl">
           <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t.interfaceDarkMode}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Deep obsidian aesthetics</p>
              </div>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-14 h-7 rounded-full relative transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                 <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-md ${isDarkMode ? 'left-8' : 'left-1'}`} />
              </button>
           </div>
           <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t.premiumInteractivity}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Smooth motion & ambient orbs</p>
              </div>
              <button onClick={() => setIsPremiumInterface(!isPremiumInterface)} className={`w-14 h-7 rounded-full relative transition-colors ${isPremiumInterface ? 'bg-pink-600' : 'bg-slate-300'}`}>
                 <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-md ${isPremiumInterface ? 'left-8' : 'left-1'}`} />
              </button>
           </div>

           {/* Language Selector */}
           <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
             <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t.systemLanguage}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Choose your preferred workspace language</p>
                </div>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm font-bold text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500 transition-all"
                >
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.native}</option>
                  ))}
                </select>
             </div>
           </div>
        </div>

        {/* Credit Meter */}
        <div className="glass-card p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">{t.usageCapacity}</h3>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{usageCount} / {usageLimit} RPM</span>
          </div>
          <div className="h-3 w-full rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800">
            <Motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-1000" />
          </div>
          <p className="text-[9px] text-center text-slate-500 dark:text-slate-600 uppercase font-black tracking-[0.3em]">Resets every 60 seconds • Pro Link Stable</p>
        </div>
      </div>
    </div>
  );
};
