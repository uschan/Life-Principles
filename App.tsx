import React, { useState, useMemo } from 'react';
import { principles, analysisData } from './data';
import { PrincipleItem } from './types';
import ZenithCard from './components/ZenithCard';
import AnalysisSection from './components/AnalysisSection';
import ConsoleView from './components/ConsoleView';
import PrincipleModal from './components/PrincipleModal';
import ShareModal from './components/ShareModal'; // New Import
import { Category } from './types';
import { 
  XIcon, 
  GithubIcon, 
  InstagramIcon, 
  BlueskyIcon, 
  PaypalIcon, 
  DiscordIcon, 
  GlobeIcon 
} from './components/Icons';

const App: React.FC = () => {
  const [view, setView] = useState<'DATABASE' | 'DIAGNOSTICS' | 'CONSOLE'>('DATABASE');
  const [filter, setFilter] = useState<Category | 'ALL'>('ALL');
  const [selectedPrinciple, setSelectedPrinciple] = useState<PrincipleItem | null>(null);
  const [sharePrinciple, setSharePrinciple] = useState<PrincipleItem | null>(null); // State for Share Modal

  const categories: Category[] = ['CORE', 'STRATEGY', 'MINDSET', 'RELATION', 'SYSTEM'];

  const filteredPrinciples = useMemo(() => {
    if (filter === 'ALL') return principles;
    return principles.filter(p => p.category === filter);
  }, [filter]);

  const handleCardClick = (principle: PrincipleItem) => {
    if (principle.deepDive) {
      setSelectedPrinciple(principle);
    }
  };

  const handleShare = () => {
    if (selectedPrinciple) {
      setSharePrinciple(selectedPrinciple); // Set principle for sharing
      setSelectedPrinciple(null); // Close the detail modal
    }
  };

  return (
    <div className="min-h-screen bg-zenith-bg text-gray-200 font-sans selection:bg-signal-orange selection:text-black relative overflow-x-hidden">
      
      {/* BACKGROUND: Scanlines */}
      <div className="fixed inset-0 z-0 bg-scanlines opacity-20 pointer-events-none"></div>

      {/* MODAL: DETAIL */}
      {selectedPrinciple && (
        <PrincipleModal 
          principle={selectedPrinciple} 
          onClose={() => setSelectedPrinciple(null)}
          onShare={handleShare}
        />
      )}

      {/* MODAL: SHARE */}
      {sharePrinciple && (
        <ShareModal 
          principle={sharePrinciple}
          onClose={() => setSharePrinciple(null)}
        />
      )}
      
      {/* HEADER: Industrial HUD Style */}
      <header className="sticky top-0 z-50 bg-zenith-bg/95 backdrop-blur-md border-b border-zenith-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            {/* LOGO AREA */}
            <div className="flex items-center gap-3 md:gap-4 cursor-pointer" onClick={() => setView('DATABASE')}>
               <div className="w-8 h-8 md:w-8 md:h-8 bg-signal-orange flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M12 4v16m8-8H4" />
                  </svg>
               </div>
               <div className="flex flex-col justify-center">
                 <h1 className="text-sm md:text-lg font-bold tracking-tight leading-none text-white whitespace-nowrap">
                   THE ZENITH PROTOCOL
                 </h1>
                 <p className="hidden md:block text-[10px] font-mono text-gray-500 tracking-[0.2em] uppercase mt-1">
                   Life Principles // v2.0
                 </p>
               </div>
            </div>

            {/* STATUS INDICATOR: "ENTROPY: RESISTING" */}
            <div className="hidden lg:flex items-center gap-3 border-l border-zenith-border pl-6 h-8 group cursor-help" title="Life is the struggle against disorder. Keep building order.">
               <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-green group-hover:bg-white transition-colors"></span>
               </div>
               <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-gray-600 tracking-widest leading-none uppercase mb-1">SYSTEM STATUS</span>
                  <span className="font-mono text-[10px] text-signal-green tracking-[0.15em] leading-none uppercase group-hover:text-white transition-colors">
                    ENTROPY: RESISTING
                  </span>
               </div>
            </div>
          </div>

          {/* RIGHT NAVIGATION */}
          <nav className="flex items-center h-full">
            <button 
              onClick={() => setView('DATABASE')}
              className={`h-full px-3 md:px-6 font-mono text-[10px] md:text-xs tracking-widest transition-colors relative flex items-center
                ${view === 'DATABASE' ? 'text-white bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <span className="md:hidden">DB</span>
              <span className="hidden md:inline">DATABASE</span>
              {view === 'DATABASE' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-signal-orange"></div>}
            </button>
            <div className="h-4 md:h-8 w-px bg-zenith-border"></div>
            <button 
              onClick={() => setView('DIAGNOSTICS')}
              className={`h-full px-3 md:px-6 font-mono text-[10px] md:text-xs tracking-widest transition-colors relative flex items-center
                ${view === 'DIAGNOSTICS' ? 'text-white bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <span className="md:hidden">DIAG</span>
              <span className="hidden md:inline">DIAGNOSTICS</span>
              {view === 'DIAGNOSTICS' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-signal-green"></div>}
            </button>
            <div className="h-4 md:h-8 w-px bg-zenith-border"></div>
            <button 
              onClick={() => setView('CONSOLE')}
              className={`h-full px-3 md:px-6 font-mono text-[10px] md:text-xs tracking-widest transition-colors relative flex items-center group
                ${view === 'CONSOLE' ? 'text-white bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <span className="w-1.5 h-1.5 bg-signal-red rounded-full mr-2 animate-pulse md:hidden"></span>
              <span className="md:hidden">OS</span>
              <span className="hidden md:flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-signal-red rounded-full animate-pulse"></span>
                 CONSOLE
              </span>
              {view === 'CONSOLE' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-signal-red"></div>}
            </button>
          </nav>

        </div>
        
        {/* FILTER BAR (Only visible in Database View) */}
        {view === 'DATABASE' && (
          <div className="border-t border-zenith-border bg-zenith-surface/50 relative group">
            
            {/* Gradient Masks for Scroll Indication */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-zenith-bg/80 to-transparent pointer-events-none z-10 md:hidden"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zenith-bg/80 to-transparent pointer-events-none z-10 md:hidden"></div>

            <div className="max-w-[1600px] mx-auto px-0 md:px-8 flex overflow-x-auto no-scrollbar scroll-smooth">
              <button 
                onClick={() => setFilter('ALL')}
                className={`h-10 md:h-12 px-4 md:px-6 font-mono text-[10px] md:text-xs tracking-widest border-r border-zenith-border transition-all duration-75 whitespace-nowrap shrink-0
                  ${filter === 'ALL' ? 'bg-white text-black font-bold' : 'text-gray-500 hover:text-white hover:bg-zenith-border/50'}`}
              >
                [ ALL ]
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`h-10 md:h-12 px-4 md:px-6 font-mono text-[10px] md:text-xs tracking-widest border-r border-zenith-border transition-all duration-75 whitespace-nowrap shrink-0
                    ${filter === cat ? 'bg-white text-black font-bold' : 'text-gray-500 hover:text-white hover:bg-zenith-border/50'}`}
                >
                  // {cat}
                </button>
              ))}
              {/* Spacer for mobile scroll padding */}
              <div className="w-4 shrink-0 md:hidden"></div>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col min-h-[80vh]">
        
        <div className="flex-grow">
        {view === 'DATABASE' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-zenith-border border border-zenith-border">
              {filteredPrinciples.map((p) => (
                 <ZenithCard 
                    key={p.id} 
                    principle={p} 
                    onClick={handleCardClick}
                 />
              ))}
            </div>

            {/* STATS SECTION */}
            <div className="mt-12 border-t border-zenith-border pt-8 flex justify-between items-end font-mono text-xs text-gray-600">
               <div>
                 <p>TOTAL ITEMS: {principles.length}</p>
                 <p>FILTERED: {filteredPrinciples.length}</p>
               </div>
               <div className="text-right">
                 <p>SESSION ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                 <p className="mt-2 text-[10px] uppercase tracking-widest">Constructed for long-term survival</p>
               </div>
            </div>
          </>
        )}

        {view === 'DIAGNOSTICS' && (
          <AnalysisSection data={analysisData} />
        )}

        {view === 'CONSOLE' && (
          <ConsoleView />
        )}
        </div>

        {/* FOOTER: Social Capsule & Copyright */}
        <footer className="mt-24 pb-12 flex flex-col items-center gap-8">
            <div className="bg-zenith-surface/80 border border-zenith-border rounded-full px-6 py-3 flex items-center gap-5 shadow-2xl backdrop-blur-sm hover:border-gray-600 transition-colors">
               <a href="https://x.com/uschan" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="X (Twitter)">
                  <XIcon className="w-4 h-4" />
               </a>
               <a href="https://github.com/uschan" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="GitHub">
                  <GithubIcon className="w-4 h-4" />
               </a>
               <a href="https://www.instagram.com/bujjun" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors" title="Instagram">
                  <InstagramIcon className="w-4 h-4" />
               </a>
               <a href="https://bsky.app/profile/wildsalt.bsky.social" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors" title="Bluesky">
                  <BlueskyIcon className="w-4 h-4" />
               </a>
               <a href="https://discord.gg/26nJEhq6Yj" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-400 transition-colors" title="Discord">
                  <DiscordIcon className="w-4 h-4" />
               </a>
               <a href="https://paypal.me/wildsaltme?utm_source=wildsalt.me" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-300 transition-colors" title="PayPal">
                  <PaypalIcon className="w-4 h-4" />
               </a>
               <div className="w-px h-4 bg-zenith-border"></div>
               <a href="https://wildsalt.me/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-signal-orange transition-colors flex items-center gap-2 group" title="Wildsalt.me">
                  <GlobeIcon className="w-4 h-4" />
                  <span className="text-[10px] font-mono tracking-widest hidden sm:inline group-hover:text-white">WILDSALT</span>
               </a>
            </div>

            <p className="text-[10px] font-mono text-gray-600 tracking-widest uppercase">
              © {new Date().getFullYear()} The Zenith Protocol. All rights reserved.
            </p>
        </footer>

      </main>

    </div>
  );
};

export default App;