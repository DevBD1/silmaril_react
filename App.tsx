import React, { useState, useEffect } from 'react';
import RadialMenu from './components/RadialMenu';
import Hero from './components/Hero';
import ContentArea from './components/ContentArea';
import { NAV_ITEMS } from './constants';
import { Page } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>(Page.HOME);

  // Effect to handle keyboard shortcut 'M' to open menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        setIsMenuOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c0b] text-[#e5e5e5] selection:bg-[#c5a059]/30 selection:text-[#e5e5e5]">
      
      {/* Fixed Menu Toggle Button (Bottom Right) - Kept as requested */}
      <div className="fixed bottom-8 right-8 z-40">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="group flex items-center justify-center w-14 h-14 bg-[#0f1210] rounded-full border border-[#c5a059]/50 shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:border-[#c5a059] hover:bg-[#142018] transition-all duration-500"
        >
          <Menu className="w-6 h-6 text-[#c5a059] opacity-80 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Radial Navigation Overlay */}
      <RadialMenu 
        items={NAV_ITEMS} 
        activeId={activePage} 
        onSelect={setActivePage}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Main Layout */}
      <main className={`transition-all duration-700 ease-in-out ${isMenuOpen ? 'blur-sm scale-[0.99] opacity-40 grayscale' : ''}`}>
        
        {/* Hero / Header */}
        <Hero onOpenMenu={() => setIsMenuOpen(true)} />

        {/* Dynamic Content */}
        <ContentArea activePage={activePage} />

        {/* Footer */}
        <footer className="border-t border-[#2f3832] py-16 mt-12">
           <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
              <div className="w-4 h-4 border border-[#c5a059] rotate-45 mb-6"></div>
              <h4 className="text-xl text-[#a8a29e] rpg-font tracking-widest mb-4">SILMARIL</h4>
              <p className="text-[#52525b] text-xs font-serif italic max-w-md mb-8">
                "One Ring to rule them all, One Ring to find them, One Ring to bring them all, and in the darkness bind them."
              </p>
              
              <div className="flex gap-8 text-[#52525b] text-xs uppercase tracking-[0.2em]">
                 <a href="#" className="hover:text-[#c5a059] transition-colors">Code</a>
                 <a href="#" className="hover:text-[#c5a059] transition-colors">Lore</a>
                 <a href="#" className="hover:text-[#c5a059] transition-colors">Discord</a>
              </div>
              
              <div className="mt-12 text-[10px] text-[#2f3832]">
                 Not affiliated with Hypixel Studios or Middle-earth Enterprises.
              </div>
           </div>
        </footer>

      </main>

    </div>
  );
};

export default App;