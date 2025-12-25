
import React from 'react';
import { Radio, Sparkles, Heart, Zap, ArrowRight, Smartphone, Tablet, Laptop, History } from 'lucide-react';

const RadioGuide: React.FC = () => {
  return (
    <section className="mb-10 md:mb-12 animate-in fade-in slide-in-from-top-6 duration-1000">
      <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-6 md:p-10 lg:p-12 group shadow-[0_30px_60px_-15px_rgba(0,0,0,1)]">
        {/* Ambient Pulsing Glows */}
        <div className="absolute -top-28 -right-28 md:-top-32 md:-right-32 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-red-600/10 blur-[120px] md:blur-[150px] rounded-full pointer-events-none group-hover:bg-red-600/15 transition-all duration-[2000ms]" />
        <div className="absolute -bottom-28 -left-28 md:-bottom-32 md:-left-32 w-[320px] md:w-[400px] h-[320px] md:h-[400px] bg-indigo-500/5 blur-[110px] md:blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-8 md:space-y-10">
          {/* Enhanced Layout Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
            <div className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-[9px] md:text-[10px] font-black tracking-[0.25em] md:tracking-[0.3em] text-red-400 uppercase shadow-xl">
                <Sparkles size={12} className="animate-pulse" />
                Radio Masterclass
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white drop-shadow-xl leading-none brand-cursive">YE FREQUENCY</h2>
            </div>
            
            <div className="flex items-center gap-5 md:gap-6 p-3 md:p-4 rounded-[20px] md:rounded-[24px] bg-white/5 border border-white/5 text-zinc-600 shadow-inner">
              <div className="flex flex-col items-center gap-1 md:gap-1.5 group/icon cursor-default">
                <Smartphone size={20} className="md:w-5 md:h-5 group-hover/icon:text-white transition-colors duration-500" />
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-700 group-hover/icon:text-zinc-500 transition-colors">Mobile</span>
              </div>
              <div className="w-px h-8 md:h-10 bg-white/10" />
              <div className="flex flex-col items-center gap-1 md:gap-1.5 group/icon cursor-default">
                <Laptop size={20} className="md:w-5 md:h-5 group-hover/icon:text-white transition-colors duration-500" />
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-700 group-hover/icon:text-zinc-500 transition-colors">Desktop</span>
              </div>
            </div>
          </div>

          <p className="text-zinc-300 text-base sm:text-lg md:text-xl font-medium leading-tight max-w-5xl tracking-tight">
            Start a station from your favorite <span className="text-white font-black underline decoration-red-600 decoration-2 md:decoration-3 underline-offset-[6px] md:underline-offset-[8px]">jazz</span>, or discover unreleased <span className="text-white font-black brand-cursive">beats</span> while you focus. Ye Beats adapts instantly.
          </p>

          {/* Feature Grid with Enhanced Depth */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <div className="p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all group/card shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] md:rounded-[16px] bg-red-600/20 flex items-center justify-center text-red-500 mb-5 md:mb-6 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all shadow-xl">
                <Radio size={20} className="md:w-6 md:h-6" />
              </div>
              <h4 className="font-black text-xl md:text-xl lg:text-2xl text-white mb-2.5 md:mb-3 tracking-tighter">Ye Stations</h4>
              <p className="text-zinc-500 text-xs md:text-sm lg:text-base leading-relaxed font-medium">Generate endless, high-fidelity streams from any track, artist, or specific era in one tap.</p>
            </div>

            <div className="p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all group/card shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] md:rounded-[16px] bg-indigo-500/20 flex items-center justify-center text-indigo-500 mb-5 md:mb-6 group-hover/card:scale-110 group-hover/card:-rotate-12 transition-all shadow-xl">
                <Zap size={20} className="md:w-6 md:h-6" />
              </div>
              <h4 className="font-black text-xl md:text-xl lg:text-2xl text-white mb-2.5 md:mb-3 tracking-tighter">Adaptive Flow</h4>
              <p className="text-zinc-500 text-xs md:text-sm lg:text-base leading-relaxed font-medium">Continuous playback that learns your mood—perfect for commutes, deep focus, or workout intensity.</p>
            </div>

            <div className="p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all group/card shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] md:rounded-[16px] bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-5 md:mb-6 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all shadow-xl">
                <Heart size={20} className="md:w-6 md:h-6" />
              </div>
              <h4 className="font-black text-xl md:text-xl lg:text-2xl text-white mb-2.5 md:mb-3 tracking-tighter">Ye Learning</h4>
              <p className="text-zinc-500 text-xs md:text-sm lg:text-base leading-relaxed font-medium">Like or dislike tracks to instantly shape future suggestions. Synced across all your device libraries.</p>
            </div>
          </div>

          {/* Footer Call to Action with Animation */}
          <div className="pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="space-y-1.5 md:space-y-2 text-center sm:text-left">
              <p className="text-sm md:text-base font-black text-white uppercase tracking-[0.15em] md:tracking-[0.2em]">Ready to tune in?</p>
              <p className="text-[10px] md:text-xs font-bold text-zinc-600 max-w-sm">Evolving recommendations for endless music discovery on any device.</p>
            </div>
            <button className="w-full sm:w-auto px-10 md:px-12 lg:px-14 py-3 md:py-4 bg-white text-black rounded-full font-black text-sm md:text-base hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 md:gap-4 shadow-[0_15px_30px_rgba(255,255,255,0.2)] group">
              LAUNCH RADIO
              <ArrowRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1.5 md:group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RadioGuide;
