
import React, { useState } from 'react';
import { Loader2, Globe, History, Music } from 'lucide-react';
import CrateGuide from './CrateGuide';
import { searchMusic } from '../services/youtubeService';

const REGIONS = [
  { name: 'Tokyo', emoji: '🇯🇵', searchTerm: 'Japanese' },
  { name: 'London', emoji: '🇬🇧', searchTerm: 'British UK' },
  { name: 'Detroit', emoji: '🇺🇸', searchTerm: 'Detroit Motown' },
  { name: 'Lagos', emoji: '🇳🇬', searchTerm: 'Nigerian Afrobeat' },
  { name: 'Berlin', emoji: '🇩🇪', searchTerm: 'German Techno' },
  { name: 'Seoul', emoji: '🇰🇷', searchTerm: 'Korean K-pop' },
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
      // Find the selected region object
      const selectedRegion = REGIONS.find(r => r.name === region);
      const searchQuery = `${selectedRegion?.searchTerm} music ${decade}`;
      
      console.log(`🎵 Searching for: ${searchQuery}`);
      
      // Use YouTube API to search for tracks
      const results = await searchMusic(searchQuery, 10);
      
      // Convert YouTube tracks to playlist format
      const playlistTracks = results.map(track => ({
        title: track.title,
        artist: track.artist,
        coverArt: track.coverArt,
        videoId: track.videoId
      }));
      
      setPlaylist(playlistTracks);
      console.log(`✅ Found ${playlistTracks.length} tracks for ${region} - ${decade}`);
    } catch (error) {
      console.error('❌ Error fetching tracks:', error);
      alert('Failed to fetch tracks. Please try again.');
      setPlaylist([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 md:p-5 lg:p-6 pb-24 md:pb-28 max-w-5xl mx-auto space-y-8 md:space-y-10">
      <header className="mb-5 md:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black mb-2.5 md:mb-3 tracking-tighter flex items-center gap-3 md:gap-4 lg:gap-5 text-white font-['Inter'] uppercase leading-none">
          <Globe className="text-red-600" size={40} />
          The Crate
        </h1>
        <p className="text-zinc-500 text-sm md:text-base lg:text-lg font-medium font-['Roboto_Flex'] tracking-tight brand-cursive">Uncover the cultural gems of music history.</p>
      </header>

      <CrateGuide />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <div className="bg-zinc-900/50 backdrop-blur-sm p-5 rounded-2xl border border-white/5">
          <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-3 font-['Roboto_Flex']">Select Origin</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {REGIONS.map(r => (
              <button
                key={r.name}
                onClick={() => setRegion(r.name)}
                className={`p-2.5 rounded-xl border text-[10px] font-black uppercase tracking-[0.15em] transition-all font-['Roboto_Flex'] ${
                  region === r.name 
                    ? 'bg-white text-black border-white shadow-md' 
                    : 'bg-black/40 text-white border-white/5'
                }`}
              >
                {r.emoji} {r.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm p-5 rounded-2xl border border-white/5">
          <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-3 font-['Roboto_Flex']">Select Era</label>
          <div className="grid grid-cols-2 gap-2.5">
            {DECADES.map(d => (
              <button
                key={d}
                onClick={() => setDecade(d)}
                className={`p-2.5 rounded-xl border text-[10px] font-black uppercase tracking-[0.15em] transition-all font-['Roboto_Flex'] ${
                  decade === d 
                    ? 'bg-white text-black border-white shadow-md' 
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
        className="w-full bg-white text-black py-4 md:py-5 lg:py-6 rounded-xl md:rounded-2xl font-black text-base md:text-lg lg:text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-lg font-['Roboto_Flex'] uppercase tracking-wider"
      >
        {loading ? 'Digging...' : 'Start Digging'}
      </button>

      {playlist.length > 0 && (
        <div className="mt-10 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-black tracking-tight text-white font-['Inter'] uppercase">Results: {region}</h3>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid gap-3">
            {playlist.map((item, i) => (
              <div key={i} className="group bg-zinc-900/40 hover:bg-zinc-800/60 p-4 rounded-[20px] flex items-center gap-4 border border-white/5 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 shadow-md overflow-hidden relative">
                   {item.coverArt ? (
                     <img src={item.coverArt} alt={item.title} className="w-full h-full object-cover" />
                   ) : (
                     <Music size={24} className="relative z-10" />
                   )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-lg truncate text-white mb-1 font-['Inter'] uppercase leading-none">{item.title}</h4>
                  <p className="text-zinc-600 font-black text-[10px] uppercase tracking-[0.25em] font-['Roboto_Flex']">{item.artist}</p>
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
