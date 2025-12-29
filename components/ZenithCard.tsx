import React from 'react';
import { PrincipleItem } from '../types';

interface Props {
  principle: PrincipleItem;
}

const ZenithCard: React.FC<Props> = ({ principle }) => {
  // Category Color Mapping
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'CORE': return 'text-signal-orange';
      case 'STRATEGY': return 'text-blue-400';
      case 'MINDSET': return 'text-purple-400';
      case 'RELATION': return 'text-pink-400';
      case 'SYSTEM': return 'text-signal-green';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="group relative bg-zenith-surface border border-zenith-border h-full flex flex-col transition-all duration-75 hover:bg-gray-200 hover:border-white overflow-hidden">
      
      {/* DECORATION: Corner Cut (Visualized via clip-path or simple absolute divs) */}
      <div className="absolute -top-[1px] -right-[1px] w-4 h-4 bg-zenith-bg border-b border-l border-zenith-border z-10 group-hover:bg-gray-200 group-hover:border-black"></div>
      <div className="absolute top-0 right-0 w-6 h-px bg-zenith-borderLight group-hover:bg-black/20"></div>
      <div className="absolute top-0 right-0 h-6 w-px bg-zenith-borderLight group-hover:bg-black/20"></div>

      {/* HEADER: Meta Data */}
      <div className="flex justify-between items-baseline p-6 pb-2 font-mono text-[10px] tracking-widest uppercase text-gray-500 group-hover:text-black/60 border-b border-zenith-border/50 group-hover:border-black/10">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-zenith-borderLight group-hover:bg-black/40"></span>
          NO.{principle.id.toString().padStart(2, '0')}
        </span>
        <span className={`${getCategoryColor(principle.category)} group-hover:text-black font-bold`}>
          // {principle.category}
        </span>
      </div>

      {/* BODY: Content */}
      <div className="p-6 flex-grow flex flex-col relative">
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 font-sans tracking-tight text-white group-hover:text-black group-hover:invert-0 transition-colors duration-75">
          {principle.title}
        </h3>

        {/* Main Content */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 font-sans group-hover:text-black/80">
          {principle.content}
        </p>

        {/* Points (Decorated List) */}
        <ul className="mt-auto space-y-2 border-t border-dashed border-zenith-border pt-4 group-hover:border-black/20">
          {principle.points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs text-gray-500 font-mono group-hover:text-black/70">
               <span className="text-signal-orange mt-0.5 group-hover:text-black">_</span>
               <span className="uppercase tracking-wide">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* FOOTER: Interaction Hint */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-zenith-border group-hover:bg-signal-orange transition-colors duration-75"></div>
      
      {/* DECORATION: Crosshair */}
      <div className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white group-hover:text-black">
          <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
      </div>
    </div>
  );
};

export default ZenithCard;