import React, { useState } from 'react';
import { CanvasState } from '../types';
import { geminiService } from '../services/geminiService';

interface CanvasModeProps {
  state: CanvasState;
  onClose: () => void;
  onUpdateContent: (content: string) => void;
}

export const CanvasMode: React.FC<CanvasModeProps> = ({ state, onClose, onUpdateContent }) => {
  const [instruction, setInstruction] = useState('');
  const [isRefining, setIsRefining] = useState(false);

  const handleRefine = async () => {
    if (!instruction.trim()) return;
    setIsRefining(true);
    try {
      const refined = await geminiService.refineCanvasContent(state.content, instruction, state.mode);
      onUpdateContent(refined);
      setInstruction('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 transition-colors duration-500">
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded ${state.mode === 'code' ? 'bg-amber-500/10 text-amber-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
            {state.mode === 'code' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
            )}
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">{state.title || 'Collaborative Canvas'}</h2>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">{state.mode} Editing Mode</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              const blob = new Blob([state.content], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `rahul-${state.title.replace(/\s+/g, '-').toLowerCase() || 'doc'}.txt`;
              a.click();
            }}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="Download"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          </button>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden">
        <div className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-inner flex flex-col">
          <textarea
            value={state.content}
            onChange={(e) => onUpdateContent(e.target.value)}
            className={`w-full flex-1 p-6 bg-transparent text-slate-900 dark:text-slate-100 resize-none outline-none leading-relaxed ${state.mode === 'code' ? 'fira-code text-sm' : 'text-lg'}`}
            spellCheck={state.mode === 'text'}
          />
          <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              {state.content.length} chars | {state.content.split(/\s+/).filter(Boolean).length} words
            </span>
            {state.mode === 'code' && (
              <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
                {state.language.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-lg">
          <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 px-1">AI Quick Refinement</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="e.g., 'Make it more professional'..."
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500/50 transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleRefine()}
            />
            <button
              onClick={handleRefine}
              disabled={isRefining || !instruction.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg px-4 py-2 text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
            >
              {isRefining ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>
              )}
              Refine
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};