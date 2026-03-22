import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import { Send, Sparkles, User, Bot, Trash2, Copy, RefreshCw, Terminal, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatProps {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  onSend: () => void;
  loading: boolean;
}

export default function Chat({ messages, input, setInput, onSend, loading }: ChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="w-96 bg-surface-dim border-l border-outline-variant/10 flex flex-col fixed top-12 bottom-0 right-0 z-40 shadow-2xl">
      <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between bg-surface-high/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 ring-1 ring-primary/10">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest uppercase text-on-surface">AI Mentor</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary pulsing-dot"></div>
              <span className="text-[10px] text-on-surface-variant font-mono">ONLINE</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-surface-highest rounded-md transition-all text-on-surface-variant hover:text-primary">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 hover:bg-error/10 rounded-md transition-all text-on-surface-variant hover:text-error">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 bg-surface-dim/50 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex items-center gap-2 mb-1 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${
                  msg.role === 'user' 
                    ? 'bg-surface-highest border-outline-variant/20 text-on-surface' 
                    : 'bg-primary/10 border-primary/20 text-primary'
                }`}>
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest">
                  {msg.role === 'user' ? 'You' : 'Mentor'}
                </span>
              </div>
              
              <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-on-primary rounded-tr-none' 
                  : 'bg-surface-high border border-outline-variant/10 text-on-surface rounded-tl-none'
              }`}>
                {msg.content}
              </div>
              
              {msg.code && (
                <div className="w-full mt-1 rounded-lg overflow-hidden border border-outline-variant/10 shadow-inner shadow-black/10">
                  <div className="h-6 bg-surface-highest/50 flex items-center justify-between px-3 border-b border-outline-variant/10">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3 h-3 text-secondary" />
                      <span className="text-[10px] font-mono text-on-surface-variant/60">SQL Snippet</span>
                    </div>
                    <button className="p-1 hover:bg-surface-highest rounded transition-all text-on-surface-variant hover:text-primary">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <pre className="p-3 bg-surface-dim font-mono text-[10px] text-on-surface overflow-x-auto selection:bg-primary/30">
                    <code>{msg.code}</code>
                  </pre>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2 items-start"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest">Mentor</span>
            </div>
            <div className="bg-surface-high border border-outline-variant/10 p-3 rounded-xl rounded-tl-none flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"></div>
              </div>
              <span className="text-[10px] font-mono text-on-surface-variant/60 italic">Thinking...</span>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="p-4 border-t border-outline-variant/10 bg-surface-dim/80 backdrop-blur-md">
        <div className="relative group">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder="Ask for help or explain query..."
            className="w-full bg-surface-high border border-outline-variant/10 rounded-xl p-3 pr-12 text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all resize-none h-20 shadow-inner shadow-black/5"
          />
          <button 
            onClick={onSend}
            disabled={!input.trim() || loading}
            className="absolute bottom-3 right-3 p-2 bg-primary rounded-lg text-on-primary hover:bg-primary/90 disabled:opacity-30 disabled:hover:bg-primary transition-all shadow-lg shadow-primary/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-[10px] text-on-surface-variant/40">
            <Wand2 className="w-3 h-3" />
            <span>AI powered by Gemini</span>
          </div>
          <span className="text-[10px] text-on-surface-variant/40 font-mono">
            {input.length}/500
          </span>
        </div>
      </div>
    </div>
  );
}
