import React from 'react';
import { MoveRight, Menu } from 'lucide-react';

interface Props {
  onOpenMenu: () => void;
}

const Hero: React.FC<Props> = ({ onOpenMenu }) => {
  return (
    <div className="relative w-full h-[85vh] min-h-[600px] flex flex-col">
      
      {/* Background Image with Minimal Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?q=80&w=2071&auto=format&fit=crop" 
          alt="Middle Earth Landscape" 
          className="w-full h-full object-cover opacity-40 grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0b]/90 via-[#0a0c0b]/40 to-[#0a0c0b]"></div>
      </div>

      {/* Top Navigation Bar */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#c5a059] rotate-45"></div>
            <span className="text-sm font-bold tracking-[0.3em] text-[#c5a059] uppercase font-serif">Silmaril</span>
        </div>

        <button 
          onClick={onOpenMenu}
          className="group flex items-center gap-3 text-[#a8a29e] hover:text-[#c5a059] transition-colors duration-300"
        >
          <span className="text-xs uppercase tracking-widest font-bold hidden sm:block">Open Menu</span>
          <Menu className="w-6 h-6" strokeWidth={1} />
        </button>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center space-y-8 px-4">
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="text-[#c5a059] text-sm tracking-[0.5em] uppercase border-b border-[#c5a059]/30 pb-2">The Fourth Age</span>
        </div>
        
        <h1 className="text-6xl md:text-9xl text-[#e5e5e5] rpg-font tracking-wider drop-shadow-2xl">
          SILMARIL
        </h1>
        
        <p className="text-lg md:text-2xl text-[#a8a29e] max-w-xl mx-auto font-light leading-relaxed italic">
          "Not all those who wander are lost." <br/>
          <span className="text-sm not-italic mt-2 block opacity-60">A Voxel Roleplay Experience</span>
        </p>

        <div className="pt-8">
          <button className="group relative px-10 py-4 bg-transparent border border-[#c5a059]/50 text-[#c5a059] hover:bg-[#c5a059] hover:text-[#0a0c0b] transition-all duration-500 ease-out">
            <span className="relative z-10 flex items-center gap-4 uppercase tracking-[0.2em] text-xs font-bold">
              Enter the Realm
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>

      {/* Minimal Server Status Bottom */}
      <div className="relative z-10 pb-8 w-full flex justify-center">
         <div className="flex items-center gap-4 text-[#a8a29e]/60 text-xs tracking-widest uppercase">
            <span>play.silmaril-server.net</span>
            <span className="w-1 h-1 bg-[#c5a059] rounded-full"></span>
            <span>1,242 Wanderers</span>
         </div>
      </div>
    </div>
  );
};

export default Hero;