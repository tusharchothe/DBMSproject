import React from 'react';
import { Search, Bell, Settings, HelpCircle } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="h-12 flex items-center justify-between px-6 bg-surface-dim/80 backdrop-blur-md border-b border-outline-variant/10 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-8">
        <span className="text-xl font-black tracking-tighter text-primary">QueryMentor</span>
        <nav className="hidden md:flex items-center gap-6 h-full">
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Learn</a>
          <a className="text-primary font-semibold border-b-2 border-primary pb-1 text-sm" href="#">Practice</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Leaderboard</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Docs</a>
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative group hidden lg:block">
          <div className="flex items-center bg-surface-high/50 rounded-md px-3 py-1 border border-outline-variant/10 group-focus-within:border-primary/50 transition-all">
            <Search className="w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search project..." 
              className="bg-transparent border-none text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 ml-2 w-48"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-surface-high rounded-md transition-all text-on-surface-variant hover:text-primary">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-surface-high rounded-md transition-all text-on-surface-variant hover:text-primary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-7 h-7 rounded-full bg-surface-highest overflow-hidden ml-2 ring-1 ring-outline-variant/30">
          <img 
            alt="User Avatar" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMKU9PEi0TIxrxqOpuTTjlZpnJed_y9EUMGJ9wi-KeM6x0Yi64D9vzJDhXIVxHzt5tawps1ASH8K4BwyXOWdV4n6QCBsHW91Z8Flx96qtHmIzuVHFqXIMQQwddQveeqlCvXVOIcsvYm0ctKD9ZvksV1bwZK1OgnwM6sDKw1m908YQTgJkaoLWtROn2OxH5bnLyK0F3VVFJiYGXaa8kk9lnf4QrEG0EUJlMPHhOT_33kvosLNljMI3mLkNJZbGQltNE5KAs0ZILSW8"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
