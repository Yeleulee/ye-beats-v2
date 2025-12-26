
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, Music, Video, ArrowRight, User, Globe, Zap, Headphones } from 'lucide-react';
import { AnimatedArtists } from './ui/animated-artists';
import { signInWithGoogle } from '../services/firebase';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleJoinClick = () => {
    signInWithGoogle().then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = result.user;
      console.log({ credential });
      onLogin();
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error({ errorCode, errorMessage });
    });
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
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.reload()}>
          <div className="relative w-12 h-12 flex-shrink-0">
            {/* Spinning Record on Hover */}
            <div className="w-full h-full rounded-full bg-zinc-900 border border-white/10 shadow-[0_0_30px_rgba(220,38,38,0.3)] flex items-center justify-center relative z-10 transition-transform duration-700 ease-out group-hover:rotate-[360deg]">
               {/* Vinyl Grooves Gradient */}
               <div className="absolute inset-0 rounded-full bg-[conic-gradient(transparent_0deg,rgba(255,255,255,0.1)_90deg,transparent_180deg,rgba(255,255,255,0.1)_270deg,transparent_360deg)] opacity-50" />
               <div className="absolute inset-1 rounded-full border border-white/5" />
               <div className="absolute inset-2 rounded-full border border-white/5" />
               <div className="absolute inset-3 rounded-full border border-white/5" />
               
               {/* Center Label */}
               <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center relative overflow-hidden shadow-inner group-hover:scale-110 transition-transform">
                 <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30" />
                 <div className="w-1.5 h-1.5 bg-black rounded-full border border-white/20" />
               </div>
            </div>

            {/* Tone Arm (Decorative) */}
            <div className="absolute -top-1 -right-1 w-6 h-10 pointer-events-none z-20 origin-top-right transition-transform duration-500 ease-in-out group-hover:rotate-[20deg]">
              <svg viewBox="0 0 24 40" className="w-full h-full drop-shadow-md">
                 <path d="M20,2 C20,1 21,0 22,0 C23,0 24,1 24,2 L24,6 C24,7 23,8 22,8 C21,8 20,7 20,6 L20,2 Z" fill="#52525b" />
                 <path d="M22,4 L12,25 C11,27 8,28 6,28 L2,30" stroke="#71717a" strokeWidth="2" fill="none" strokeLinecap="round" />
                 <rect x="0" y="28" width="6" height="8" rx="1" transform="rotate(-15 3 32)" fill="#3f3f46" />
              </svg>
            </div>
          </div>
          <span className="text-2xl font-black tracking-tighter brand-cursive text-white">Ye Beats</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors font-['Roboto_Flex']">Experience</a>
          <a href="#about" className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors font-['Roboto_Flex']">The Crate</a>
          <div className="h-6 w-px bg-white/10 mx-2" />
          <div className="flex items-center gap-4">
            <button 
              onClick={handleJoinClick}
              className="px-8 py-3 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-xl font-['Roboto_Flex']"
            >
              Join
            </button>
          </div>
        </div>
        <button 
          onClick={handleJoinClick}
          className="md:hidden p-3 bg-white/10 rounded-full text-white"
        >
          <User size={20} />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-40 pb-20 md:pb-32 px-6 lg:px-12 flex flex-col items-center text-center z-10 overflow-hidden">
        <div className="relative z-20 flex flex-col items-center max-w-7xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/20 mb-6 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 shadow-lg">
            <Sparkles className="text-red-500 animate-pulse" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-red-400 font-['Roboto_Flex']">Ye Beats V2 Synthesis</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85] mb-6 md:mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 text-white drop-shadow-2xl font-['Inter'] uppercase">
            Ye Beats <br /> <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-white to-red-900 brand-cursive">Redefined.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-3xl font-medium leading-tight mb-10 md:mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 font-['Roboto_Flex'] tracking-tight">
            Unifying studio perfection with the world's deepest archive of unreleased gems. High-fidelity audio, social flux, and AI digging.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
            <button 
              onClick={handleJoinClick}
              className="px-8 md:px-12 lg:px-14 py-4 md:py-5 lg:py-6 bg-white text-black rounded-full font-black text-sm md:text-base lg:text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 md:gap-4 group relative overflow-hidden font-['Roboto_Flex'] uppercase tracking-wider"
            >
              Get Started Free
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-8 md:px-12 lg:px-14 py-4 md:py-5 lg:py-6 bg-white/5 border border-white/10 text-white rounded-full font-black text-sm md:text-base lg:text-lg hover:bg-white/10 transition-all backdrop-blur-3xl border-dashed font-['Roboto_Flex'] uppercase tracking-wider">
              Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 md:py-32 lg:py-40 px-6 lg:px-12 z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
            <div key={i} className="p-8 md:p-10 lg:p-12 rounded-3xl md:rounded-[40px] lg:rounded-[56px] bg-zinc-950/50 backdrop-blur-2xl border border-white/5 hover:border-white/20 transition-all group cursor-default shadow-2xl">
              <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl ${f.bg} flex items-center justify-center mb-6 md:mb-8 lg:mb-10 ${f.color} group-hover:scale-110 transition-all`}>
                <f.icon size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
              </div>
              <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-3 md:mb-4 ${f.color} font-['Roboto_Flex']`}>{f.label}</p>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-5 lg:mb-6 tracking-tight text-white font-['Inter']">{f.title}</h3>
              <p className="text-zinc-500 text-sm md:text-base lg:text-lg leading-relaxed font-medium font-['Roboto_Flex'] tracking-tight">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Artists Section */}
      <section id="artists" className="py-16 md:py-20 z-10 relative">
        <div className="text-center mb-10 md:mb-12 px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/20 mb-4 md:mb-6 shadow-lg">
            <Music className="text-red-500" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-red-400 font-['Roboto_Flex']">Featured Artists</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-white font-['Inter'] uppercase mb-3 md:mb-4">
            Legendary Voices
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-zinc-400 max-w-3xl mx-auto font-medium font-['Roboto_Flex'] tracking-tight">
            Experience music from the world's most iconic artists, from global superstars to Ethiopian legends
          </p>
        </div>
        <AnimatedArtists artists={artists} autoplay={true} />
      </section>

      {/* Footer */}
      <footer className="py-16 md:py-24 lg:py-32 px-6 lg:px-12 z-10 relative border-t border-white/5 bg-zinc-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 lg:gap-20 mb-16 md:mb-24 lg:mb-32">
          <div className="col-span-2 space-y-6 md:space-y-8">
             <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
              <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                {/* Spinning Record on Hover */}
                <div className="w-full h-full rounded-full bg-zinc-900 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.8)] flex items-center justify-center relative z-10 transition-transform duration-700 ease-out group-hover:rotate-[360deg]">
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(transparent_0deg,rgba(255,255,255,0.1)_90deg,transparent_180deg,rgba(255,255,255,0.1)_270deg,transparent_360deg)] opacity-50" />
                  <div className="absolute inset-1 rounded-full border border-white/5" />
                  
                  {/* Center Label */}
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-red-600 rounded-full flex items-center justify-center relative overflow-hidden shadow-inner group-hover:scale-110 transition-transform">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30" />
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-black rounded-full border border-white/20" />
                  </div>
                </div>

                {/* Tone Arm */}
                <div className="absolute -top-1 -right-1 w-5 h-8 md:w-6 md:h-10 pointer-events-none z-20 origin-top-right transition-transform duration-500 ease-in-out group-hover:rotate-[20deg]">
                  <svg viewBox="0 0 24 40" className="w-full h-full drop-shadow-md">
                    <path d="M20,2 C20,1 21,0 22,0 C23,0 24,1 24,2 L24,6 C24,7 23,8 22,8 C21,8 20,7 20,6 L20,2 Z" fill="#52525b" />
                    <path d="M22,4 L12,25 C11,27 8,28 6,28 L2,30" stroke="#71717a" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <rect x="0" y="28" width="6" height="8" rx="1" transform="rotate(-15 3 32)" fill="#3f3f46" />
                  </svg>
                </div>
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-white brand-cursive">Ye Beats</span>
            </div>
            <p className="text-zinc-500 max-w-md text-sm md:text-base lg:text-lg leading-relaxed font-medium font-['Roboto_Flex'] tracking-tight">The cultural hub of music. Unifying high-fidelity audio with the world's deepest archive of creativity.</p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h5 className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white font-['Roboto_Flex']">Product</h5>
            <div className="flex flex-col gap-3 md:gap-4">
              <a href="#" className="text-sm md:text-base lg:text-lg text-zinc-600 hover:text-white transition-colors font-medium font-['Roboto_Flex'] tracking-tight">The Archive</a>
              <a href="#" className="text-sm md:text-base lg:text-lg text-zinc-600 hover:text-white transition-colors font-medium font-['Roboto_Flex'] tracking-tight">Pricing</a>
              <a href="#" className="text-sm md:text-base lg:text-lg text-zinc-600 hover:text-white transition-colors font-medium font-['Roboto_Flex'] tracking-tight">Ye Pro</a>
            </div>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h5 className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white font-['Roboto_Flex']">Legal</h5>
            <div className="flex flex-col gap-3 md:gap-4">
              <a href="#" className="text-sm md:text-base lg:text-lg text-zinc-600 hover:text-white transition-colors font-medium font-['Roboto_Flex'] tracking-tight">Privacy</a>
              <a href="#" className="text-sm md:text-base lg:text-lg text-zinc-600 hover:text-white transition-colors font-medium font-['Roboto_Flex'] tracking-tight">Terms</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
          <p className="text-[10px] md:text-xs font-bold text-zinc-800 uppercase tracking-[0.3em] md:tracking-[0.5em] font-['Roboto_Flex']">© 2025 YE BEATS V2 TECHNOLOGIES INC.</p>
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
             <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all cursor-pointer"><Globe size={20} className="md:w-6 md:h-6" /></div>
             <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all cursor-pointer"><Video size={20} className="md:w-6 md:h-6" /></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
