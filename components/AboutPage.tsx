
import React from 'react';
import { RahixLogo, SOCIAL_LINKS, EXPERTISE, PROJECTS } from '../constants';

interface AboutPageProps {
  onBack: () => void;
  language?: string;
}

const BRAND_ICONS = {
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  github: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  whatsapp: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.584 3.899 1.582 5.423l-.999 3.642 3.906-.964zm11.349-6.12c-.29-.146-1.715-.848-1.981-.944-.266-.096-.459-.143-.652.146-.193.288-.748.941-.916 1.137-.168.193-.336.214-.627.068-.29-.146-1.225-.452-2.333-1.441-.862-.77-1.443-1.72-1.612-2.012-.168-.293-.018-.452.127-.597.13-.132.29-.339.435-.508.145-.17.193-.288.29-.481.097-.193.048-.362-.024-.508-.073-.146-.652-1.571-.894-2.152-.236-.565-.474-.488-.652-.496-.168-.008-.362-.01-.555-.01-.193 0-.508.073-.772.362-.265.288-1.013.992-1.013 2.422 0 1.43 1.037 2.812 1.182 3.006.145.194 2.041 3.117 4.943 4.373.69.298 1.229.476 1.649.61.693.214 1.325.184 1.823.11.555-.081 1.715-.7 1.956-1.378.24-.678.24-1.258.17-1.378-.071-.121-.265-.194-.555-.339z"/>
    </svg>
  ),
  mail: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  )
};

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, language = 'en' }) => {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020617] text-[#0f172a] dark:text-[#f8fafc] overflow-y-auto pb-24 relative selection:bg-indigo-500/30 transition-colors duration-500 font-inter">
      <div className="ambient-orb top-[-10%] left-[-10%] bg-indigo-600/15"></div>
      
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl z-[60] border-b border-slate-200 dark:border-slate-800">
        <RahixLogo />
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-200/50 dark:bg-white/5 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all border border-slate-200 dark:border-slate-800 text-sm font-bold shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          Back to Portal
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16 space-y-24">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-8 reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
              Core Identity
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
              Rahul S. <br />
              <span className="text-slate-400 dark:text-slate-600">Architecting Intelligence.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-3xl">
              I’m an Engineer and CTO bridging the gap between <span className="text-indigo-600 dark:text-indigo-400">physical logic</span> and <span className="text-pink-600 dark:text-pink-400">digital intelligence</span>.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-50 transition-all text-sm font-bold shadow-sm group">
                <span className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">{BRAND_ICONS.linkedin}</span>
                LinkedIn Profile
              </a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-slate-100 hover:bg-slate-50 transition-all text-sm font-bold shadow-sm group">
                <span className="text-slate-900 dark:text-slate-100 group-hover:scale-110 transition-transform">{BRAND_ICONS.github}</span>
                GitHub Repository
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-50 transition-all text-sm font-bold shadow-sm group">
                <span className="text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">{BRAND_ICONS.whatsapp}</span>
                Direct WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 reveal" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-6 relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform"></div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-xl font-black text-white shadow-lg">RS</div>
                <div>
                  <h4 className="font-bold text-lg">Lead Engineer</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Link Available</p>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Domain</span>
                  <span className="font-bold">System Architecture</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Base</span>
                  <span className="font-bold">Chennai, India</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Experience</span>
                  <span className="font-bold">Technical Lead</span>
                </div>
              </div>
              <button 
                onClick={() => window.open(SOCIAL_LINKS.email, '_blank')}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
              >
                {BRAND_ICONS.mail}
                Send Transmission
              </button>
            </div>
          </div>
        </section>

        {/* Career & Philosophy Bento */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
          <div className="lg:col-span-2 glass-card p-10 rounded-[40px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-6 shadow-sm">
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 text-sm">🏗️</span>
              Engineering Philosophy
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Coming from a <strong>Civil Engineering background</strong>, I approach software like a structural system. Every line of code is a beam, every data flow is a load path. I don't just build features; I build foundations. My focus is on creating high-performance digital twins, AI-driven automation, and interactive visualizations that solve tangible infrastructure and workflow problems.
            </p>
          </div>
          <div className="glass-card p-10 rounded-[40px] border border-slate-200 dark:border-slate-800 bg-indigo-600 text-white space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-2xl font-black tracking-tight">Mission Control</h3>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Leading technical teams as a CTO involves more than managing repositories—it's about setting the vision for how intelligence can serve humanity. My mission is to reduce systemic confusion through clean UX and powerful backend logic.
            </p>
            <div className="pt-8 flex flex-col gap-2">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Deployment Success</span>
               <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                 <div className="w-[95%] h-full bg-white animate-pulse"></div>
               </div>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
             <h2 className="text-4xl font-black tracking-tight">Specialized Skillset</h2>
             <p className="text-slate-500 font-medium">Tools of the trade for digital infrastructure.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERTISE.map((exp, i) => (
              <div key={i} className="glass-card p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/20 hover:border-indigo-500/30 transition-all group flex flex-col shadow-sm">
                <div className="text-indigo-600 dark:text-indigo-400 font-black text-2xl mb-4 group-hover:scale-110 transition-transform">0{i+1}.</div>
                <h4 className="text-lg font-bold mb-3">{exp.category}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 flex-1 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tools.map(tool => (
                    <span key={tool} className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[9px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Deployment */}
        <section className="space-y-12">
           <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-8">
              <h2 className="text-4xl font-black tracking-tight">Selected Work</h2>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline">View All Source Code →</a>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.slice(0, 4).map((proj, i) => (
                <a key={i} href={proj.url} target="_blank" rel="noreferrer" className="group relative glass-card p-1 rounded-[44px] border border-slate-200 dark:border-slate-800 transition-all hover:scale-[1.02] shadow-sm overflow-hidden">
                   <div className="p-10 bg-white dark:bg-[#0f172a] rounded-[40px] h-full space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{proj.tech}</span>
                        <div className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                        </div>
                      </div>
                      <h3 className="text-2xl font-black">{proj.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Production-ready system deployment featuring intelligent logic and high-performance frontend architecture.</p>
                   </div>
                </a>
              ))}
           </div>
        </section>
      </div>

      <footer className="max-w-6xl mx-auto px-6 py-20 text-center border-t border-slate-200 dark:border-slate-800 mt-24">
         <p className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.6em]">Rahul S. — Chief Technology Officer — 2026</p>
      </footer>
    </div>
  );
};
