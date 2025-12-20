
import React from 'react';
import { Radio, Sparkles, Heart, Zap, ArrowRight, Smartphone, Tablet, Laptop, History } from 'lucide-react';

const RadioGuide: React.FC = () => {
  return (
    <section className="mb-16 animate-in fade-in slide-in-from-top-6 duration-1000">
      <div className="relative overflow-hidden rounded-[64px] bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-12 md:p-20 group shadow-[0_60px_120px_-30px_rgba(0,0,0,1)]">
        {/* Ambient Pulsing Glows */}
        <div className="absolute -top-48 -right-48 w-[700px] h-[700px] bg-red-600/10 blur-[200px] rounded-full pointer-events-none group-hover:bg-red-600/15 transition-all duration-[2000ms]" />
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-indigo-500/5 blur-[180px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-16">
          {/* Enhanced Layout Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-red-600/10 border border-red-500/20 text-[12px] font-black tracking-[0.4em] text-red-400 uppercase shadow-2xl">
                <Sparkles size={16} className="animate-pulse" />
                Radio Masterclass
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl leading-none brand-cursive">YE FREQUENCY</h2>
            </div>
            
            <div className="flex items-center gap-8 p-6 rounded-[32px] bg-white/5 border border-white/5 text-zinc-600 shadow-inner">
              <div className="flex flex-col items-center gap-2 group/icon cursor-default">
                <Smartphone size={28} className="group-hover/icon:text-white transition-colors duration-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-700 group-hover/icon:text-zinc-500 transition-colors">Mobile</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col items-center gap-2 group/icon cursor-default">
                <Laptop size={28} className="group-hover/icon:text-white transition-colors duration-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-700 group-hover/icon:text-zinc-500 transition-colors">Desktop</span>
              </div>
            </div>
          </div>

          <p className="text-zinc-300 text-2xl md:text-3xl font-medium leading-tight max-w-5xl tracking-tight">
            Start a station from your favorite <span className="text-white font-black underline decoration-red-600 decoration-4 underline-offset-[12px]">jazz</span>, or discover unreleased <span className="text-white font-black brand-cursive">beats</span> while you focus. Ye Beats adapts instantly.
          </p>

          {/* Feature Grid with Enhanced Depth */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-12 rounded-[56px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all group/card shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <div className="w-16 h-16 rounded-[24px] bg-red-600/20 flex items-center justify-center text-red-500 mb-8 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all shadow-2xl">
                <Radio size={32} />
              </div>
              <h4 className="font-black text-3xl text-white mb-4 tracking-tighter">Ye Stations</h4>
              <p className="text-zinc-500 text-lg leading-relaxed font-medium">Generate endless, high-fidelity streams from any track, artist, or specific era in one tap.</p>
            </div>

            <div className="p-12 rounded-[56px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all group/card shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <div className="w-16 h-16 rounded-[24px] bg-indigo-500/20 flex items-center justify-center text-indigo-500 mb-8 group-hover/card:scale-110 group-hover/card:-rotate-12 transition-all shadow-2xl">
                <Zap size={32} />
              </div>
              <h4 className="font-black text-3xl text-white mb-4 tracking-tighter">Adaptive Flow</h4>
              <p className="text-zinc-500 text-lg leading-relaxed font-medium">Continuous playback that learns your mood—perfect for commutes, deep focus, or workout intensity.</p>
            </div>

            <div className="p-12 rounded-[56px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all group/card shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <div className="w-16 h-16 rounded-[24px] bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-8 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all shadow-2xl">
                <Heart size={32} />
              </div>
              <h4 className="font-black text-3xl text-white mb-4 tracking-tighter">Ye Learning</h4>
              <p className="text-zinc-500 text-lg leading-relaxed font-medium">Like or dislike tracks to instantly shape future suggestions. Synced across all your device libraries.</p>
            </div>
          </div>

          {/* Footer Call to Action with Animation */}
          <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-12">
            <div className="space-y-3 text-center sm:text-left">
              <p className="text-lg font-black text-white uppercase tracking-[0.25em]">Ready to tune in?</p>
              <p className="text-sm font-bold text-zinc-600 max-w-sm">Evolving recommendations for endless music discovery on any device.</p>
            </div>
            <button className="w-full sm:w-auto px-16 py-6 bg-white text-black rounded-full font-black text-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-6 shadow-[0_30px_60px_rgba(255,255,255,0.2)] group">
              LAUNCH RADIO
              <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RadioGuide;
