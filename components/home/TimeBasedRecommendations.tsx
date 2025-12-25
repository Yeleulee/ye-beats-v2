
import React from 'react';
import { Play, Music2, Plus } from 'lucide-react';
import { Track } from '../../types';

interface TimeBasedRecommendationsProps {
  recommendations: {
    title: string;
    description: string;
    tracks: Track[];
    mood: string;
    color: string;
  };
  onTrackSelect: (track: Track) => void;
}

const TimeBasedRecommendations: React.FC<TimeBasedRecommendationsProps> = ({ recommendations, onTrackSelect }) => {
  return (
    <section className="px-6 md:px-8 lg:px-10 mb-10 md:mb-12 mt-4 md:mt-6">
      <div className="space-y-3 md:space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-tighter text-white font-['Inter'] uppercase mb-1 md:mb-2">
            {recommendations.title}
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm font-medium font-['Roboto_Flex']">
            {recommendations.description}
          </p>
        </div>

        <div className="flex overflow-x-auto gap-3 md:gap-4 no-scrollbar pb-3 md:pb-4 -mx-2 px-2 scroll-smooth snap-x snap-mandatory">
          {recommendations.tracks.map((track) => (
            <div 
              key={track.id}
              onClick={() => onTrackSelect(track)}
              className="snap-start flex-shrink-0 w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] group cursor-pointer"
            >
              <div className="relative h-[280px] md:h-[320px] rounded-[32px] overflow-hidden border border-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-500 shadow-2xl">
                {/* Background Image */}
                <img 
                  src={track.coverArt} 
                  alt={`${track.title} by ${track.artist}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1000ms]"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${recommendations.color} via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity`} />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                  {/* Top: Heatmap/Indicator */}
                  <div className="flex justify-between items-start">
                    <div className="inline-block px-2.5 py-1 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
                      <div className="flex items-center gap-1.5">
                        <Music2 size={10} className="text-white" />
                        <span className="text-[8px] font-black text-white uppercase tracking-[0.2em] font-['Roboto_Flex']">
                          Track
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Info & Play */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none font-['Inter'] uppercase mb-1 drop-shadow-lg line-clamp-2">
                        {track.title}
                      </h3>
                      <p className="text-white/90 text-[10px] md:text-xs font-bold font-['Roboto_Flex'] uppercase tracking-[0.2em] truncate drop-shadow-md">
                        {track.artist}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg">
                        <Play size={18} fill="black" className="ml-0.5" />
                      </button>
                      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                        <div 
                          className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                          style={{ width: `${(track.heatmap?.reduce((a, b) => a + b, 0) || 0) / (track.heatmap?.length || 1) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add more button to explore */}
          <div className="snap-start flex-shrink-0 w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] group cursor-pointer">
            <div className="relative h-[280px] md:h-[320px] rounded-[32px] overflow-hidden bg-white/[0.02] border border-white/10 hover:bg-white/5 hover:border-white/20 hover:scale-[1.02] transition-all duration-300 backdrop-blur-md flex items-center justify-center">
              <div className="text-center space-y-3 p-6">
                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-white/10">
                  <Plus size={24} className="md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-base uppercase tracking-tight font-['Inter'] mb-1">
                    Explore More
                  </p>
                  <p className="text-zinc-500 text-xs font-medium font-['Roboto_Flex'] group-hover:text-zinc-400 transition-colors">
                    Discover {recommendations.mood} tracks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeBasedRecommendations;
