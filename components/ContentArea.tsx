import React from 'react';
import { Page } from '../types';
import { Map, Shield, Crown, Users, ScrollText } from 'lucide-react';

interface Props {
  activePage: Page;
}

const ContentArea: React.FC<Props> = ({ activePage }) => {
  
  const renderContent = () => {
    switch (activePage) {
      case Page.HOME:
        return (
          <div className="space-y-16">
             {/* Introduction Quote */}
             <div className="text-center max-w-2xl mx-auto border-b border-[#c5a059]/20 pb-8">
                <p className="text-xl text-[#c5a059] font-serif italic leading-relaxed">
                   "The world is changed. I feel it in the water. I feel it in the earth. I smell it in the air."
                </p>
             </div>

             {/* News Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "The Shadows of Mordor", desc: "Reports of orc activity increasing near the Black Gate. Prepare your steel.", img: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=600" },
                    { title: "Festival of Starlight", desc: "The Elves of Rivendell invite all peace-lovers to the annual celebration.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600" },
                    { title: "Economy of the Dwarves", desc: "New trading routes opened in the Blue Mountains. Gold prices stabilized.", img: "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=600" }
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="h-64 overflow-hidden relative mb-4 border border-[#2f3832]">
                      <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[50%] group-hover:grayscale-0" alt="News" />
                      <div className="absolute inset-0 bg-[#0a0c0b]/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="pr-4">
                      <span className="text-[#c5a059] text-[10px] uppercase tracking-[0.2em] block mb-2">Chronicle {i+1}</span>
                      <h3 className="text-xl font-medium text-[#e5e5e5] mb-2 font-serif">{item.title}</h3>
                      <p className="text-[#a8a29e] text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );
      
      case Page.SERVER:
        return (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
                <h2 className="text-3xl text-[#e5e5e5] rpg-font mb-2">Realm Status</h2>
                <div className="w-16 h-px bg-[#c5a059] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2f3832] border border-[#2f3832]">
               <div className="bg-[#0a0c0b] p-8 text-center group hover:bg-[#142018] transition-colors">
                  <p className="text-[#a8a29e] text-[10px] uppercase tracking-[0.3em] mb-3">Gateway</p>
                  <span className="text-[#c5a059]">Online</span>
               </div>
               <div className="bg-[#0a0c0b] p-8 text-center group hover:bg-[#142018] transition-colors">
                  <p className="text-[#a8a29e] text-[10px] uppercase tracking-[0.3em] mb-3">Population</p>
                  <span className="text-2xl text-[#e5e5e5] font-serif">1,242</span>
               </div>
               <div className="bg-[#0a0c0b] p-8 text-center group hover:bg-[#142018] transition-colors">
                  <p className="text-[#a8a29e] text-[10px] uppercase tracking-[0.3em] mb-3">Latency</p>
                  <span className="text-[#e5e5e5] font-serif">12ms</span>
               </div>
            </div>

            <div className="flex flex-col gap-6">
               <div className="bg-[#0f1210] border border-[#2f3832] p-6 relative">
                 <div className="absolute top-0 left-0 w-1 h-full bg-[#c5a059]"></div>
                 <h3 className="text-[#c5a059] font-serif text-xl mb-4">Decree of the King</h3>
                 <ul className="space-y-3 text-[#a8a29e] text-sm font-light">
                   <li className="flex gap-3"><span className="text-[#c5a059]">•</span> The borders of Lothlórien are now open to trade.</li>
                   <li className="flex gap-3"><span className="text-[#c5a059]">•</span> Smiths have improved the durability of Mithril armor.</li>
                   <li className="flex gap-3"><span className="text-[#c5a059]">•</span> Fixed an issue where horses would vanish in the Dead Marshes.</li>
                 </ul>
               </div>
            </div>
          </div>
        );

      case Page.MAP:
        return (
          <div className="relative w-full aspect-video bg-[#0f1210] border border-[#2f3832] group overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-10 z-10 pointer-events-none"></div>
             <img src="https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?q=80&w=2073&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 grayscale-[20%] group-hover:scale-105 transition-transform duration-[2s]" alt="Map" />
             
             <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-[#0a0c0b]/80 backdrop-blur-sm p-10 border border-[#c5a059]/30 text-center max-w-md">
                   <Map size={32} className="mx-auto text-[#c5a059] mb-6 opacity-80" />
                   <h3 className="text-xl text-[#e5e5e5] mb-3 rpg-font tracking-widest">The Atlas</h3>
                   <p className="text-[#a8a29e] mb-8 font-serif italic">"To the Sea, to the Sea! The white gulls are crying..."</p>
                   <button className="px-8 py-3 border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-[#0a0c0b] transition-all text-xs uppercase tracking-[0.2em]">
                     View Full Map
                   </button>
                </div>
             </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-32">
            <Crown className="mx-auto text-[#2f3832] mb-6" size={48} />
            <h2 className="text-2xl text-[#a8a29e] mb-4 font-serif">This realm is shrouded in mist</h2>
            <p className="text-[#52525b] text-sm uppercase tracking-widest">Section under construction</p>
          </div>
        );
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 relative z-10 min-h-[50vh]">
       <div className="mb-16 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-5xl text-[#e5e5e5] rpg-font tracking-wider mb-2">{activePage}</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-50"></div>
       </div>
       
       <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
         {renderContent()}
       </div>
    </section>
  );
};

export default ContentArea;