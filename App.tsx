import React, { useState, useEffect, useCallback } from 'react';
import { Role, ChatMessage, FileData, CanvasState, ChatSession } from './types';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { CanvasMode } from './components/CanvasMode';
import { LandingPage } from './components/LandingPage';
import { AboutPage } from './components/AboutPage';
import { ExpertisePage } from './components/ExpertisePage';
import { ProjectsPage } from './components/ProjectsPage';
import { SettingsPage } from './components/SettingsPage';
import { geminiService } from './services/geminiService';
import { TRANSLATIONS } from './constants';

type ViewMode = 'landing' | 'chat' | 'about' | 'expertise' | 'projects' | 'settings';

const RPM_LIMIT = 30; // Safer threshold for free tier stability

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('landing');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rpmCount, setRpmCount] = useState(0);
  const [secondsToReset, setSecondsToReset] = useState(60);
  const [isPremium, setIsPremium] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('rahix_language') || 'en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [canvasState, setCanvasState] = useState<CanvasState>({
    isOpen: false,
    content: '',
    mode: 'text',
    language: 'markdown',
    title: ''
  });

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    const savedTheme = localStorage.getItem('rahix_theme');
    const savedPremium = localStorage.getItem('rahix_premium_ui');
    
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    setIsPremium(savedPremium === 'true');
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsToReset((prev) => {
        if (prev <= 1) {
          setRpmCount(0);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('rahix_sessions');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed);
      if (parsed.length > 0) setCurrentSessionId(parsed[0].id);
    }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('rahix_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: t.newSession,
      messages: [],
      createdAt: Date.now()
    };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newSession.id);
    setCanvasState(prev => ({ ...prev, isOpen: false }));
    setIsMobileMenuOpen(false);
  };

  const handleSendMessage = async (text: string, files: FileData[], useWebSearch: boolean, isImage: boolean) => {
    if (rpmCount >= RPM_LIMIT) return;

    if (!currentSessionId) {
      createNewChat();
      return; 
    }

    const currentSession = sessions.find(s => s.id === currentSessionId);
    if (!currentSession) return;

    setRpmCount(prev => prev + 1);

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: Role.USER,
      text,
      files,
      timestamp: Date.now()
    };

    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        return { 
          ...s, 
          messages: [...s.messages, newUserMsg],
          title: s.messages.length === 0 ? text.substring(0, 30) : s.title
        };
      }
      return s;
    }));
    
    setIsLoading(true);

    try {
      if (isImage) {
        const imageUrl = await geminiService.generateImage(text);
        addModelMessage({
          id: (Date.now() + 1).toString(),
          role: Role.MODEL,
          text: imageUrl || "Failed to generate image.",
          timestamp: Date.now(),
          isImageGeneration: !!imageUrl
        });
      } else {
        const response = await geminiService.sendMessage(text, currentSession.messages, files, useWebSearch, language);
        addModelMessage({
          id: (Date.now() + 1).toString(),
          role: Role.MODEL,
          text: response.text,
          sources: response.sources,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      addModelMessage({
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        text: "Connection stability low. Please re-send.",
        timestamp: Date.now()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addModelMessage = (msg: ChatMessage) => {
    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        return { ...s, messages: [...s.messages, msg] };
      }
      return s;
    }));
  };

  const openInCanvas = (text: string) => {
    const codeMatch = text.match(/```(\w+)?\n([\s\S]*?)```/);
    if (codeMatch) {
      setCanvasState({
        isOpen: true,
        mode: 'code',
        language: codeMatch[1] || 'javascript',
        content: codeMatch[2],
        title: 'Extracted Snippet'
      });
    } else {
      setCanvasState({
        isOpen: true,
        mode: 'text',
        language: 'markdown',
        content: text,
        title: 'Extracted Document'
      });
    }
  };

  const syncSettings = () => {
    setIsPremium(localStorage.getItem('rahix_premium_ui') === 'true');
    setLanguage(localStorage.getItem('rahix_language') || 'en');
  };

  if (view === 'landing') return <LandingPage onGetStarted={() => { if (sessions.length === 0) createNewChat(); setView('chat'); }} onNavigate={(v) => setView(v as ViewMode)} language={language} />;
  if (view === 'about') return <AboutPage onBack={() => setView('landing')} language={language} />;
  if (view === 'expertise') return <ExpertisePage onBack={() => setView('landing')} language={language} />;
  if (view === 'projects') return <ProjectsPage onBack={() => setView('landing')} language={language} />;
  if (view === 'settings') return <SettingsPage onBack={() => { setView('chat'); syncSettings(); }} usageCount={rpmCount} usageLimit={RPM_LIMIT} currentLanguage={language} />;

  const currentSession = sessions.find(s => s.id === currentSessionId);

  return (
    <div className="flex h-screen w-full transition-colors duration-500 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden animate-in fade-in duration-500 relative">
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[70] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed lg:relative h-full z-[80] transition-transform duration-300 transform lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
          sessions={sessions} 
          currentSessionId={currentSessionId}
          onSelectSession={(id) => { setCurrentSessionId(id); setIsMobileMenuOpen(false); }}
          onNewChat={createNewChat}
          onNavigate={(v) => { setView(v as ViewMode); setIsMobileMenuOpen(false); }}
          usageCount={rpmCount}
          usageLimit={RPM_LIMIT}
          usageResetSeconds={secondsToReset}
          language={language}
        />
      </div>
      
      <main className="flex-1 flex flex-col lg:flex-row transition-all duration-300 ease-in-out relative">
        <div className={`h-full flex flex-col transition-all duration-300 ${canvasState.isOpen ? 'lg:w-[40%] w-full' : 'w-full'} ${canvasState.isOpen ? 'hidden lg:flex' : 'flex'}`}>
          <div className="h-14 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 md:px-6 justify-between shrink-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
             <div className="flex items-center gap-3">
               <button 
                 onClick={() => setIsMobileMenuOpen(true)}
                 className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400"
               >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
               </button>
               <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
                 <div className="w-5 h-5 bg-indigo-500/10 rounded flex items-center justify-center text-indigo-600">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                 </div>
                 <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest hidden sm:inline">{t.workspaceCore}</span>
               </div>
             </div>
             <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 uppercase tracking-widest">
               Engine v2.5.0
             </div>
          </div>
          <ChatInterface 
            messages={currentSession?.messages || []} 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onEditInCanvas={openInCanvas}
            rpmCount={rpmCount}
            rpmLimit={RPM_LIMIT}
            rpmResetSeconds={secondsToReset}
            isPremium={isPremium}
            language={language}
          />
        </div>

        {canvasState.isOpen && (
          <div className={`flex-1 h-full lg:w-[60%] w-full animate-in slide-in-from-right duration-300 z-10 ${canvasState.isOpen ? 'fixed inset-0 lg:relative' : ''}`}>
            <CanvasMode 
              state={canvasState} 
              onClose={() => setCanvasState(prev => ({ ...prev, isOpen: false }))}
              onUpdateContent={(content) => setCanvasState(prev => ({ ...prev, content }))}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
