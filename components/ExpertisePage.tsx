
import React from 'react';
import { RahulLogo, EXPERTISE } from '../constants';

// Added optional language prop to interface
interface ExpertisePageProps {
  onBack: () => void;
  language?: string;
}

// Accept language prop in component definition
export const ExpertisePage: React.FC<ExpertisePageProps> = ({ onBack, language = 'en' }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-y-auto pb-24 relative transition-colors duration-500">
      <div className="ambient-orb top-[-10%] right-[-10%] bg-indigo-600/10 opacity-15 dark:opacity-20"></div>
      
      <div className="max-w-6xl mx-auto px-8 py-8 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-50 border-b border-slate-200 dark:border-slate-800">
        <RahulLogo />
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-slate-200/50 dark:bg-white/5 hover:bg-slate-300/50 dark:hover:bg-white/10 rounded-xl transition-all border border-slate-200 dark:border-slate-800 text-sm font-bold"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-24 space-y-32 reveal">
        <section className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
            Capability & Strength
          </div>
          <h1 className="text-6xl font-black tracking-tight leading-none text-slate-900 dark:text-slate-100">Engineering logic, scaled via AI.</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Designing complete systems — from data flow and interaction logic to performance and usability.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERTISE.map((exp, i) => (
            <div key={i} className="glass-card p-12 rounded-[40px] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:border-indigo-500/30 transition-all group relative overflow-hidden shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                {exp.category}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tools.map(tool => (
                  <span key={tool} className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono uppercase tracking-wider">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <footer className="max-w-6xl mx-auto px-8 py-20 text-center border-t border-slate-200 dark:border-slate-800 mt-24">
         <p className="text-[10px] font-bold text-slate-600 dark:text-slate-700 uppercase tracking-[0.5em]">Rahul S — Lead Architect — 2026</p>
      </footer>
    </div>
  );
};
