
import React from 'react';
import { RahulLogo, PROJECTS } from '../constants';

// Added optional language prop to interface
interface ProjectsPageProps {
  onBack: () => void;
  language?: string;
}

// Accept language prop in component definition
export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack, language = 'en' }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-y-auto pb-24 relative transition-colors duration-500">
      <div className="ambient-orb bottom-[-10%] right-[-10%] bg-pink-600/10 opacity-15 dark:opacity-20"></div>
      
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-[10px] font-bold uppercase tracking-widest">
            Proof & Execution
          </div>
          <h1 className="text-6xl font-black tracking-tight leading-none text-slate-900 dark:text-slate-100">Functional Products.</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Each project reflects strong logic and practical usability. Working solutions for real problems.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <a 
              key={idx} 
              href={project.url} 
              target="_blank" 
              rel="noreferrer"
              className="group glass-card p-10 rounded-[40px] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:border-pink-500/40 transition-all flex flex-col gap-6 relative overflow-hidden shadow-sm"
            >
              <div className="flex justify-between items-start z-10">
                <div className="w-14 h-14 bg-slate-200/50 dark:bg-white/5 rounded-3xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-pink-500/10 transition-all">
                  {idx % 3 === 0 ? '🚀' : idx % 3 === 1 ? '🏗️' : '🧠'}
                </div>
                <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-pink-600 group-hover:border-pink-600 transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-900 dark:text-white"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </div>
              </div>
              
              <div className="z-10 flex-1">
                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{project.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-500 font-mono mb-4 uppercase tracking-tighter">{project.tech}</p>
              </div>

              <div className="z-10 pt-6 border-t border-slate-200 dark:border-slate-800">
                 <span className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase tracking-widest group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Case Study Available →</span>
              </div>
            </a>
          ))}
        </section>
      </div>

      <footer className="max-w-6xl mx-auto px-8 py-20 text-center border-t border-slate-200 dark:border-slate-800 mt-24">
         <p className="text-[10px] font-bold text-slate-600 dark:text-slate-700 uppercase tracking-[0.5em]">Rahul S — Lead Engineer — 2026</p>
      </footer>
    </div>
  );
};
