
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Track } from '../types';
import { searchMusic } from '../services/youtubeService';

interface SearchPageProps {
  onTrackSelect: (track: Track) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onTrackSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await searchMusic(query);
      const convertedResults: Track[] = results.map(ytTrack => ({
        id: ytTrack.id,
        title: ytTrack.title,
        artist: ytTrack.artist,
        album: ytTrack.album,
        coverArt: ytTrack.coverArt,
        duration: ytTrack.duration || 180,
        videoId: ytTrack.videoId,
        isLossless: false
      }));
      setSearchResults(convertedResults);
    } catch (error) {
      console.error("Search failed:", error);
      // Ideally show toast here, but we'll stick to console for now or need a callback
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="p-5 md:p-10 animate-in fade-in duration-700 min-h-screen bg-black">
      <div className="max-w-4xl mx-auto space-y-10 pb-28">
        <header className="space-y-5">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white font-['Inter'] uppercase leading-none">
            Search
          </h1>
          <p className="text-zinc-500 text-lg font-medium font-['Roboto_Flex'] tracking-tight">
            Find your next favorite track
          </p>
        </header>

        <div className="relative group">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchQuery);
              }
            }}
            placeholder="Search for artists, songs, albums..."
            className="w-full bg-zinc-900/50 border border-white/10 px-14 py-5 rounded-[28px] text-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600/40 focus:border-red-600/40 transition-all placeholder:text-zinc-700 font-['Roboto_Flex'] font-medium backdrop-blur-xl"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors" size={24} />
          {isSearching && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {searchResults.length > 0 ? (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black tracking-tight text-white font-['Inter'] uppercase">Results</h2>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {searchResults.map((track) => (
                <div 
                  key={track.id}
                  onClick={() => onTrackSelect(track)}
                  className="bg-zinc-900/40 hover:bg-zinc-800/60 p-4 rounded-[28px] cursor-pointer transition-all border border-white/5 group"
                >
                  <img 
                    src={track.coverArt} 
                    alt={`${track.title} by ${track.artist}`}
                    className="w-full aspect-square rounded-[20px] mb-3 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <h3 className="font-black text-base text-white truncate mb-1 font-['Inter'] uppercase leading-none">{track.title}</h3>
                  <p className="text-zinc-600 font-black text-[10px] uppercase tracking-[0.25em] truncate font-['Roboto_Flex']">{track.artist}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black tracking-tight text-white font-['Inter'] uppercase">Recent Searches</h2>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {['The Weeknd', 'Blinding Lights', 'Kiss Land', 'After Hours'].map((term) => (
                <button 
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    handleSearch(term);
                  }}
                  className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-[18px] text-xs font-black text-zinc-400 hover:text-white hover:bg-white/10 transition-all font-['Roboto_Flex'] uppercase tracking-[0.15em]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
