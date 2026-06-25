import React from 'react';
import { motion } from 'motion/react';
import { LoreCategory } from '../types';
import { ChevronRight, Database } from 'lucide-react';

interface SidebarProps {
  categories: LoreCategory[];
  activeEntry: string;
  onSelect: (entryId: string) => void;
}

export function Sidebar({ categories, activeEntry, onSelect }: SidebarProps) {
  return (
    <aside className="w-56 border-r border-[#333] flex flex-col p-4 bg-[#0D0D0D] overflow-y-auto shrink-0 z-10">
      <div className="flex-1 flex flex-col gap-6">
        {categories.map((category) => (
          <div key={category.id} className="space-y-1">
            <h3 className="text-[10px] text-[#FF6B00] mb-2 font-mono uppercase px-2">{category.titleEn}</h3>
            <div className="space-y-1">
              {category.entries.map((entry, idx) => {
                const isActive = activeEntry === entry.id;
                
                return (
                  <button
                    key={entry.id}
                    onClick={() => onSelect(entry.id)}
                    className={`
                      w-full text-left p-2 text-xs font-bold uppercase cursor-pointer transition-colors border
                      ${isActive 
                        ? 'bg-[#FF6B00] text-black border-[#FF6B00]' 
                        : 'border-transparent text-[#888] hover:text-white hover:border-[#FF6B00]'}
                    `}
                  >
                    {String(idx + 1).padStart(2, '0')}. {entry.title}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 shrink-0">
        <div className="text-[9px] text-[#444] leading-tight font-mono border-t border-[#333] pt-4">
          CAUTION: DIRECT CHERUBIM CONTACT MAY LEAD TO BIOLOGICAL DISINTEGRATION.
        </div>
      </div>
    </aside>
  );
}
