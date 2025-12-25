
import React from 'react';
import { Globe, History, Laptop, Tablet, Smartphone, Sparkles, Zap } from 'lucide-react';

const CrateGuide: React.FC = () => {
  return (
    <section className="mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-950 border border-white/5 p-5 md:p-8 group">
        {/* Background Accents */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-500/5 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-[9px] font-black tracking-widest text-red-400 uppercase">
                <Sparkles size={10} />
                Feature Guide
              </div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white brand-cursive">THE CRATE</h2>
            </div>
            <div className="flex gap-2.5 text-zinc-500">
              <Smartphone size={18} className="hover:text-white transition-colors" />
              <Tablet size={18} className="hover:text-white transition-colors" />
              <Laptop size={18} className="hover:text-white transition-colors" />
            </div>
          </div>

          <p className="text-zinc-400 text-base font-medium leading-relaxed max-w-3xl">
            The Crate is your gateway to the world's deepest music archive. It unifies YouTube's massive collection of live sets and remixes with high-fidelity masters, adapting seamlessly to however you listen.
          </p>

          {/* Modular Grid - Responsive columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Globe size={18} />
              </div>
              <h4 className="font-bold text-white">Global Map Mode</h4>
              <p className="text-zinc-500 text-xs leading-snug">Discover what's trending in Tokyo or Detroit. On mobile, swipe through regions; on desktop, explore a full interactive grid.</p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap size={18} />
              </div>
              <h4 className="font-bold text-white">Semantic AI Search</h4>
              <p className="text-zinc-500 text-xs leading-snug">Type lyrics or hum a tune. Ye Beats interprets your intent to find that "lost" dubplate or live performance instantly.</p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                <History size={18} />
              </div>
              <h4 className="font-bold text-white">Historical Deep Dives</h4>
              <p className="text-zinc-500 text-xs leading-snug">Pick an era and a city. We surface the tracks that defined subcultures, perfectly sized for your screen—from compact lists to rich visual galleries.</p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Ready to start digging? Your crate is synced across every device.
            </p>
            <button className="px-5 py-2.5 bg-white text-black rounded-full font-black text-xs hover:scale-105 active:scale-95 transition-all">
              GO TO MAP MODE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrateGuide;
