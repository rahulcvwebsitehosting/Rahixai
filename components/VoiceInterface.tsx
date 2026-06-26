
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

// Fix for framer-motion type errors
const Motion = motion as any;

interface VoiceInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  persona: string;
}

type AudioState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'error';

// --- Visual Sub-Components ---

const WaveBar: React.FC<{ height: number; delay: number; color: string }> = ({ height, delay, color }) => (
  <Motion.div
    className={`w-1.5 rounded-full ${color}`}
    initial={{ height: 4 }}
    animate={{ 
      height: Math.max(6, height * 100),
      opacity: height > 0.1 ? 1 : 0.4
    }}
    transition={{ 
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: delay * 0.005
    }}
    style={{
      boxShadow: height > 0.5 ? `0 0 15px ${color.includes('emerald') ? '#10b981' : '#a78bfa'}` : 'none'
    }}
  />
);

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ isOpen, onClose, persona }) => {
  const [status, setStatus] = useState<AudioState>('idle');
  const [transcription, setTranscription] = useState('');
  const [aiTranscription, setAiTranscription] = useState('');
  const [volumeData, setVolumeData] = useState<number[]>(new Array(32).fill(0));
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // PCM Helpers
  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const updateVolume = (data: Float32Array) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
    const rms = Math.sqrt(sum / data.length);
    const normalized = Math.min(rms * 8, 1);
    
    setVolumeData(prev => {
      const next = [...prev];
      next.shift();
      next.push(normalized);
      return next;
    });
  };

  const startSession = async () => {
    setStatus('connecting');
    try {
      // Create a new GoogleGenAI instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      // Only request microphone when explicitly starting the session
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('listening');
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              updateVolume(inputData);
              
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              // CRITICAL: Solely rely on sessionPromise resolves and then call `session.sendRealtimeInput`
              sessionPromise.then(session => {
                if (session) session.sendRealtimeInput({ media: pcmBlob });
              }).catch(() => {});
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              setAiTranscription(prev => prev + message.serverContent!.outputTranscription!.text);
              setStatus('speaking');
            }
            if (message.serverContent?.inputTranscription) {
              setTranscription(prev => prev + message.serverContent!.inputTranscription!.text);
              setAiTranscription('');
              setStatus('listening');
            }
            if (message.serverContent?.turnComplete) {
              setStatus('listening');
              setTranscription('');
            }

            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outputContextRef.current && outputContextRef.current.state !== 'closed') {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputContextRef.current.currentTime);
              const buffer = await decodeAudioData(decode(audioData), outputContextRef.current, 24000, 1);
              
              updateVolume(buffer.getChannelData(0));

              const source = outputContextRef.current.createBufferSource();
              source.buffer = buffer;
              source.connect(outputContextRef.current.destination);
              source.onended = () => sourcesRef.current.delete(source);
              // Scheduling each new audio chunk to start at this time ensures smooth playback
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setStatus('listening');
            }
          },
          onclose: () => handleClose(),
          onerror: (e) => {
            console.error("Voice Error:", e);
            setStatus('error');
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: `${persona} MANDATORY: Keep responses under 3 concise sentences. Optimize for audio speed.`,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleClose = () => {
    if (audioContextRef.current?.state !== 'closed') audioContextRef.current?.close().catch(() => {});
    if (outputContextRef.current?.state !== 'closed') outputContextRef.current?.close().catch(() => {});
    if (sessionRef.current) {
      try { 
        sessionRef.current.close(); 
      } catch (e) {
        console.warn("Session already closed");
      }
    }
    setStatus('idle');
    setTranscription('');
    setAiTranscription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4"
      >
        <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[40px] p-10 flex flex-col items-center gap-10 overflow-hidden shadow-2xl">
          {/* Status Header */}
          <div className="text-center space-y-2">
            <h2 className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em]">Neural Voice Interface</h2>
            <div className={`px-4 py-1 rounded-full border text-[9px] font-bold uppercase transition-all ${
              status === 'listening' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
              status === 'speaking' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
              status === 'connecting' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse' :
              'bg-slate-800 text-slate-400 border-slate-700'
            }`}>
              {status}
            </div>
          </div>

          {/* Waveform Visualization */}
          <div className="flex items-center justify-center gap-1.5 h-32 w-full">
            {volumeData.map((v, i) => (
              <WaveBar 
                key={i} 
                height={v} 
                delay={i} 
                color={status === 'listening' ? 'bg-emerald-500' : 'bg-indigo-500'} 
              />
            ))}
          </div>

          {/* Transcription Display */}
          <div className="w-full text-center space-y-4 min-h-[80px]">
            {transcription && (
              <p className="text-slate-400 text-sm font-medium italic animate-in fade-in slide-in-from-bottom-2">
                "{transcription}"
              </p>
            )}
            {aiTranscription && (
              <p className="text-slate-100 text-lg font-bold leading-relaxed animate-in fade-in slide-in-from-top-2">
                {aiTranscription}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            {status === 'idle' ? (
              <button
                onClick={startSession}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-sm transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-3 group"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Initialize Neural Link
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="p-5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-full transition-all border border-rose-500/20 group"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Minimal Close */}
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 text-slate-600 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </Motion.div>
    </AnimatePresence>
  );
};
