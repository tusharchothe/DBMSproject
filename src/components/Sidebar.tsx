import React from 'react';
import { Database, Table, ChevronRight, Plus, FolderOpen, History, Star, Terminal } from 'lucide-react';
import { SchemaTable } from '../types';

interface SidebarProps {
  schema: SchemaTable[];
}

export default function Sidebar({ schema }: SidebarProps) {
  return (
    <aside className="w-64 bg-surface-dim border-r border-outline-variant/10 flex flex-col fixed top-12 bottom-0 left-0 z-40">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Database className="w-4 h-4" />
          <span className="text-xs font-bold tracking-widest uppercase">Schema Explorer</span>
        </div>
        <button className="p-1 hover:bg-surface-high rounded-md transition-all text-on-surface-variant hover:text-primary">
          <Plus className="w-3 h-3" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2 space-y-4 py-2">
        <div>
          <div className="flex items-center gap-2 px-2 py-1 text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest mb-1">
            <FolderOpen className="w-3 h-3" />
            <span>Active Database</span>
          </div>
          <div className="space-y-0.5">
            {schema.map((table) => (
              <div key={table.name} className="group">
                <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-surface-high/50 transition-all text-left">
                  <div className="flex items-center gap-2">
                    <Table className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">{table.name}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-on-surface-variant/30 group-hover:text-primary/50 transition-all" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 px-2 py-1 text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest mb-1">
            <History className="w-3 h-3" />
            <span>Recent Queries</span>
          </div>
          <div className="space-y-0.5">
            <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-surface-high/50 transition-all text-left text-xs text-on-surface-variant hover:text-on-surface">
              <Terminal className="w-3 h-3" />
              <span className="truncate">SELECT * FROM users...</span>
            </button>
            <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-surface-high/50 transition-all text-left text-xs text-on-surface-variant hover:text-on-surface">
              <Terminal className="w-3 h-3" />
              <span className="truncate">JOIN orders ON users.id...</span>
            </button>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 px-2 py-1 text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest mb-1">
            <Star className="w-3 h-3" />
            <span>Favorites</span>
          </div>
          <div className="px-2 py-4 text-center border border-dashed border-outline-variant/20 rounded-lg">
            <p className="text-[10px] text-on-surface-variant/40 italic">No favorites yet</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-outline-variant/10 bg-surface-dim">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest">Storage</span>
          <span className="text-[10px] font-mono text-primary">42%</span>
        </div>
        <div className="h-1 w-full bg-surface-highest rounded-full overflow-hidden">
          <div className="h-full bg-primary w-[42%] rounded-full"></div>
        </div>
      </div>
    </aside>
  );
}
