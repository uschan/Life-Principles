import React from 'react';
import { AnalysisData } from '../types';

interface Props {
  data: AnalysisData;
}

const AnalysisSection: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-[1400px] mx-auto space-y-24 pb-24">
      
      {/* SECTION 0: HEADER */}
      <div className="border-l-2 border-signal-orange pl-8 py-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
               <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
             </svg>
        </div>
        <h2 className="text-4xl font-sans font-bold text-white tracking-tighter mb-4">
          SYSTEM DIAGNOSTICS <span className="text-signal-orange">//</span> REPORT
        </h2>
        <p className="text-lg font-mono text-gray-400 leading-relaxed max-w-3xl border-t border-zenith-border pt-4 mt-4">
          <span className="text-signal-orange mr-2">>></span>
          {data.intro}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* SECTION 1: META LOGIC (KERNEL) - LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-12">
          {data.metaLogic && (
            <section className="relative group">
               <div className="flex items-center gap-4 mb-8 border-b border-zenith-border pb-2">
                  <div className="w-2 h-2 bg-signal-orange animate-pulse"></div>
                  <h3 className="text-sm font-mono tracking-[0.2em] text-gray-500 uppercase">
                    {data.metaLogic.title}
                  </h3>
               </div>
               
               <div className="grid gap-6">
                  {data.metaLogic.rules.map((rule, idx) => (
                     <div key={idx} className="bg-zenith-surface border border-zenith-border p-6 relative hover:border-gray-500 transition-colors">
                        <div className="absolute top-0 right-0 px-2 py-1 bg-zenith-border text-[10px] font-mono text-gray-400">
                          KERNEL_RULE_{idx + 1}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{rule.title}</h4>
                        <p className="text-xs font-mono text-signal-orange mb-4 uppercase tracking-wider">[{rule.description}]</p>
                        <ul className="space-y-2">
                           {rule.points.map((p, i) => (
                              <li key={i} className="text-sm text-gray-400 font-mono flex items-start gap-3">
                                 <span className="text-gray-600">::</span>
                                 <span>{p}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>
            </section>
          )}

          {/* SECTION 3: KEY INSIGHT (DECODER) */}
          {data.keyInsight && (
            <section className="bg-zenith-border/20 border border-signal-orange/50 p-8 relative overflow-hidden">
               {/* Scanline overlay */}
               <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>
               
               <div className="relative z-10">
                 <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                       {data.keyInsight.title}
                    </h3>
                    <div className="px-3 py-1 border border-signal-orange text-signal-orange text-[10px] font-mono tracking-widest">
                       CONFIDENTIAL
                    </div>
                 </div>
                 
                 <div className="space-y-4 mb-8">
                    {data.keyInsight.points.map((p, i) => (
                      <div key={i} className="flex gap-4 items-start">
                         <span className="text-signal-green font-mono text-xs mt-1">[OK]</span>
                         <p className="text-gray-300 text-sm leading-relaxed">{p}</p>
                      </div>
                    ))}
                 </div>

                 <div className="border-t border-signal-orange/30 pt-6 mt-6">
                    <p className="font-mono text-signal-orange text-sm md:text-base leading-relaxed">
                      <span className="animate-pulse mr-2">_</span>
                      {data.keyInsight.highlight}
                    </p>
                 </div>
               </div>
            </section>
          )}
        </div>

        {/* SECTION 2: CORE FRAMEWORK (ARCHITECTURE) - RIGHT COLUMN */}
        <div className="lg:col-span-5 space-y-12">
          
          <section>
            <div className="flex items-center gap-4 mb-8 border-b border-zenith-border pb-2">
                <div className="w-2 h-2 bg-signal-green"></div>
                <h3 className="text-sm font-mono tracking-[0.2em] text-gray-500 uppercase">
                  {data.coreFramework.title}
                </h3>
            </div>

            <div className="space-y-4">
              {data.coreFramework.points.map((point, idx) => (
                <div key={idx} className="p-6 bg-zenith-surface border-l-2 border-zenith-border hover:border-signal-green transition-colors">
                  <h4 className="text-white font-bold mb-2 flex justify-between items-center">
                    {point.label}
                    <span className="text-[10px] font-mono text-gray-600">MOD_{String.fromCharCode(65+idx)}</span>
                  </h4>
                  <div className="text-[10px] font-mono text-gray-500 mb-3 break-words">
                    REF_ID: {point.ids.map(id => `#${id}`).join(' ')}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* DEEP DIVE LOGS */}
          <section className="space-y-6">
             <div className="flex items-center gap-4 mb-4 border-b border-zenith-border pb-2">
                <div className="w-2 h-2 bg-gray-500"></div>
                <h3 className="text-sm font-mono tracking-[0.2em] text-gray-500 uppercase">
                  ADDITIONAL_LOGS
                </h3>
            </div>
            {data.sections.map((section, idx) => (
              <div key={idx} className="group">
                <h4 className="text-gray-200 font-bold mb-3 group-hover:text-white transition-colors">
                  {section.title}
                </h4>
                <ul className="space-y-2 border-l border-zenith-border pl-4">
                  {section.content.map((item, i) => (
                    <li key={i} className="text-xs text-gray-500 font-mono leading-relaxed group-hover:text-gray-400">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

           {/* FINAL SUMMARY */}
           <div className="bg-white text-black p-6 relative">
              <div className="absolute top-0 right-0 w-4 h-4 bg-black"></div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4 border-b border-black pb-2">
                Executive Summary
              </h3>
              <p className="font-mono text-xs leading-relaxed">
                {data.summary}
              </p>
           </div>

        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;