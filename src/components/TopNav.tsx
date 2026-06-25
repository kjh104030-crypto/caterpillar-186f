import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function TopNav() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-[#333] bg-[#0F0F0F] z-20 relative select-none">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-[#FF6B00] flex items-center justify-center font-bold text-black text-xs">C186</div>
        <div className="flex flex-col">
          <span className="text-[10px] text-[#FF6B00] font-mono leading-none tracking-widest uppercase">Archive Terminal v4.0.2</span>
          <span className="text-lg font-bold tracking-tighter">CT-186F.SYS // WORLD SETTING</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <div className="text-[9px] text-[#888] uppercase font-mono">Current Phase</div>
          <div className="text-sm text-[#FF6B00] font-bold">KANTO [10-DAY TRANSITION]</div>
        </div>
        <div className="w-[1px] h-8 bg-[#333] hidden sm:block"></div>
        <div className="text-[10px] font-mono">
          <div className="text-green-500">[ STATUS: STABLE ]</div>
          <div className="text-[#666]">UTC {time.toUTCString().split(' ')[4]}</div>
        </div>
      </div>
    </header>
  );
}
