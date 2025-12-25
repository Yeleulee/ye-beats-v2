
import React from 'react';
import { Plus } from 'lucide-react';
import { Track } from '../../types';

interface CollectionSectionProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  onAddToQueue: (track: Track) => void;
  topTrack?: Track;
}

const CollectionSection: React.FC<CollectionSectionProps> = ({ tracks, onTrackSelect, onAddToQueue, topTrack }) => {
  return (
    <section className="px-6 md:px-8 lg:px-10 pb-24 md:pb-28">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white font-['Inter'] uppercase leading-none">Your Collection</h2>
        <button 
          onClick={() => topTrack && onAddToQueue(topTrack)}
          className="p-3 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <Plus size={24} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {tracks.map(track => (
          <div key={track.id} className="bg-white/[0.02] backdrop-blur-3xl hover:bg-white/[0.06] p-5 md:p-6 rounded-[40px] flex items-center gap-6 transition-all border border-white/5 group cursor-pointer active:scale-[0.98] shadow-xl">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-[28px] overflow-hidden flex-shrink-0 shadow-lg border border-white/5" onClick={() => onTrackSelect(track)}>
              <img src={track.coverArt} alt={`${track.title} by ${track.artist} album cover`} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 pr-2" onClick={() => onTrackSelect(track)}>
              <h4 className="font-black text-xl md:text-2xl truncate text-white tracking-tighter mb-2 leading-none font-['Inter'] uppercase">{track.title}</h4>
              <p className="text-[10px] md:text-[11px] font-black text-zinc-600 truncate tracking-[0.3em] uppercase font-['Roboto_Flex']">{track.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionSection;
