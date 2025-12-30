import React, { useEffect } from 'react';
import { PrincipleItem } from '../types';
import { XIcon } from './Icons';

interface Props {
  principle: PrincipleItem;
  onClose: () => void;
}

const PrincipleModal: React.FC<Props> = ({ principle, onClose }) => {
  const { deepDive } = principle;

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!deepDive) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* MODAL CONTENT CONTAINER */}
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-zenith-bg border border-zenith-border shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden rounded-lg">
        
        {/* HEADER */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-zenith-border bg-zenith-surface/50">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-1">
               <span className="font-mono text-[10px] text-signal-orange tracking-widest border border-signal-orange/30 px-2 py-0.5 rounded">
                 NO.{principle.id.toString().padStart(2, '0')}
               </span>
               <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
                 // {principle.category}
               </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {principle.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="group p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <XIcon className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-10 bg-zenith-bg">
          <div className="prose prose-invert prose-p:text-gray-300 prose-headings:font-bold prose-headings:tracking-tight max-w-none">
            
            {/* INTRO */}
            {deepDive.intro && (
              <div className="font-serif text-lg md:text-xl text-gray-200 leading-relaxed mb-10 border-l-2 border-signal-orange pl-6 py-1">
                {deepDive.intro}
              </div>
            )}

            {/* SECTIONS */}
            <div className="space-y-10">
              {deepDive.sections.map((section, idx) => (
                <div key={idx} className={`${section.isBlockquote ? 'bg-zenith-surface/50 p-6 border border-zenith-border/50 rounded' : ''}`}>
                  
                  {/* Section Title */}
                  {section.title && (
                    <h3 className={`text-xl font-bold mb-4 ${section.isBlockquote ? 'text-signal-orange mt-0' : 'text-white'}`}>
                      {section.title}
                    </h3>
                  )}

                  {/* Section Content */}
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-4">
                    {section.content}
                  </p>

                  {/* List */}
                  {section.list && (
                    <ul className="space-y-2 mb-6">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-300">
                          <span className="text-signal-orange/70 mt-1.5 text-[10px]">◆</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* INSIGHT / PUNCHLINE */}
                  {section.insight && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-signal-orange/10 to-transparent border-l-4 border-signal-orange">
                      <p className="font-bold text-white text-base md:text-lg italic m-0">
                        {section.insight}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* FOOTER / REMINDER */}
            {deepDive.footer && (
              <div className="mt-12 pt-8 border-t border-zenith-border text-center">
                 <p className="font-mono text-xs md:text-sm text-gray-500 leading-loose uppercase tracking-wide">
                   {deepDive.footer}
                 </p>
              </div>
            )}
          </div>
        </div>
        
        {/* PROGRESS BAR DECORATION */}
        <div className="h-1 bg-zenith-border w-full flex-shrink-0">
            <div className="h-full bg-signal-orange w-1/3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PrincipleModal;