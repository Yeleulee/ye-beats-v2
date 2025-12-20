
import React, { useState } from 'react';
import { Loader2, Globe, History, Music } from 'lucide-react';
import CrateGuide from './CrateGuide';

const REGIONS = [
  { name: 'Tokyo', emoji: '🇯🇵' },
  { name: 'London', emoji: '🇬🇧' },
  { name: 'Detroit', emoji: '🇺🇸' },
  { name: 'Lagos', emoji: '🇳🇬' },
  { name: 'Berlin', emoji: '🇩🇪' },
  { name: 'Seoul', emoji: '🇰🇷' },
];

const DECADES = ['1970s', '1980s', '1990s', '2000s'];

const TheCrate: React.FC = () => {
  const [region, setRegion] = useState(REGIONS[0].name);
  const [decade, setDecade] = useState(DECADES[1]);
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState<any[]>([]);

  const handleDig = async () => {
    setLoading(true);
    try {
      // AI playlist generation has been disabled
      // This feature previously used Google AI to generate culturally significant track recommendations
      alert('AI-powered playlist generation feature has been removed. This feature previously used Google AI to suggest legendary tracks from different regions and eras.');
      setPlaylist([]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 pb-32 max-w-5xl mx-auto space-y-12">
      <header className="mb-8">
        <h1 className="text-4xl md:text-8xl font-black mb-4 tracking-tighter flex items-center gap-6 text-white font-['Inter'] uppercase leading-none">
          <Globe className="text-red-600" size={64} />
          The Crate
        </h1>
        <p className="text-zinc-500 text-xl font-medium font-['Roboto_Flex'] tracking-tight brand-cursive">Uncover the cultural gems of music history.</p>
      </header>

      <CrateGuide />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-3xl border border-white/5">
          <label className="block text-[11px] font-black text-zinc-600 uppercase tracking-[0.5em] mb-4 font-['Roboto_Flex']">Select Origin</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {REGIONS.map(r => (
              <button
                key={r.name}
                onClick={() => setRegion(r.name)}
                className={`p-3 rounded-2xl border text-[11px] font-black uppercase tracking-[0.2em] transition-all font-['Roboto_Flex'] ${
                  region === r.name 
                    ? 'bg-white text-black border-white shadow-lg' 
                    : 'bg-black/40 text-white border-white/5'
                }`}
              >
                {r.emoji} {r.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-3xl border border-white/5">
          <label className="block text-[11px] font-black text-zinc-600 uppercase tracking-[0.5em] mb-4 font-['Roboto_Flex']">Select Era</label>
          <div className="grid grid-cols-2 gap-3">
            {DECADES.map(d => (
              <button
                key={d}
                onClick={() => setDecade(d)}
                className={`p-3 rounded-2xl border text-[11px] font-black uppercase tracking-[0.2em] transition-all font-['Roboto_Flex'] ${
                  decade === d 
                    ? 'bg-white text-black border-white shadow-lg' 
                    : 'bg-black/40 text-white border-white/5'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleDig}
        disabled={loading}
        className="w-full bg-white text-black py-8 rounded-3xl font-black text-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl font-['Roboto_Flex'] uppercase tracking-widest"
      >
        {loading ? 'Digging...' : 'Start Digging'}
      </button>

      {playlist.length > 0 && (
        <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-black tracking-tight text-white font-['Inter'] uppercase">Results: {region}</h3>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid gap-4">
            {playlist.map((item, i) => (
              <div key={i} className="group bg-zinc-900/40 hover:bg-zinc-800/60 p-5 rounded-[24px] flex items-center gap-5 border border-white/5 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 shadow-lg overflow-hidden relative">
                   <Music size={28} className="relative z-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-xl truncate text-white mb-1 font-['Inter'] uppercase leading-none">{item.title}</h4>
                  <p className="text-zinc-600 font-black text-[11px] uppercase tracking-[0.3em] font-['Roboto_Flex']">{item.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TheCrate;
