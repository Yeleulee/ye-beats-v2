
import React from 'react';
import { Sparkles, Clock, Music2, Zap, ArrowRight, Layout, Heart } from 'lucide-react';

const HomeGuide: React.FC = () => {
  return (
    <section className="mb-8 md:mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="relative overflow-hidden rounded-[24px] md:rounded-[28px] bg-zinc-950 border border-white/5 p-6 md:p-8 group">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-red-600/10 blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/15 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-56 md:h-56 bg-emerald-500/5 blur-[60px] md:blur-[80px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          <div className="flex-1 space-y-4 md:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-black tracking-wider text-zinc-400 uppercase">
              <Sparkles size={12} className="text-red-500" />
              Inside Your Home Feed
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter leading-none text-white">
              Your music universe, <span className="text-zinc-500 brand-cursive">aligned by Ye.</span>
            </h2>
            
            <p className="text-zinc-400 text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-2xl">
              Ye Beats is the living heart of your audio journey. It doesn't just show music; it learns your rhythm, adapting every second to your history, likes, and deep-archive explorations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <Clock className="text-red-500 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-white text-sm">Quick Access</h4>
                  <p className="text-zinc-500 text-xs mt-1">Your morning playlist is ready at the top, exactly when you need it.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <Layout className="text-emerald-500 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-white text-sm">Curated Worlds</h4>
                  <p className="text-zinc-500 text-xs mt-1">From trending Ethiopian hits to global 100s, find it all in one scroll.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 space-y-4">
            <div className="p-6 rounded-3xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Evolutionary Learning</h5>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center text-red-500">
                    <Heart size={14} />
                  </div>
                  <span className="text-xs font-bold text-zinc-300">Likes & Subs Integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Zap size={14} />
                  </div>
                  <span className="text-xs font-bold text-zinc-300">Mood-Based Filtering</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <Music2 size={14} />
                  </div>
                  <span className="text-xs font-bold text-zinc-300">Deep-Archive Digging</span>
                </div>
              </div>
              <button className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all mt-4">
                Explore My Mix
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeGuide;
