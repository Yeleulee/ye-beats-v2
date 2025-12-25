
import React from 'react';
import { Play } from 'lucide-react';
import { Podcast, Track } from '../../types';

interface PodcastSectionProps {
  podcasts: Podcast[];
  onTrackSelect: (track: Track) => void;
  fallbackTracks: Track[];
}

const PodcastSection: React.FC<PodcastSectionProps> = ({ podcasts, onTrackSelect, fallbackTracks }) => {
  return (
    <section className="mb-12 md:mb-16">
      <div className="px-6 md:px-8 lg:px-10 mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white font-['Inter'] uppercase">
            Podcasts for You
          </h2>
          <button className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] md:tracking-[0.5em] hover:text-white transition-all font-['Roboto_Flex']">
            See All
          </button>
        </div>
        <p className="text-zinc-500 text-xs md:text-sm font-medium font-['Roboto_Flex']">
          Discover stories, insights, and conversations
        </p>
      </div>

      <div className="flex overflow-x-auto gap-6 px-6 md:px-12 no-scrollbar pb-8 snap-x snap-mandatory scroll-smooth touch-pan-x">
        {podcasts.map((podcast, i) => (
          <div 
            key={i}
            className="snap-start flex-shrink-0 w-[280px] md:w-[320px] group cursor-pointer"
          >
            {/* Card with full-bleed cover image */}
            <div className="relative h-[360px] md:h-[400px] rounded-[40px] overflow-hidden border border-white/10 hover:scale-[1.02] hover:border-white/20 transition-all duration-500 shadow-2xl">
              {/* Background image */}
              <img 
                src={podcast.cover} 
                alt={podcast.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${podcast.color} via-black/10 to-transparent opacity-90`} />
              
              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top section */}
                <div>
                  <div className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-4">
                    <span className="text-[8px] font-black text-white uppercase tracking-[0.3em] font-['Roboto_Flex']">
                      Podcast
                    </span>
                  </div>
                </div>
                
                {/* Bottom section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-tight font-['Inter'] uppercase mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] line-clamp-2">
                      {podcast.title}
                    </h3>
                    <p className="text-sm font-bold text-white/90 font-['Roboto_Flex'] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                      {podcast.creator}
                    </p>
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] font-['Roboto_Flex'] mt-1">
                      {podcast.episodes}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1" />
                    <button 
                      onClick={() => {
                        const trackToPlay = fallbackTracks[i] || fallbackTracks[0];
                        if (trackToPlay) onTrackSelect(trackToPlay);
                      }}
                      className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.4)] border-2 border-white/20"
                    >
                      <Play size={22} fill="black" className="text-black ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PodcastSection;
