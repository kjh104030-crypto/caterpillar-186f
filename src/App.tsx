import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainPanel } from './components/MainPanel';
import { TopNav } from './components/TopNav';
import { categories } from './data';

export default function App() {
  const [activeEntryId, setActiveEntryId] = useState<string>(categories[0].entries[0].id);

  // Find the currently selected entry throughout all categories
  const activeEntry = categories
    .flatMap(c => c.entries)
    .find(e => e.id === activeEntryId);

  return (
    <div className="flex flex-col h-screen w-full bg-[#0A0A0A] text-[#E0E0E0] font-sans antialiased overflow-hidden border-[12px] border-[#1A1A1A] relative select-none selection:bg-[#FF6B00] selection:text-black">
      {/* UI Background Accents */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-[-100px] w-[500px] h-[500px] border-[1px] border-white rounded-full"></div>
        <div className="absolute bottom-10 right-[-50px] w-[300px] h-[300px] border-[2px] border-[#FF6B00] rotate-45"></div>
      </div>

      <TopNav />
      
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar Menu */}
        <Sidebar 
          categories={categories} 
          activeEntry={activeEntryId} 
          onSelect={setActiveEntryId} 
        />
        
        {/* Right Content Area */}
        <MainPanel entry={activeEntry} onNavigate={setActiveEntryId} />
      </main>

      {/* Decorative elements overlay (Bottom Status Bar placeholder) */}
      <div className="h-10 border-t border-[#333] bg-[#0A0A0A] px-8 flex items-center justify-between text-[10px] font-mono text-[#555] shrink-0">
        <div className="flex gap-4">
          <span>TERM_ID: CAT_186F_8829</span>
          <span>AUTH: LEVEL_05_OVERRIDE</span>
        </div>
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></div>
            <span>DATABANK: ONLINE</span>
          </div>
          <div className="bg-[#222] px-2 py-0.5 text-white">SECURE CONNECTION</div>
        </div>
      </div>

      {/* Corner Bracket Overlays */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#FF6B00] z-50 pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#FF6B00] z-50 pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#FF6B00] z-50 pointer-events-none"></div>
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#FF6B00] z-50 pointer-events-none"></div>
    </div>
  );
}
