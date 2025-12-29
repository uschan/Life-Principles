import React, { useState, useEffect, useRef } from 'react';
import { runSimulation, ZenithAnalysis } from '../services/zenithAI';
import { principles } from '../data';
import ZenithCard from './ZenithCard';

const ConsoleView: React.FC = () => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<ZenithAnalysis | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (text: string) => {
    setLogs(prev => [...prev, text]);
  };

  const handleRun = async () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    setResult(null);
    setLogs(['> INITIALIZING KERNEL...', '> CONNECTING TO NEURAL NET...']);

    // UI Effects
    setTimeout(() => addLog('> UPLOADING CONTEXT...'), 600);
    setTimeout(() => addLog('> RUNNING HEURISTICS...'), 1200);

    try {
      const analysis = await runSimulation(input);
      setResult(analysis);
      addLog('> DIAGNOSTIC COMPLETE.');
      addLog(`> VERDICT: ${analysis.verdict}`);
    } catch (e) {
      console.error(e);
      addLog('> ERROR: CONNECTION SEVERED. REVERTING TO SAFE MODE.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Get relevant principles
  const relevantPrinciples = result 
    ? principles.filter(p => result.relevantPrincipleIds.includes(p.id))
    : [];

  return (
    <div className="max-w-[1400px] mx-auto pb-24 grid lg:grid-cols-2 gap-8 h-full">
      
      {/* LEFT COLUMN: TERMINAL INTERFACE */}
      <div className="flex flex-col h-[500px] md:h-[600px] lg:h-[750px] bg-black border border-zenith-border relative overflow-hidden font-mono shadow-2xl">
         {/* Decoration */}
         <div className="absolute top-0 left-0 right-0 h-8 bg-zenith-border/30 flex items-center px-4 justify-between border-b border-zenith-border">
            <span className="text-[10px] text-gray-500 tracking-widest">ZENITH_OS_KERNEL_V2.4</span>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
               <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
               <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            </div>
         </div>

         {/* Logs Area */}
         <div className="flex-grow p-4 md:p-6 pt-12 overflow-y-auto space-y-2 text-xs md:text-sm text-signal-green no-scrollbar">
            <div className="opacity-50 mb-4">
              <p>Welcome to Zenith OS.</p>
              <p>Type your dilemma below to run a system audit.</p>
              <p>--------------------------------------------</p>
            </div>
            {logs.map((log, i) => (
              <p key={i} className="leading-tight break-words">{log}</p>
            ))}
            {isProcessing && (
               <p className="animate-pulse">_</p>
            )}
            <div ref={logsEndRef} />
         </div>

         {/* Input Area */}
         <div className="p-4 bg-zenith-surface border-t border-zenith-border">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="> Describe your decision scenario here..."
              className="w-full bg-black text-white p-4 font-mono text-xs md:text-sm border border-zenith-border focus:border-signal-orange outline-none resize-none h-24 md:h-32 placeholder-gray-700"
              disabled={isProcessing}
            />
            <div className="flex justify-between items-center mt-4">
               <div className="text-[10px] text-gray-500 uppercase">
                  {input.length} CHARS
               </div>
               <button 
                 onClick={handleRun}
                 disabled={isProcessing || !input}
                 className={`px-4 md:px-6 py-2 font-mono text-xs font-bold tracking-widest uppercase transition-all
                    ${isProcessing || !input 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                      : 'bg-signal-orange text-black hover:bg-white'}`}
               >
                 {isProcessing ? 'PROCESSING...' : 'RUN_SIMULATION'}
               </button>
            </div>
         </div>
      </div>

      {/* RIGHT COLUMN: VISUALIZATION */}
      <div className="space-y-6 overflow-y-auto lg:h-[750px] no-scrollbar">
         
         {!result && (
           <div className="h-full hidden lg:flex flex-col items-center justify-center text-gray-600 border border-dashed border-zenith-border bg-zenith-bg/50 p-12 text-center">
              <div className="w-16 h-16 border border-gray-700 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              </div>
              <p className="font-mono text-sm tracking-widest">AWAITING DIAGNOSTIC DATA</p>
              <p className="text-xs mt-2 max-w-xs">Enter a scenario on the terminal to activate the decision matrix.</p>
           </div>
         )}

         {result && (
            <>
               {/* SCORECARD */}
               <div className="bg-zenith-surface border border-zenith-border p-6 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-20 
                    ${result.verdict === 'APPROVED' ? 'bg-signal-green' : result.verdict === 'REJECTED' ? 'bg-signal-red' : 'bg-signal-amber'}`}></div>
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                     <div>
                        <h2 className="text-[10px] font-mono text-gray-400 tracking-widest uppercase mb-1">SYSTEM VERDICT</h2>
                        <div className={`text-3xl md:text-4xl font-bold tracking-tighter 
                           ${result.verdict === 'APPROVED' ? 'text-signal-green' : result.verdict === 'REJECTED' ? 'text-signal-red' : 'text-signal-amber'}`}>
                           {result.verdict}
                        </div>
                     </div>
                     <div className="text-right">
                        <h2 className="text-[10px] font-mono text-gray-400 tracking-widest uppercase mb-1">ALIGNMENT</h2>
                        <div className="text-3xl md:text-4xl font-mono text-white">
                           {result.score}<span className="text-lg text-gray-500">/100</span>
                        </div>
                     </div>
                  </div>

                  {/* ANALYSIS TEXT */}
                  <div className="border-t border-zenith-border pt-4 relative z-10">
                     <p className="font-mono text-xs md:text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                        <span className="text-signal-orange mr-2">>></span>
                        {result.analysis}
                     </p>
                  </div>

                  {/* RISK FACTORS */}
                  {result.riskFactors.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                       {result.riskFactors.map((risk, i) => (
                          <span key={i} className="px-2 py-1 bg-red-900/20 border border-red-900/50 text-red-400 text-[10px] font-mono uppercase">
                             WARN: {risk}
                          </span>
                       ))}
                    </div>
                  )}
               </div>

               {/* RELEVANT CARDS */}
               <div>
                  <h3 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-4 pl-1">
                     REFERENCED PRINCIPLES
                  </h3>
                  <div className="grid gap-4">
                     {relevantPrinciples.map(p => (
                        <div key={p.id} className="h-auto">
                           <ZenithCard principle={p} />
                        </div>
                     ))}
                  </div>
               </div>
            </>
         )}

      </div>
    </div>
  );
};

export default ConsoleView;