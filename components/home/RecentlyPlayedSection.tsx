
import React from 'react';
import { Play } from 'lucide-react';
import { Track } from '../../types';

interface RecentlyPlayedSectionProps {
  tracks: Track[];
  isLoading: boolean;
  onTrackSelect: (track: Track) => void;
}

const RecentlyPlayedSection: React.FC<RecentlyPlayedSectionProps> = ({ tracks, isLoading, onTrackSelect }) => {
  return (
    <section className="mb-12 md:mb-16">
      <div className="px-6 md:px-8 lg:px-10 mb-6 md:mb-8 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white font-['Inter'] uppercase">
          Recently Played
        </h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-zinc-500 text-xl font-medium font-['Roboto_Flex']">Loading tracks...</div>
        </div>
      ) : (
        <div className="flex overflow-x-auto gap-4 md:gap-6 px-6 md:px-8 lg:px-10 no-scrollbar snap-x scroll-smooth touch-pan-x">
          {tracks.map((track) => (
            <div 
              key={track.id} 
              className="snap-start flex-shrink-0 w-[180px] md:w-[200px] group cursor-pointer"
              onClick={() => onTrackSelect(track)}
            >
              <div className="relative h-[220px] md:h-[240px] rounded-[28px] overflow-hidden border border-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-500 shadow-xl bg-zinc-900">
                <img 
                  src={track.coverArt} 
                  alt={`${track.title} by ${track.artist}`} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1000ms]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-lg font-black truncate text-white tracking-tighter leading-none font-['Inter'] uppercase mb-1 drop-shadow-md">{track.title}</h4>
                    <p className="text-[10px] text-zinc-300 font-black truncate uppercase tracking-[0.2em] font-['Roboto_Flex'] drop-shadow-sm">{track.artist}</p>
                    
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-end">
                       <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-lg">
                         <Play size={14} fill="black" className="ml-0.5" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentlyPlayedSection;
