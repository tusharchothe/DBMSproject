import React from 'react';
import { Play, Save, Share2, Trash2, Copy, Terminal, Sparkles, Wand2 } from 'lucide-react';
import { motion } from 'motion/react';

interface EditorProps {
  query: string;
  setQuery: (query: string) => void;
  onExecute: () => void;
  onExplain: () => void;
}

export default function Editor({ query, setQuery, onExecute, onExplain }: EditorProps) {
  return (
    <div className="flex flex-col h-full bg-surface-dim rounded-xl border border-outline-variant/10 overflow-hidden shadow-2xl">
      <div className="h-10 border-b border-outline-variant/10 flex items-center justify-between px-4 bg-surface-high/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-primary">
            <Terminal className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-widest uppercase">SQL Editor</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-error pulsing-dot"></div>
            <span className="text-[10px] text-on-surface-variant/50 font-mono">LIVE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-surface-highest rounded-md transition-all text-on-surface-variant hover:text-primary">
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 hover:bg-surface-highest rounded-md transition-all text-on-surface-variant hover:text-primary">
            <Save className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 hover:bg-surface-highest rounded-md transition-all text-on-surface-variant hover:text-primary">
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-outline-variant/20 mx-1"></div>
          <button className="p-1.5 hover:bg-error/10 rounded-md transition-all text-on-surface-variant hover:text-error">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative group editor-sunken m-2 rounded-lg overflow-hidden border border-outline-variant/5">
        <textarea 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-full bg-surface-dim/50 p-6 font-mono text-sm text-on-surface focus:ring-0 border-none resize-none placeholder:text-on-surface-variant/20 selection:bg-primary/30"
          placeholder="-- Write your SQL query here...
SELECT * FROM users WHERE active = true;"
          spellCheck={false}
        />
        
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExplain}
            className="flex items-center gap-2 px-4 py-2 bg-surface-highest/80 backdrop-blur-md border border-outline-variant/20 rounded-lg text-xs font-bold text-on-surface hover:bg-primary/10 hover:border-primary/30 transition-all group"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
            <span>AI Explain</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExecute}
            className="flex items-center gap-2 px-6 py-2 bg-primary rounded-lg text-xs font-bold text-on-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Execute Query</span>
          </motion.button>
        </div>
      </div>
      
      <div className="h-8 border-t border-outline-variant/10 flex items-center justify-between px-4 bg-surface-dim">
        <div className="flex items-center gap-4 text-[10px] font-mono text-on-surface-variant/40">
          <span>Line: 1, Col: 1</span>
          <span>UTF-8</span>
          <span>PostgreSQL</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-on-surface-variant/40">
          <Wand2 className="w-3 h-3" />
          <span>AI Assistant Ready</span>
        </div>
      </div>
    </div>
  );
}
