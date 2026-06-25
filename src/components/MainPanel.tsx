import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoreEntry } from '../types';
import { GenealogyTree } from './GenealogyTree';

interface MainPanelProps {
  entry: LoreEntry | undefined;
  onNavigate?: (entryId: string) => void;
}

export function MainPanel({ entry, onNavigate }: MainPanelProps) {
  if (!entry) return null;

  return (
    <>
      <div className="flex-1 flex flex-col p-8 relative overflow-y-auto z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-5xl font-black text-white italic tracking-tighter">{entry.titleEn}</h1>
                <p className="text-[#FF6B00] text-sm mt-1 font-mono tracking-widest uppercase">Category: {entry.title}</p>
              </div>
              {entry.summary && (
                <div className="bg-white/5 p-4 border-l-4 border-[#FF6B00] w-64 shrink-0">
                  <div className="text-[10px] text-[#888] uppercase">Overview Advisory</div>
                  <p className="text-xs leading-relaxed mt-1">{entry.summary}</p>
                </div>
              )}
            </div>

            {entry.renderType === 'genealogy' ? (
              <GenealogyTree entry={entry} />
            ) : entry.renderType === 'navigation' ? (
              <div className="grid grid-cols-2 gap-6 flex-1 items-start content-start">
                {entry.content && (
                  <div className="bg-[#151515] p-6 border border-[#222] relative overflow-hidden col-span-2">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[#FF6B00]/10 flex items-center justify-center font-mono text-[10px] text-[#FF6B00]">DT-00</div>
                    <h3 className="text-[#FF6B00] font-bold text-lg mb-2">[ DATA LOG ]</h3>
                    <p className="text-sm text-[#AAA] mb-2 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
                  </div>
                )}
                {entry.navItems?.map((navItem, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate?.(navItem.targetId)}
                    className="text-left bg-[#151515] hover:bg-[#1C1C1C] transition-colors p-6 border border-[#333] hover:border-[#FF6B00] relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[#FF6B00]/10 flex items-center justify-center font-mono text-[10px] text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-black transition-colors">
                      NAV
                    </div>
                    <h3 className="text-[#FF6B00] font-bold text-lg mb-2 flex items-center gap-2">
                      <span>{navItem.label}</span>
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </h3>
                    <div className="text-sm text-[#AAA] whitespace-pre-wrap leading-relaxed">
                      {navItem.description}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6 flex-1 items-start">
                {entry.content && (
                  <div className="bg-[#151515] p-6 border border-[#222] relative overflow-hidden col-span-2">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[#FF6B00]/10 flex items-center justify-center font-mono text-[10px] text-[#FF6B00]">DT-00</div>
                    <h3 className="text-[#FF6B00] font-bold text-lg mb-2">[ DATA LOG ]</h3>
                    <p className="text-sm text-[#AAA] mb-2 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
                  </div>
                )}

                {entry.details?.map((detail, idx) => (
                  <div key={idx} className="bg-[#151515] p-6 border border-[#222] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[#FF6B00]/10 flex items-center justify-center font-mono text-[10px] text-[#FF6B00]">
                      SEC-{String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-[#FF6B00] font-bold text-lg mb-2">[ {detail.label} ]</h3>
                    <div className="text-sm text-[#AAA] whitespace-pre-wrap leading-relaxed">
                      {detail.value}
                    </div>
                  </div>
                ))}

                {entry.list && (
                  <div className="col-span-2 bg-[#0F0F0F] border border-[#222] p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4 border-b border-[#333] pb-2">
                      <h3 className="text-xs font-bold tracking-widest text-[#888] uppercase">Classification Matrix</h3>
                      <div className="text-[10px] text-[#FF6B00]">INDEXED DATA</div>
                    </div>
                    <div className="flex flex-wrap gap-y-4">
                      {entry.list.map((item, idx) => (
                        <div key={idx} className="w-1/3 min-w-[120px] text-center px-2">
                          <div className="text-[11px] text-[#AAA] font-mono leading-tight">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Sidebar Detail */}
      <div className="w-72 border-l border-[#333] flex flex-col bg-[#0F0F0F] shrink-0 overflow-y-auto z-10">
        <div className="p-6">
          <div className="text-[10px] text-[#FF6B00] mb-1 font-mono uppercase">Target Organization</div>
          <h2 className="text-2xl font-bold tracking-tighter mb-4">JUDECCA</h2>
          <div className="space-y-4">
            <div className="group">
              <div className="text-[10px] font-bold text-[#666] mb-1">DOCTRINE:</div>
              <p className="text-xs leading-relaxed italic text-[#AAA]">"붕괴는 재앙이 아닌 신의 선물이다." 육체를 버리고 오큘러를 숭상하는 외곽 세력.</p>
            </div>
            <div className="bg-[#1A1A1A] p-3 border border-[#333]">
              <div className="text-[10px] text-[#FF6B00] mb-2 font-bold">[ OPERATIVE: SILVIAL ]</div>
              <div className="text-xs text-[#888]">신도 수: 고정 30명</div>
              <div className="text-xs text-[#888]">특이사항: 유다(JUDAS) 시술</div>
            </div>
          </div>
        </div>
        <div className="mt-auto p-6 bg-[#111] border-t border-[#222]">
          <div className="flex justify-between text-[10px] mb-2 font-mono">
            <span>CAHERDIN</span>
            <span className="text-[#FF6B00]">CONNECTED</span>
          </div>
          <div className="flex justify-between text-[10px] mb-2 font-mono">
            <span>AGRAVAINE</span>
            <span className="text-[#FF6B00]">CONNECTED</span>
          </div>
          <div className="flex justify-between text-[10px] font-mono">
            <span>ESPERANTO</span>
            <span className="text-[#FF6B00]">CONNECTED</span>
          </div>
        </div>
      </div>
    </>
  );
}
