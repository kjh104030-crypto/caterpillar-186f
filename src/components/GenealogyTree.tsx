import React, { useEffect, useRef, useState } from 'react';

export function GenealogyTree({ entry }: { entry?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rects, setRects] = useState<Record<string, {x: number, y: number, w: number, h: number}>>({});

  const measure = () => {
    if (!containerRef.current) return;
    const newRects: Record<string, any> = {};
    const els = containerRef.current.querySelectorAll('[data-node-id]');
    els.forEach(el => {
      const htmlEl = el as HTMLElement;
      newRects[htmlEl.getAttribute('data-node-id')!] = {
        x: htmlEl.offsetLeft,
        y: htmlEl.offsetTop,
        w: htmlEl.offsetWidth,
        h: htmlEl.offsetHeight,
      };
    });
    setRects(newRects);
  };

  useEffect(() => {
    const timer = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const treeNodes = [
    // Gen 1
    { id: 'altair', name: '알타이르', role: '하늘/낮/밤', type: 'F', desc: '하늘과 낮/밤 창조. 케루베알과 사랑을 나누어 4남매를 낳았다.' },
    { id: 'kerubeal', name: '케루베알', role: '최고신', type: 'M', desc: '만능 금속 케루빔 창조. 악신으로도 묘사된다.' },
    { id: 'ereda', name: '에레다', role: '대지 창조', type: 'F', desc: '대지를 만들었다. 케루베알과 혼인하여 5남매를 낳았다.' },

    // Gen 2
    { id: 'aetos', name: '아에토스', role: '바람 (라나데니)', type: 'F', parents: ['altair', 'kerubeal'], desc: '케터펄러에 바람을 불렀다. 프테노와 혼인.' },
    { id: 'pteno', name: '프테노', role: '구름 (로그데니)', type: 'M', parents: ['altair', 'kerubeal'], desc: '케터펄러에 구름을 불렀다. 아에토스와 혼인.' },
    { id: 'lepis', name: '레피스', role: '비/안개 (라나데니)', type: 'F', parents: ['altair', 'kerubeal'], desc: '비와 안개를 불렀다. 케라파와 혼인.' },
    { id: 'kerapa', name: '케라파', role: '산/절벽 (로그데니)', type: 'M', parents: ['kerubeal', 'ereda'], desc: '산과 절벽 형성에 기여. 레피스와 혼인.' },
    { id: 'shueneju', name: '쉬에네주', role: '추위/서리 (라나데니)', type: 'F', parents: ['altair', 'kerubeal'], desc: '북부에 눈과 서리를 내렸다. 호라프와 혼인.' },
    { id: 'horap', name: '호라프', role: '지하 (로그데니)', type: 'M', parents: ['kerubeal', 'ereda'], desc: '모라택과 이란성쌍둥이. 지하시설을 형성.' },
    { id: 'alpesi', name: '알페시', role: '지형/생명 (라나데니)', type: 'F', parents: ['kerubeal', 'ereda'], desc: '생명을 빚어냈으며 대륙을 4개로 갈라놓았다.' },
    { id: 'talamoresa', name: '탈라모레사', role: '바다 (라나데니)', type: 'F', parents: ['kerubeal', 'ereda'], desc: '바다 창조. 아주 문란한 생애를 즐겼다.' },
    { id: 'morataek', name: '모라택', role: '늪 (라나데니)', type: 'F', parents: ['kerubeal', 'ereda'], desc: '호라프와 쌍둥이. 진흙으로 생명 형태를 빚음.' },

    // Gen 3
    { id: 'mi', name: '미', role: '재해 (악신)', type: 'M', parents: ['aetos', 'pteno'], desc: '자식애는 컸으나 온갖 재해를 일으키는 이단아이자 바람둥이.' },
    { id: 'rieba', name: '리에바', role: '식생 지모신', type: 'F', parents: ['lepis', 'kerapa'], desc: '식물 관리. 시기와 질투심이 많아 사이가 고립되었다.' },
    { id: 'shunait', name: '슈나이트', role: '지하 정돈 (라나데니)', type: 'F', parents: ['shueneju', 'horap'], desc: '지하를 차갑게 다듬고 효(孝)를 상징한다.' },
    { id: 'serakarel', name: '세라카엘', role: '계절/칸토 (로그데니)', type: 'M', parents: ['shueneju', 'horap'], desc: '낮과 밤을 훔쳐 계절을 구분해 칸토(환절기)를 낳았다.' },
    
    // Gen 4
    { id: 'guhet', name: '구헤트', role: '사후세계 (라나데니)', type: 'F', parents: ['mi', 'shunait'], desc: '슈나이트의 장녀. 생명체들의 죽음이 시작되었다.' },
    { id: 'puriuli', name: '프리울리', role: '지진 (라나데니)', type: 'F', parents: ['mi', 'shunait'], desc: '슈나이트의 차녀. 지진을 일으키며 아비 미와 사이가 나쁘다.' },
    { id: 'seupaneiji', name: '스파네이지', role: '수명 (로그데니)', type: 'M', parents: ['mi', 'rieba'], desc: '리에바의 아들. 구헤트와 내기를 통해 수명을 만들었다.' },

    // Demigods Gen 1
    { id: 'somoras', name: '소모라스', role: '지혜 (데미로데니)', type: 'M', parents: ['talamoresa'], desc: '탈라모레사의 아들. 지혜를 훔쳐 나누어줌. 구헤트에게 쫓기다 사망.' },
    { id: 'antegrisa', name: '안테그리사', role: '팜므파탈 (세미라데니)', type: 'F', parents: ['talamoresa'], desc: '탈라모레사의 딸. 영악한 미인. 발부차와 혼인.' },
    { id: 'balbucha', name: '발부차', role: '창의력 (데미로데니)', type: 'M', parents: ['talamoresa'], desc: '탈라모레사의 아들. 창의력이 남달라 특징을 부여. 안테그리사와 혼인.' },

    // Demigods Gen 2
    { id: 'kozeubuero', name: '코즈브에로', role: '늪 파생 (세미라데니)', type: 'F', parents: ['antegrisa', 'balbucha'], desc: '모라택의 늪에서 세대를 불렸다.' },
    { id: 'anim_ebro', name: '애님 에브로', role: '평야 파생 (데미로데니)', type: 'M', parents: ['antegrisa', 'balbucha'], desc: '평야를 거주지 삼고 세대를 불렸다.' },
    { id: 'peuroegel', name: '프뢰겔', role: '필멸자 (산지/절벽)', type: 'M', parents: ['antegrisa', 'balbucha'], desc: '알타이르를 숭상한 필멸자. 에아랄과 혼인.' },
    { id: 'earal', name: '에아랄', role: '세미라데니 (고지대)', type: 'F', parents: ['antegrisa', 'balbucha'], desc: '높은 곳에서 세대를 불렸다. 프뢰겔과 혼인.' },
    { id: 'kuehoreun', name: '쿠에호른', role: '데미로데니 (바위산)', type: 'M', parents: ['antegrisa', 'balbucha'], desc: '바위산에서 필멸자들과 세대를 불렸다.' },

    // Demigods Gen 3
    { id: 'bineulsumu', name: '비늘수무', role: '파충류 선조', type: 'N', parents: ['kozeubuero'], desc: '코즈브에로의 자식. 생물학적으로 중성.' },
    { id: 'jimseung_daemo', name: '짐승 대모', role: '포유류 어미', type: 'F', parents: ['anim_ebro'], desc: '애님 에브로의 후손. 포유류들의 어미.' },
    { id: 'nalgae_eomeoni', name: '날개 어머니', role: '조류 어미', type: 'F', parents: ['peuroegel', 'earal'], desc: '에아랄의 딸. 조류들의 어미.' },
    { id: 'bbul_abi', name: '뿔의 아비', role: '유각 포유류 아비', type: 'M', parents: ['kuehoreun'], desc: '쿠에호른의 후손. 뿔 달린 포유류들의 아비.' },
  ];

  const partners = [
    { id: 'p_altair_kerub', nodes: ['altair', 'kerubeal'], type: 'affair' },
    { id: 'p_kerub_ereda', nodes: ['kerubeal', 'ereda'], type: 'marriage' },
    { id: 'p_aetos_pteno', nodes: ['aetos', 'pteno'], type: 'marriage' },
    { id: 'p_lepis_kerapa', nodes: ['lepis', 'kerapa'], type: 'marriage' },
    { id: 'p_shueneju_horap', nodes: ['shueneju', 'horap'], type: 'marriage' },
    { id: 'p_ante_bal', nodes: ['antegrisa', 'balbucha'], type: 'marriage' },
    { id: 'p_peur_ear', nodes: ['peuroegel', 'earal'], type: 'marriage' },
  ];

  const connections: React.ReactNode[] = [];

  partners.forEach(p => {
    const r1 = rects[p.nodes[0]];
    const r2 = rects[p.nodes[1]];
    if (!r1 || !r2) return;
    const left = r1.x < r2.x ? r1 : r2;
    const right = r1.x < r2.x ? r2 : r1;
    const startX = left.x + left.w;
    const endX = right.x;
    const y = left.y + 16; 
    
    connections.push(
      <line
        key={`m_${p.id}`}
        x1={startX} y1={y} x2={endX} y2={y}
        stroke={p.type === 'marriage' ? '#FF6B00' : '#ec4899'}
        strokeWidth="2"
        strokeDasharray={p.type === 'affair' ? '4 4' : 'none'}
      />
    );
  });

  treeNodes.forEach(node => {
    if (!node.parents) return;
    const cRect = rects[node.id];
    if (!cRect) return;

    let pX, pY;

    // Handle special affair children drops explicitly
    if (node.id === 'guhet' || node.id === 'puriuli') {
       const r1 = rects['mi'];
       const r2 = rects['shunait'];
       if (r1 && r2) {
         pX = (r1.x + r1.w/2 + r2.x + r2.w/2) / 2;
         pY = r1.y + r1.h + 70; // Peak of mi-shunait affair curve
       }
    } else if (node.id === 'seupaneiji') {
       const r1 = rects['mi'];
       const r2 = rects['rieba'];
       if (r1 && r2) {
         pX = (r1.x + r1.w/2 + r2.x + r2.w/2) / 2;
         pY = r1.y + r1.h + 40; // Peak of mi-rieba affair curve
       }
    } else if (node.parents.length === 2) {
      const r1 = rects[node.parents[0]];
      const r2 = rects[node.parents[1]];
      if (r1 && r2) {
        const left = r1.x < r2.x ? r1 : r2;
        const right = r1.x < r2.x ? r2 : r1;
        pX = (left.x + left.w + right.x) / 2;
        pY = left.y + 16;
      }
    } else if (node.parents.length === 1) {
      const r1 = rects[node.parents[0]];
      if (r1) {
        pX = r1.x + r1.w / 2;
        pY = r1.y + r1.h;
      }
    }

    if (pX !== undefined && pY !== undefined) {
      const cX = cRect.x + cRect.w / 2;
      const cY = cRect.y;

      const d = `M ${pX} ${pY} C ${pX} ${pY + 50}, ${cX} ${cY - 50}, ${cX} ${cY}`;
      connections.push(
        <path
          key={`c_${node.id}`}
          d={d}
          fill="none"
          stroke="#555"
          strokeWidth="2"
          className="opacity-50"
        />
      );
    }
  });

  const miRect = rects['mi'];
  const shunaitRect = rects['shunait'];
  const riebaRect = rects['rieba'];

  if (miRect && shunaitRect) {
    const x1 = miRect.x + miRect.w / 2;
    const y1 = miRect.y + miRect.h;
    const x2 = shunaitRect.x + shunaitRect.w / 2;
    const y2 = shunaitRect.y + shunaitRect.h;
    connections.push(<path key="af1" d={`M ${x1} ${y1} Q ${(x1+x2)/2} ${y1+70} ${x2} ${y2}`} fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 4" className="opacity-60" />);
  }
  if (miRect && riebaRect) {
    const x1 = miRect.x + miRect.w / 2;
    const y1 = miRect.y + miRect.h;
    const x2 = riebaRect.x + riebaRect.w / 2;
    const y2 = riebaRect.y + riebaRect.h;
    connections.push(<path key="af2" d={`M ${x1} ${y1} Q ${(x1+x2)/2} ${y1+40} ${x2} ${y2}`} fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 4" className="opacity-60" />);
  }

  const NodeCard = ({ id }: { id: string }) => {
    const node = treeNodes.find(n => n.id === id);
    if (!node) return null;
    
    const isMale = node.type === 'M';
    const isFemale = node.type === 'F';

    return (
      <div data-node-id={node.id} className="relative flex flex-col items-center w-40 group shrink-0">
        <div className={`
            px-4 py-1.5 rounded-full bg-[#050505]/80 backdrop-blur-md flex items-center justify-center gap-2 mb-3 relative z-10 
            border transition-all duration-300
            ${isMale ? 'border-[#FF6B00]/40 text-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.1)] hover:border-[#FF6B00]' : 
              isFemale ? 'border-zinc-500 text-zinc-300 shadow-[0_0_15px_rgba(161,161,170,0.1)] hover:border-zinc-300' : 
              'border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:border-purple-400'}
        `}>
          <span className="font-bold tracking-widest text-xs z-10">{node.name}</span>
        </div>
        
        <div className="flex flex-col text-center w-full px-2">
          <span className="text-[10px] text-[#888] font-mono uppercase tracking-widest mb-1.5 pb-1 border-b border-[#222]">
            {node.role}
          </span>
          <p className="text-[11px] text-zinc-500 leading-relaxed font-sans mt-1 group-hover:text-zinc-300 transition-colors">
            {node.desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col min-h-0 bg-transparent">
      {entry && entry.content && (
         <div className="shrink-0 mb-4">
            <p className="text-[#AAA] text-sm leading-relaxed">{entry.content}</p>
         </div>
      )}

      <div className="flex-1 w-full overflow-auto custom-scrollbar relative">
        <div className="min-w-max relative pt-8 px-16 pb-32 h-fit" ref={containerRef}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {connections}
          </svg>
          
          <div className="absolute top-4 left-4 bg-[#0A0A0A]/90 backdrop-blur-sm border border-[#333] p-3 text-[10px] font-mono text-zinc-400 space-y-2 z-20 pointer-events-none rounded clip-corner-sm">
            <div className="text-[#FF6B00] font-bold mb-2 uppercase border-b border-[#333] pb-1 tracking-wider">Visual Legend</div>
            <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full border border-orange-500 bg-[#FF6B00]/10" /> 로그데니 (남신)</div>
            <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full border border-zinc-300 bg-[#222]/50" /> 라나데니 (여신)</div>
            <div className="flex items-center gap-3 mt-3"><div className="w-3 h-[2px] bg-[#FF6B00]" /> 혼인 (부부 결합)</div>
            <div className="flex items-center gap-3"><div className="w-3 h-0 border-t-[2px] border-dashed border-[#ec4899]" /> 사랑 (비공식 연인)</div>
            <div className="flex items-center gap-3"><div className="w-3 h-[2px] bg-[#555]" /> 계보 연결선 (곡선/가계도)</div>
          </div>

          <div className="flex flex-col gap-24 relative z-10 w-fit mx-auto mt-2">
            {/* Gen 1 */}
            <div className="flex gap-16 justify-center">
              <NodeCard id="altair" />
              <NodeCard id="kerubeal" />
              <NodeCard id="ereda" />
            </div>
            {/* Gen 2 */}
            <div className="flex gap-6 justify-center">
              <NodeCard id="aetos" />
              <NodeCard id="pteno" />
              <NodeCard id="lepis" />
              <NodeCard id="kerapa" />
              <NodeCard id="shueneju" />
              <NodeCard id="horap" />
              <NodeCard id="alpesi" />
              <NodeCard id="talamoresa" />
              <NodeCard id="morataek" />
            </div>
            {/* Gen 3 (Gods & Demigods Gen 1) */}
            <div className="flex gap-10 justify-center items-start">
              <NodeCard id="mi" />
              <NodeCard id="rieba" />
              <NodeCard id="shunait" />
              <NodeCard id="serakarel" />
              
              {/* Demigods Gen 1 - Next to Talamoresa */}
              <div className="flex gap-6 pl-12 border-l border-[#333]">
                <NodeCard id="somoras" />
                <NodeCard id="antegrisa" />
                <NodeCard id="balbucha" />
              </div>
            </div>
            {/* Gen 4 & Demigods Gen 2 */}
            <div className="flex gap-12 justify-center items-start">
              <div className="flex gap-6">
                <NodeCard id="guhet" />
                <NodeCard id="puriuli" />
                <NodeCard id="seupaneiji" />
              </div>

              <div className="flex gap-4 pl-12 border-l border-[#333]">
                <NodeCard id="kozeubuero" />
                <NodeCard id="anim_ebro" />
                <NodeCard id="peuroegel" />
                <NodeCard id="earal" />
                <NodeCard id="kuehoreun" />
              </div>
            </div>
            
            {/* Demigods Gen 3 */}
            <div className="flex justify-end pr-24">
              <div className="flex gap-8">
                <NodeCard id="bineulsumu" />
                <NodeCard id="jimseung_daemo" />
                <NodeCard id="nalgae_eomeoni" />
                <NodeCard id="bbul_abi" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
