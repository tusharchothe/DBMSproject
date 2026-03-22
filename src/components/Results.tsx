import React from 'react';
import { QueryResult } from '../types';
import { Database, Download, Filter, Search, Table, Clock, ListOrdered } from 'lucide-react';

interface ResultsProps {
  result: QueryResult | null;
  loading: boolean;
}

export default function Results({ result, loading }: ResultsProps) {
  if (loading) {
    return (
      <div className="flex-1 bg-surface-dim rounded-xl border border-outline-variant/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-pulse"></div>
        <div className="flex flex-col items-center gap-4 z-10">
          <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">Executing Query</span>
            <span className="text-[10px] font-mono text-on-surface-variant/50">Fetching results from database...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex-1 bg-surface-dim rounded-xl border border-outline-variant/10 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-0 group-hover:opacity-5 transition-opacity duration-1000"></div>
        <div className="w-16 h-16 rounded-2xl bg-surface-highest flex items-center justify-center mb-6 ring-1 ring-outline-variant/10 group-hover:ring-primary/30 transition-all">
          <Database className="w-8 h-8 text-on-surface-variant group-hover:text-primary transition-colors" />
        </div>
        <h3 className="text-lg font-bold text-on-surface mb-2 tracking-tight">Ready for your query</h3>
        <p className="text-sm text-on-surface-variant/60 max-w-md leading-relaxed">
          Write a SQL query in the editor above and click <span className="text-primary font-bold">Execute</span> to see the results here.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-primary/30"></div>
            <span className="text-[10px] font-mono text-on-surface-variant/40">PostgreSQL</span>
          </div>
          <div className="w-px h-4 bg-outline-variant/20"></div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-secondary/30"></div>
            <span className="text-[10px] font-mono text-on-surface-variant/40">v15.3</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-surface-dim rounded-xl border border-outline-variant/10 flex flex-col overflow-hidden shadow-2xl">
      <div className="h-12 border-b border-outline-variant/10 flex items-center justify-between px-6 bg-surface-high/50 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-secondary">
            <Table className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest uppercase">Query Results</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono text-on-surface-variant/60">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>{result.executionTime}ms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ListOrdered className="w-3 h-3" />
              <span>{result.rowCount} rows</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative group hidden sm:block">
            <div className="flex items-center bg-surface-highest/50 rounded-md px-3 py-1 border border-outline-variant/10 group-focus-within:border-primary/50 transition-all">
              <Search className="w-3.5 h-3.5 text-on-surface-variant" />
              <input 
                type="text" 
                placeholder="Filter results..." 
                className="bg-transparent border-none text-[10px] text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 ml-2 w-32"
              />
            </div>
          </div>
          <button className="p-1.5 hover:bg-surface-highest rounded-md transition-all text-on-surface-variant hover:text-primary">
            <Filter className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 hover:bg-surface-highest rounded-md transition-all text-on-surface-variant hover:text-primary">
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-surface-dim/50 p-4">
        <div className="rounded-lg border border-outline-variant/10 overflow-hidden bg-surface-dim shadow-inner shadow-black/5">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-high/80 sticky top-0 z-10 backdrop-blur-md border-b border-outline-variant/10">
              <tr>
                {result.columns.map((col) => (
                  <th key={col} className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-r border-outline-variant/5 last:border-r-0">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {result.rows.map((row, i) => (
                <tr key={i} className="hover:bg-primary/5 transition-colors group">
                  {result.columns.map((col) => (
                    <td key={col} className="px-4 py-3 text-xs font-mono text-on-surface border-r border-outline-variant/5 last:border-r-0 group-hover:text-primary transition-colors">
                      {row[col]?.toString() || <span className="text-on-surface-variant/20 italic">NULL</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="h-8 border-t border-outline-variant/10 flex items-center justify-between px-4 bg-surface-dim">
        <div className="flex items-center gap-4 text-[10px] font-mono text-on-surface-variant/40 italic">
          <span>* Showing first 100 rows</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-on-surface-variant/40">
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}
