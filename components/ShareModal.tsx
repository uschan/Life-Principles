import React, { useEffect, useState, useRef } from 'react';
import { PrincipleItem } from '../types';
import { XIcon, DownloadIcon, SparklesIcon } from './Icons';
import { generatePrincipleImage } from '../services/zenithAI';

interface Props {
  principle: PrincipleItem;
  onClose: () => void;
}

// Curated Unsplash images that match the "Abstract/Zenith/Dark" aesthetic
// These act as high-quality fallbacks if the AI fails.
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop", // Gold abstract
  "https://images.unsplash.com/photo-1506259091721-347f798196d4?q=80&w=1000&auto=format&fit=crop", // Dark geometry
  "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1000&auto=format&fit=crop", // Dark mood
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", // Abstract dark
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop", // Geometry
  "https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=1000&auto=format&fit=crop", // Light ray
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop"  // Liquid metal
];

const ShareModal: React.FC<Props> = ({ principle, onClose }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        setLoading(true);
        const url = await generatePrincipleImage(principle);
        if (isMounted) {
            setImageUrl(url);
            setUsingFallback(false);
        }
      } catch (err) {
        console.warn("AI Generation failed, switching to backup frequency...", err);
        // Fallback Logic
        if (isMounted) {
            const randomFallback = FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
            setImageUrl(randomFallback);
            setUsingFallback(true);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchImage();

    return () => { isMounted = false; };
  }, [principle]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    // Check if html2canvas is loaded
    const html2canvas = (window as any).html2canvas;
    if (!html2canvas) {
      alert("Export module missing. Please check connection.");
      return;
    }

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High resolution
        useCORS: true, // Crucial for Unsplash images
        backgroundColor: '#030303',
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `ZENITH_PRINCIPLE_${principle.id.toString().padStart(2, '0')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error("Export failed", e);
      alert("Export failed. Cross-origin restrictions might prevent saving external images.");
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-md flex flex-col items-center">
        
        {/* ACTION BAR */}
        <div className="w-full flex justify-between items-center mb-4 text-white">
           <div className="flex items-center gap-2">
             <SparklesIcon className="w-4 h-4 text-signal-orange" />
             <span className="text-xs font-mono tracking-widest uppercase">
                {usingFallback ? 'ARCHIVE VISUALS LOADED' : 'VISUAL GENERATOR ACTIVE'}
             </span>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
             <XIcon className="w-5 h-5 text-gray-500 hover:text-white" />
           </button>
        </div>

        {/* CARD PREVIEW CONTAINER */}
        <div 
          ref={cardRef}
          className="w-full aspect-[3/4] bg-zenith-bg border border-zenith-border flex flex-col relative overflow-hidden shadow-2xl group"
        >
          {/* TOP IMAGE SECTION (50%) */}
          <div className="h-[55%] w-full bg-zenith-surface relative overflow-hidden flex items-center justify-center border-b border-zenith-border">
             {loading && (
               <div className="flex flex-col items-center gap-3">
                 <div className="w-8 h-8 border-2 border-signal-orange border-t-transparent rounded-full animate-spin"></div>
                 <span className="text-[10px] font-mono text-signal-orange animate-pulse">GENERATING VISUALS...</span>
               </div>
             )}
             
             {!loading && imageUrl && (
               <div className="w-full h-full relative">
                 <img 
                    src={imageUrl} 
                    alt="Visual" 
                    className="w-full h-full object-cover" 
                    crossOrigin="anonymous" // Important for html2canvas
                 />
                 {/* Visual Texture Overlay for uniformity */}
                 <div className="absolute inset-0 bg-gradient-to-t from-zenith-bg via-transparent to-transparent opacity-50"></div>
               </div>
             )}

             {/* Overlay Texture */}
             <div className="absolute inset-0 bg-scanlines opacity-30 pointer-events-none mix-blend-overlay"></div>
          </div>

          {/* BOTTOM TEXT SECTION (45%) */}
          <div className="h-[45%] p-6 flex flex-col justify-between bg-zenith-bg relative">
             
             <div>
               <div className="flex items-center gap-2 mb-3 opacity-60">
                 <span className="w-1.5 h-1.5 bg-signal-orange"></span>
                 <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
                    NO.{principle.id.toString().padStart(2, '0')} // {principle.category}
                 </span>
               </div>
               
               <h2 className="text-2xl font-bold text-white leading-tight mb-4 tracking-tight">
                 {principle.title}
               </h2>

               <p className="text-xs text-gray-400 leading-relaxed font-mono border-l border-zenith-border pl-3">
                 {principle.content}
               </p>
             </div>

             <div className="flex justify-between items-end border-t border-zenith-border pt-4 mt-2">
                <div className="flex flex-col">
                   <span className="font-bold text-white text-xs tracking-tight">THE ZENITH PROTOCOL</span>
                   <span className="text-[8px] text-gray-600 font-mono tracking-widest uppercase">Anti-Fragile Operating System</span>
                </div>
                {/* QR Code Placeholder Style */}
                <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center">
                   <div className="w-4 h-4 bg-white/20"></div>
                </div>
             </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="w-full mt-6 flex gap-4">
           <button 
             onClick={handleDownload}
             disabled={loading}
             className="flex-1 bg-white text-black h-12 flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <DownloadIcon className="w-4 h-4" />
             EXPORT IMAGE
           </button>
        </div>

      </div>
    </div>
  );
};

export default ShareModal;