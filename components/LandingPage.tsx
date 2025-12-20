
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, Music, Video, ArrowRight, User, Lock, Mail, Globe, Zap, Headphones, Activity } from 'lucide-react';
import { AnimatedArtists } from './ui/animated-artists';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAuth = () => {
    const el = document.getElementById('auth-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Artist data
  const artists = [
    {
      quote: "The evolution of sound. Where music meets innovation and creates something extraordinary.",
      name: "The Weeknd",
      designation: "Grammy Award Winner",
      src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop"
    },
    {
      quote: "Setting the standard for excellence in music. Pushing boundaries and redefining what's possible.",
      name: "Drake",
      designation: "Chart-Topping Artist",
      src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop"
    },
    {
      quote: "Bringing Ethiopian music to the world stage. Celebrating culture through powerful storytelling.",
      name: "Teddy Afro",
      designation: "Ethiopian Music Icon",
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
    },
    {
      quote: "Crafting timeless melodies that resonate across generations. Music is poetry in motion.",
      name: "Lana Del Rey",
      designation: "Acclaimed Singer-Songwriter",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#000000] text-white font-sans overflow-x-hidden relative selection:bg-red-600/30">
      {/* Reactive Mouse Glow */}
      <div 
        className="fixed pointer-events-none z-0 w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full transition-transform duration-700 ease-out opacity-40"
        style={{ 
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)` 
        }}
      />

      {/* Static Immersive Background Aurora */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-red-950/20 blur-[180px] rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-indigo-950/15 blur-[160px] rounded-full opacity-30" />
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 lg:px-12 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[4px]">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.4)] transition-transform group-hover:rotate-12">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
          </div>
          <span className="text-2xl font-black tracking-tighter brand-cursive">Ye Beats</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors font-['Roboto_Flex']">Experience</a>
          <a href="#about" className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors font-['Roboto_Flex']">The Crate</a>
          <div className="h-6 w-px bg-white/10 mx-2" />
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setIsLoginView(true); scrollToAuth(); }}
              className="px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-white transition-all font-['Roboto_Flex']"
            >
              Sign In
            </button>
            <button 
              onClick={() => { setIsLoginView(false); scrollToAuth(); }}
              className="px-8 py-3 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-xl font-['Roboto_Flex']"
            >
              Join
            </button>
          </div>
        </div>
        <button 
          onClick={scrollToAuth}
          className="md:hidden p-3 bg-white/10 rounded-full text-white"
        >
          <User size={20} />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 lg:px-12 flex flex-col items-center text-center z-10 overflow-hidden">
        <div className="relative z-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-600/10 border border-red-500/20 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 shadow-lg">
            <Sparkles className="text-red-500 animate-pulse" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-400 font-['Roboto_Flex']">Ye Beats V2 Synthesis</span>
          </div>
          <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.85] mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 text-white drop-shadow-2xl font-['Inter'] uppercase">
            Ye Beats <br /> <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-white to-red-900 brand-cursive">Redefined.</span>
          </h1>
          <p className="text-xl md:text-3xl text-zinc-400 max-w-4xl font-medium leading-tight mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 font-['Roboto_Flex'] tracking-tight">
            Unifying studio perfection with the world's deepest archive of unreleased gems. High-fidelity audio, social flux, and AI digging.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
            <button 
              onClick={scrollToAuth}
              className="px-16 py-7 bg-white text-black rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_40px_80px_rgba(255,255,255,0.2)] flex items-center gap-6 group relative overflow-hidden font-['Roboto_Flex'] uppercase tracking-widest"
            >
              Get Started Free
              <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-16 py-7 bg-white/5 border border-white/10 text-white rounded-full font-black text-xl hover:bg-white/10 transition-all backdrop-blur-3xl border-dashed font-['Roboto_Flex'] uppercase tracking-widest">
              Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-40 px-6 lg:px-12 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: Zap,
              title: "Ye V2 Engine",
              desc: "Instantly crossfade between Opus video streams and 24-bit/96kHz FLAC masters.",
              color: "text-red-500",
              bg: "bg-red-500/10",
              label: "Architectural Speed"
            },
            {
              icon: Globe,
              title: "The Archive",
              desc: "90% of music is unreleased. We bring bedroom covers and DJ sets into your library.",
              color: "text-indigo-500",
              bg: "bg-indigo-500/10",
              label: "Infinite Depth"
            },
            {
              icon: Headphones,
              title: "Social Flux",
              desc: "The 'Green Room' lets you host high-fidelity listening parties with zero lag.",
              color: "text-emerald-500",
              bg: "bg-emerald-500/10",
              label: "Connected souls"
            }
          ].map((f, i) => (
            <div key={i} className="p-12 rounded-[56px] bg-zinc-950/50 backdrop-blur-2xl border border-white/5 hover:border-white/20 transition-all group cursor-default shadow-2xl">
              <div className={`w-16 h-16 rounded-2xl ${f.bg} flex items-center justify-center mb-10 ${f.color} group-hover:scale-110 transition-all`}>
                <f.icon size={32} />
              </div>
              <p className={`text-[10px] font-black uppercase tracking-[0.5em] mb-4 ${f.color} font-['Roboto_Flex']`}>{f.label}</p>
              <h3 className="text-4xl font-black mb-6 tracking-tight text-white font-['Inter']">{f.title}</h3>
              <p className="text-zinc-500 text-xl leading-relaxed font-medium font-['Roboto_Flex'] tracking-tight">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Artists Section */}
      <section id="artists" className="py-20 z-10 relative">
        <div className="text-center mb-12 px-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-600/10 border border-red-500/20 mb-6 shadow-lg">
            <Music className="text-red-500" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-400 font-['Roboto_Flex']">Featured Artists</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-['Inter'] uppercase mb-4">
            Legendary Voices
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-medium font-['Roboto_Flex'] tracking-tight">
            Experience music from the world's most iconic artists, from global superstars to Ethiopian legends
          </p>
        </div>
        <AnimatedArtists artists={artists} autoplay={true} />
      </section>

      {/* Auth Section */}
      <section id="auth-section" className="py-48 px-6 lg:px-12 z-10 relative flex flex-col items-center">
        <div className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[64px] p-12 md:p-20 shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-center text-white font-['Inter'] uppercase leading-none">
              {isLoginView ? 'Welcome.' : 'The Era.'}
            </h2>
            <p className="text-zinc-500 text-center mb-16 font-medium text-xl font-['Roboto_Flex'] tracking-tight">
              {isLoginView ? 'Your library is waiting.' : 'Step into the evolution of audio.'}
            </p>

            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              {!isLoginView && (
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-600 ml-6 font-['Roboto_Flex']">Full Name</label>
                  <div className="relative group/input">
                    <User className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-red-500 transition-colors" size={24} />
                    <input 
                      type="text" 
                      placeholder="Liam Beats"
                      className="w-full bg-black border border-white/5 px-20 py-7 rounded-[32px] focus:outline-none focus:ring-4 focus:ring-red-600/10 transition-all text-xl text-white placeholder:text-zinc-800 font-['Roboto_Flex']"
                      required
                    />
                  </div>
                </div>
              )}
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-600 ml-6 font-['Roboto_Flex']">Email</label>
                <div className="relative group/input">
                  <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-red-500 transition-colors" size={24} />
                  <input 
                    type="email" 
                    placeholder="liam@yebeats.io"
                    className="w-full bg-black border border-white/5 px-20 py-7 rounded-[32px] focus:outline-none focus:ring-4 focus:ring-red-600/10 transition-all text-xl text-white placeholder:text-zinc-800 font-['Roboto_Flex']"
                    required
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-600 ml-6 font-['Roboto_Flex']">Password</label>
                <div className="relative group/input">
                  <Lock className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-red-500 transition-colors" size={24} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-black border border-white/5 px-20 py-7 rounded-[32px] focus:outline-none focus:ring-4 focus:ring-red-600/10 transition-all text-xl text-white placeholder:text-zinc-800 font-['Roboto_Flex']"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-8 bg-white text-black rounded-[32px] font-black text-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_30px_60px_rgba(255,255,255,0.15)] mt-12 font-['Roboto_Flex'] uppercase tracking-widest"
              >
                {isLoginView ? 'LOG IN' : 'CREATE ACCOUNT'}
              </button>
            </form>

            <div className="mt-16 pt-10 border-t border-white/5 text-center">
              <button 
                onClick={() => setIsLoginView(!isLoginView)}
                className="text-lg font-bold text-zinc-500 hover:text-white transition-colors flex items-center justify-center gap-3 mx-auto font-['Roboto_Flex'] tracking-tight"
              >
                {isLoginView ? "New here? Build your library" : "Already a super-fan? Log In"}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 lg:px-12 z-10 relative border-t border-white/5 bg-zinc-950/50 backdrop-blur-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-20 mb-32">
          <div className="col-span-2 space-y-8">
             <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white brand-cursive">Ye Beats</span>
            </div>
            <p className="text-zinc-500 max-w-md text-xl leading-relaxed font-medium font-['Roboto_Flex'] tracking-tight">The cultural hub of music. Unifying high-fidelity audio with the world's deepest archive of creativity.</p>
          </div>
          <div className="space-y-6">
            <h5 className="text-[12px] font-black uppercase tracking-[0.5em] text-white font-['Roboto_Flex']">Product</h5>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-lg text-zinc-600 hover:text-white transition-colors font-medium font-['Roboto_Flex'] tracking-tight">The Archive</a>
              <a href="#" className="text-lg text-zinc-600 hover:text-white transition-colors font-medium font-['Roboto_Flex'] tracking-tight">Pricing</a>
              <a href="#" className="text-lg text-zinc-600 hover:text-white transition-colors font-medium font-['Roboto_Flex'] tracking-tight">Ye Pro</a>
            </div>
          </div>
          <div className="space-y-6">
            <h5 className="text-[12px] font-black uppercase tracking-[0.5em] text-white font-['Roboto_Flex']">Legal</h5>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-lg text-zinc-600 hover:text-white transition-colors font-medium font-['Roboto_Flex'] tracking-tight">Privacy</a>
              <a href="#" className="text-lg text-zinc-600 hover:text-white transition-colors font-medium font-['Roboto_Flex'] tracking-tight">Terms</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-xs font-bold text-zinc-800 uppercase tracking-[0.5em] font-['Roboto_Flex']">© 2025 YE BEATS V2 TECHNOLOGIES INC.</p>
          <div className="flex items-center gap-8">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all cursor-pointer"><Globe size={24} /></div>
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all cursor-pointer"><Video size={24} /></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
