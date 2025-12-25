
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Track } from '../../types';

interface ReplaySectionProps {
  stats: {
    totalTracks: number;
    totalMinutes: number;
    topArtist: string;
    topGenre: string;
    totalHours: number;
  };
  onTrackSelect: (track: Track) => void;
  topTrack?: Track;
}

const ReplaySection: React.FC<ReplaySectionProps> = ({ stats, onTrackSelect, topTrack }) => {
  const [activeFilter, setActiveFilter] = useState<'replay' | 'made-for-you'>('replay');

  return (
    <section className="mb-12 md:mb-16 mt-4 md:mt-6">
      <div className="px-6 md:px-8 lg:px-10 mb-4 md:mb-6">
        <div className="flex items-end justify-between mb-3 md:mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white font-['Inter'] uppercase">Your 2025</h2>
        </div>
        
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4">
          <button 
            onClick={() => setActiveFilter('replay')}
            className={`flex-shrink-0 px-8 py-3 rounded-[20px] font-black text-[10px] tracking-[0.4em] uppercase transition-all font-['Roboto_Flex'] ${
              activeFilter === 'replay' 
                ? 'bg-white text-black shadow-xl' 
                : 'bg-white/[0.03] border border-white/10 text-zinc-500 hover:text-white hover:border-white/20'
            }`}
          >
            Replay
          </button>
          <button 
            onClick={() => setActiveFilter('made-for-you')}
            className={`flex-shrink-0 px-8 py-3 rounded-[20px] font-black text-[10px] tracking-[0.4em] uppercase transition-all font-['Roboto_Flex'] ${
              activeFilter === 'made-for-you' 
                ? 'bg-white text-black shadow-xl' 
                : 'bg-white/[0.03] border border-white/10 text-zinc-500 hover:text-white hover:border-white/20'
            }`}
          >
            Made for You
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-3 md:gap-4 px-6 md:px-8 lg:px-10 no-scrollbar pb-4 md:pb-6 snap-x snap-mandatory scroll-smooth touch-pan-x">
        {/* Personalized Replay 2025 Card */}
        <div 
          onClick={() => topTrack && onTrackSelect(topTrack)}
          className="snap-center flex-shrink-0 w-[75vw] sm:w-[340px] md:w-[380px] lg:w-[420px] rounded-[32px] md:rounded-[40px] overflow-hidden relative shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9)] border border-white/10 active:scale-[0.98] transition-all group cursor-pointer hover:border-white/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 opacity-60 group-hover:opacity-70 transition-opacity" />
          <div className="absolute inset-0 backdrop-blur-2xl" />
          <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-between z-10">
            <div className="space-y-2 md:space-y-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] md:rounded-[16px] bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-xl">
                <Play size={20} className="md:w-6 md:h-6" fill="white" />
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.85] text-white font-['Inter'] uppercase mb-1">
                  Replay
                </h3>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white/70 font-['Inter'] uppercase">2025</span>
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {/* Personalized Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-4 border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-1 font-['Roboto_Flex']">Total Hours</p>
                  <p className="text-3xl font-black text-white font-['Inter']">{stats.totalHours}h</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-4 border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-1 font-['Roboto_Flex']">Songs</p>
                  <p className="text-3xl font-black text-white font-['Inter']">{stats.totalTracks}</p>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-4 border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-2 font-['Roboto_Flex']">Top Artist</p>
                <p className="text-xl font-black text-white font-['Inter'] tracking-tight">{stats.topArtist}</p>
                <p className="text-xs font-bold text-white/70 mt-1 font-['Roboto_Flex']">{stats.topGenre}</p>
              </div>
              
              <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white py-4 rounded-[24px] font-black text-sm uppercase tracking-[0.3em] transition-all border border-white/20 font-['Roboto_Flex'] hover:border-white/30">
                View Full Replay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReplaySection;
