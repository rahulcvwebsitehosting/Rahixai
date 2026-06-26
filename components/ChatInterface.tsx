
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { Role, ChatMessage, FileData } from '../types';
import { FileUpload } from './FileUpload';
import { QuantumLoader } from './AILoader';
import { VoiceInterface } from './VoiceInterface';

const Motion = motion as any;

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, files: FileData[], useWebSearch: boolean, isImage: boolean) => void;
  isLoading: boolean;
  onEditInCanvas: (text: string, mode?: 'text' | 'code' | 'presentation') => void;
  rpmCount: number;
  rpmLimit: number;
  rpmResetSeconds: number;
  isPremium?: boolean;
  language?: string;
}

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else clearInterval(timer);
    }, 10);
    return () => clearInterval(timer);
  }, [text]);
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>;
};

const ImageResult: React.FC<{ src: string }> = ({ src }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `rahix-gen-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="mt-4 relative group w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 dark:border-indigo-900/30 shadow-xl bg-slate-100 dark:bg-slate-800">
      {!isLoaded && (
        <div className="aspect-square w-full flex flex-col items-center justify-center gap-3 animate-pulse">
          <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Developing Render...</span>
        </div>
      )}
      <img 
        src={src} 
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-auto object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
        alt="AI Generated" 
      />
      
      {isLoaded && (
        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button 
            onClick={handleDownload}
            className="p-3 bg-white text-slate-900 rounded-full shadow-xl hover:scale-110 transition-transform"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

const PremiumMessage: React.FC<{ msg: ChatMessage; onEdit: (t: string) => void }> = ({ msg, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isModel = msg.role === Role.MODEL;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col ${isModel ? 'items-start' : 'items-end'} mb-6 group w-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center gap-2 mb-1.5 ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
        <span className={`text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase ${isModel ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
          {isModel ? 'Rahix Core' : 'User Terminal'}
        </span>
      </div>

      <div className={`relative w-full flex ${isModel ? 'justify-start' : 'justify-end'}`}>
        <div className={`relative max-w-[95%] md:max-w-[85%] px-4 md:px-6 py-3 md:py-4 rounded-[20px] md:rounded-[28px] text-[14px] md:text-[15px] leading-relaxed shadow-sm transition-all duration-300 ${
          !isModel 
            ? 'bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900 rounded-tr-none' 
            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-900/50 rounded-tl-none'
        }`}>
          {isModel && (
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-[22px] md:rounded-[30px] blur-md -z-10" />
          )}

          <div className="prose dark:prose-invert max-w-none prose-sm md:prose-base prose-indigo break-words">
            {msg.isImageGeneration ? (
              <div className="text-[11px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-2 italic">Image Synthesis Complete:</div>
            ) : (
              isModel ? <TypewriterText text={msg.text} /> : <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
            )}
          </div>

          {msg.isImageGeneration && <ImageResult src={msg.text} />}
        </div>

        {isModel && !msg.isImageGeneration && (
          <div className="absolute top-0 -right-2 md:-right-12 hidden group-hover:flex flex-col gap-2">
            <button 
              onClick={() => onEdit(msg.text)} 
              className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-indigo-600 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            </button>
          </div>
        )}
      </div>

      <span className="text-[10px] text-slate-400 dark:text-slate-600 mt-1.5 px-1 font-medium italic">
        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </Motion.div>
  );
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  onSendMessage, 
  isLoading,
  onEditInCanvas,
  rpmCount,
  rpmLimit,
  rpmResetSeconds,
  isPremium = false,
  language = 'en'
}) => {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<FileData[]>([]);
  const [useDeepResearch, setUseDeepResearch] = useState(false);
  const [isImageMode, setIsImageMode] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = () => {
    if (rpmCount >= rpmLimit) return;
    if (input.trim() || files.length > 0) {
      onSendMessage(input, files, useDeepResearch, isImageMode);
      setInput('');
      setFiles([]);
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      {isPremium && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-[100px]" />
        </div>
      )}

      <VoiceInterface isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} persona="Rahix Workspace Assistant" />

      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-10 space-y-4 pb-48 md:pb-52 scroll-smooth relative z-10"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-12">
            <div className="w-16 h-16 mb-6 glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex items-center justify-center animate-float shadow-xl">
              <div className="w-6 h-6 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 mb-3">Workspace Initialized.</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">Ready for document analysis, high-fidelity code generation, and complex queries.</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <PremiumMessage key={msg.id} msg={msg} onEdit={onEditInCanvas} />
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex items-center gap-3 py-4 animate-pulse">
            <div className="bg-indigo-500/10 p-2.5 rounded-2xl flex gap-1">
              {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />)}
            </div>
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Processing Logic...</span>
          </div>
        )}
      </div>

      {/* Input Overlay Console */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="h-8 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent w-full" />
        
        <div className="p-4 md:p-6 pt-0 pointer-events-auto bg-slate-50 dark:bg-slate-950">
          <div className="max-w-4xl mx-auto">
            <div className="relative glass-card rounded-[20px] md:rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-1.5 md:p-2.5 flex flex-col gap-1">
              
              <div className="flex items-center gap-1.5 md:gap-3 px-2 md:px-4 shrink-0">
                <FileUpload onFilesSelected={setFiles} selectedFiles={files} />
                <div className="h-3 w-px bg-slate-200 dark:bg-slate-800" />
                
                <button 
                  onClick={() => setUseDeepResearch(!useDeepResearch)} 
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-[8px] md:text-[9px] font-black transition-all border ${useDeepResearch ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-transparent hover:bg-slate-200'}`}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <span className="hidden sm:inline">SEARCH</span>
                </button>

                <button 
                  onClick={() => setIsImageMode(!isImageMode)} 
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-[8px] md:text-[9px] font-black transition-all border ${isImageMode ? 'bg-pink-600 text-white border-pink-500' : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-transparent hover:bg-slate-200'}`}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <span className="hidden sm:inline">IMAGE</span>
                </button>

                <button 
                  onClick={() => setIsVoiceOpen(true)}
                  className="ml-auto p-1.5 text-slate-400 hover:text-indigo-500 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                </button>
              </div>

              <div className="flex items-center gap-1 md:gap-2 pl-2 md:pl-4 pr-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder={rpmCount >= rpmLimit ? "Link Throttled..." : "Command Rahix..."}
                  className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 py-2 md:py-3 resize-none min-h-[40px] md:min-h-[48px] max-h-32 outline-none text-sm font-medium placeholder:text-slate-400"
                  rows={1}
                />
                <button 
                  onClick={handleSend} 
                  disabled={isLoading || rpmCount >= rpmLimit || (!input.trim() && files.length === 0)} 
                  className={`p-2 md:p-3 rounded-[14px] md:rounded-[20px] transition-all shrink-0 ${input.trim() || files.length > 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
