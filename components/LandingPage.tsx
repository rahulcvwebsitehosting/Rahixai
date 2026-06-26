
import React from 'react';
import { RahiRobot } from './RahiRobot';
import { RahixLogo, SOCIAL_LINKS } from '../constants';

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigate: (view: string) => void;
  language?: string;
}

const BRAND_ICONS = {
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  github: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  whatsapp: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.584 3.899 1.582 5.423l-.999 3.642 3.906-.964zm11.349-6.12c-.29-.146-1.715-.848-1.981-.944-.266-.096-.459-.143-.652.146-.193.288-.748.941-.916 1.137-.168.193-.336.214-.627.068-.29-.146-1.225-.452-2.333-1.441-.862-.77-1.443-1.72-1.612-2.012-.168-.293-.018-.452.127-.597.13-.132.29-.339.435-.508.145-.17.193-.288.29-.481.097-.193.048-.362-.024-.508-.073-.146-.652-1.571-.894-2.152-.236-.565-.474-.488-.652-.496-.168-.008-.362-.01-.555-.01-.193 0-.508.073-.772.362-.265.288-1.013.992-1.013 2.422 0 1.43 1.037 2.812 1.182 3.006.145.194 2.041 3.117 4.943 4.373.69.298 1.229.476 1.649.61.693.214 1.325.184 1.823.11.555-.081 1.715-.7 1.956-1.378.24-.678.24-1.258.17-1.378-.071-.121-.265-.194-.555-.339z"/>
    </svg>
  ),
};

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onNavigate, language = 'en' }) => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center bg-slate-50 dark:bg-slate-950">
      {/* Ambient Lights */}
      <div className="ambient-orb top-[-10%] right-[-10%] bg-purple-600/30"></div>
      <div className="ambient-orb bottom-[-10%] left-[-10%] bg-pink-600/30"></div>
      
      {/* Navigation */}
      <nav className="w-full max-w-7xl flex items-center justify-between px-8 py-8 z-50">
        <RahixLogo />
        <ul className="hidden md:flex items-center gap-10 text-slate-600 dark:text-slate-400 text-sm font-medium">
          <li className="hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer transition-colors" onClick={() => onNavigate('about')}>Profile & Bio</li>
          <li className="hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer transition-colors" onClick={() => onNavigate('expertise')}>Expertise</li>
          <li className="hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer transition-colors" onClick={() => onNavigate('projects')}>Projects</li>
          <li>
            <button 
              onClick={() => onNavigate('about')} 
              className="p-2.5 bg-indigo-500/10 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all block group relative shadow-sm border border-indigo-500/10"
            >
              <span className="text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors">{BRAND_ICONS.linkedin}</span>
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-slate-900 text-[10px] text-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl font-bold">VIEW ENGINEERING PROFILE</span>
            </button>
          </li>
        </ul>
        <button 
          onClick={onGetStarted}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-slate-100 px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-purple-500/20"
        >
          Launch Assistant
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center px-8 py-12 gap-16 relative">
        <div className="space-y-8 reveal z-[10]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Rahix AI - Intelligence Suite
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-slate-100">
            Next-Gen <br />
            <span className="gradient-text">Intelligent</span><br />
            Workspace
          </h1>
          
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
            Experience an AI assistant engineered for high-performance productivity. Chat, create, code, and analyze documents within a unified professional ecosystem.
          </p>

          <div className="flex items-center gap-6">
            <button 
              onClick={onGetStarted}
              className="relative w-32 h-32 cursor-pointer group flex items-center justify-center bg-transparent border-none outline-none"
            >
              <div className="absolute inset-0 rotating-svg">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37, 37 0 1, 1 74, 0 a 37, 37 0 1, 1 -74, 0" />
                  </defs>
                  <text className="fill-slate-900/80 dark:fill-slate-100/80 text-[10px] uppercase tracking-[3.5px] font-medium">
                    <textPath xlinkHref="#circlePath">
                      LAUNCH NOW • START CHAT • 
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-slate-100 text-xl group-hover:scale-110 transition-transform shadow-xl shadow-indigo-600/40">
                →
              </div>
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Start a session</span>
              <span className="text-xs text-slate-600 dark:text-slate-500">Free, fast, and intelligent</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center reveal relative z-[1]">
          <RahiRobot />
        </div>
      </div>

      {/* Minimal Feature Teasers */}
      <section className="w-full max-w-7xl px-8 py-24 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md space-y-4 hover:border-indigo-500/30 transition-all cursor-pointer" onClick={() => onNavigate('expertise')}>
          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-2xl">📄</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Deep Document Analysis</h3>
          <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed">Upload PDFs and complex documents for instant summaries and data extraction.</p>
        </div>
        <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md space-y-4 hover:border-pink-500/30 transition-all cursor-pointer" onClick={() => onNavigate('projects')}>
          <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-2xl">🎨</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Creative Generation</h3>
          <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed">From 4K images to professional blog posts, engineer your vision with AI.</p>
        </div>
        <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md space-y-4 hover:border-cyan-500/30 transition-all cursor-pointer" onClick={onGetStarted}>
          <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-2xl">💻</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Collaborative Canvas</h3>
          <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed">A side-by-side workspace to refine code and text with real-time AI assistance.</p>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="w-full py-16 px-8 border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 relative z-10 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <RahixLogo />
            <p className="text-slate-600 dark:text-slate-500 text-sm max-w-xs">
              Designed and engineered by <span className="text-indigo-600 dark:text-indigo-400 cursor-pointer font-bold" onClick={() => onNavigate('about')}>Rahul S</span>. High-performance digital experiences.
            </p>
          </div>
          <div className="flex gap-4">
            {[
              { id: 'linkedin' as const, url: SOCIAL_LINKS.linkedin },
              { id: 'github' as const, url: SOCIAL_LINKS.github },
              { id: 'instagram' as const, url: SOCIAL_LINKS.instagram },
              { id: 'whatsapp' as const, url: SOCIAL_LINKS.whatsapp }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all group text-slate-600 dark:text-slate-400 hover:text-slate-100 border border-slate-200 dark:border-white/5 shadow-sm"
                title={social.id.toUpperCase()}
              >
                <span className="group-hover:scale-110 transition-transform">{BRAND_ICONS[social.id]}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          <div>© 2026 RAHIX AI - BUILT FOR PERFORMANCE</div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="hover:text-slate-900 dark:hover:text-slate-400 cursor-pointer transition-colors" onClick={() => onNavigate('about')}>LEARN MORE</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-400 cursor-pointer transition-colors" onClick={() => window.open(SOCIAL_LINKS.email, '_blank')}>CONTACT@ENGINEER</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
