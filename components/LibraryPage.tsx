
import React from 'react';
import { Plus, Music2, Play } from 'lucide-react';
import { Track } from '../types';
import { MOCK_TRACKS } from '../constants';

interface LibraryPageProps {
  onTrackSelect: (track: Track) => void;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ onTrackSelect }) => {
  return (
    <div className="p-6 md:p-12 animate-in fade-in duration-700 min-h-screen bg-black pb-32">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-['Inter'] uppercase leading-none">
            Your Library
          </h1>
          <p className="text-zinc-500 text-xl font-medium font-['Roboto_Flex'] tracking-tight">
            All your music in one place
          </p>
        </header>

        {/* Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4">
          {['All', 'Playlists', 'Albums', 'Artists', 'Liked Songs'].map((tab) => (
            <button 
              key={tab}
              className="flex-shrink-0 px-8 py-3 rounded-[20px] font-black text-[10px] tracking-[0.4em] uppercase transition-all font-['Roboto_Flex'] bg-white text-black shadow-xl first:bg-white first:text-black hover:scale-105 active:scale-95"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Playlists Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white font-['Inter'] uppercase">
              Playlists
            </h2>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-[20px] border border-white/20 transition-all group">
              <Plus size={20} className="text-white" />
              <span className="text-sm font-black text-white uppercase tracking-wider font-['Roboto_Flex']">Create</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Liked Songs - Special Card */}
            <div className="group cursor-pointer">
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-4 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 shadow-2xl hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Music2 size={80} className="text-white/40" strokeWidth={1.5} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-2xl font-black text-white font-['Inter'] uppercase">Liked</p>
                  <p className="text-sm text-white/80 font-['Roboto_Flex']">{MOCK_TRACKS.length} songs</p>
                </div>
              </div>
              <div className="space-y-1 px-2">
                <h4 className="text-lg font-black text-white font-['Inter'] uppercase leading-none">Liked Songs</h4>
                <p className="text-xs text-zinc-600 font-black uppercase tracking-[0.3em] font-['Roboto_Flex']">Playlist</p>
              </div>
            </div>

            {/* Regular Playlists */}
            {MOCK_TRACKS.slice(0, 7).map((track) => (
              <div key={track.id} className="group cursor-pointer" onClick={() => onTrackSelect(track)}>
                <div className="relative aspect-square rounded-[32px] overflow-hidden mb-4 bg-zinc-900 border border-white/5 shadow-2xl hover:scale-105 transition-all duration-500">
                  <img src={track.coverArt} alt={track.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                    <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl">
                      <Play size={28} fill="black" className="text-black ml-1" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1 px-2">
                  <h4 className="text-lg font-black text-white truncate font-['Inter'] uppercase leading-none">{track.title}</h4>
                  <p className="text-xs text-zinc-600 font-black uppercase tracking-[0.3em] truncate font-['Roboto_Flex']">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Albums Section */}
        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white font-['Inter'] uppercase">
            Albums
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {MOCK_TRACKS.slice(0, 5).map((track) => (
              <div key={track.id} className="group cursor-pointer" onClick={() => onTrackSelect(track)}>
                <div className="relative aspect-square rounded-[32px] overflow-hidden mb-4 bg-zinc-900 border border-white/5 shadow-2xl hover:scale-105 transition-all duration-500">
                  <img src={track.coverArt} alt={track.album} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                    <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl">
                      <Play size={28} fill="black" className="text-black ml-1" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1 px-2">
                  <h4 className="text-lg font-black text-white truncate font-['Inter'] uppercase leading-none">{track.album}</h4>
                  <p className="text-xs text-zinc-600 font-black uppercase tracking-[0.3em] truncate font-['Roboto_Flex']">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Artists Section */}
        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white font-['Inter'] uppercase">
            Artists
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {Array.from(new Set(MOCK_TRACKS.map(t => t.artist))).slice(0, 6).map((artist, i) => (
              <div key={i} className="group cursor-pointer text-center">
                <div className="relative aspect-square rounded-full overflow-hidden mb-4 bg-zinc-900 border-2 border-white/10 shadow-2xl hover:scale-105 transition-all duration-500">
                  <img 
                    src={`https://i.pravatar.cc/300?u=${artist}`} 
                    alt={artist} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-black text-white font-['Inter'] uppercase leading-none">{artist}</h4>
                  <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em] font-['Roboto_Flex']">Artist</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LibraryPage;
