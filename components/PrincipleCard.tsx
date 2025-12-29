import React from 'react';
import { PrincipleItem } from '../types';

interface Props {
  principle: PrincipleItem;
}

const PrincipleCard: React.FC<Props> = ({ principle }) => {
  return (
    <div className="group relative bg-ink-800 p-6 rounded-xl border border-ink-700 shadow-lg hover:shadow-2xl hover:border-gold-500/50 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between h-full">
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-ink-900 border border-ink-700 flex items-center justify-center text-xs font-mono text-slate-400 group-hover:text-gold-500 group-hover:border-gold-500 transition-colors">
        {principle.id}
      </div>
      
      <div className="mb-4">
        {/* Decorative quote mark */}
        <span className="text-4xl leading-none text-ink-700 font-serif absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
          &rdquo;
        </span>
      </div>

      <p className="text-slate-300 text-lg leading-relaxed font-light font-sans relative z-10 group-hover:text-slate-100 transition-colors">
        {principle.content}
      </p>

      {/* Subtle highlight line at bottom */}
      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/70 transition-all duration-500"></div>
    </div>
  );
};

export default PrincipleCard;