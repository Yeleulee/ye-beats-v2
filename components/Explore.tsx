

import React, { useState, useEffect } from 'react';
import { Play, Music, Zap, Flame, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { fetchTrendingMusic, searchMusic, YouTubeTrack } from '../services/youtubeService';
import { apiKeyManager } from '../utils/apiKeyManager';

interface ExploreProps {
  onPlayTrack: (track: any) => void;
}

const Explore: React.FC<ExploreProps> = ({ onPlayTrack }) => {
  const [globalTracks, setGlobalTracks] = useState<YouTubeTrack[]>([]);
  const [tokyoTracks, setTokyoTracks] = useState<YouTubeTrack[]>([]);
  const [newReleaseTracks, setNewReleaseTracks] = useState<YouTubeTrack[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real data on mount
  useEffect(() => {
    const fetchExploreData = async () => {
      try {
        setIsLoading(true);
        console.log('🌍 Fetching Explore page data...');
        
        const results = await Promise.allSettled([
          fetchTrendingMusic(20),
          searchMusic('City Pop Tokyo', 10),
          searchMusic('new music 2025', 10)
        ]);

        const global = results[0].status === 'fulfilled' ? results[0].value : [];
        const tokyo = results[1].status === 'fulfilled' ? results[1].value : [];
        const newReleases = results[2].status === 'fulfilled' ? results[2].value : [];

        // Log failures
        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            const labels = ['Global', 'Tokyo', 'New Releases'];
            console.warn(`⚠️ Failed to fetch ${labels[index]}:`, result.reason);
          }
        });

        setGlobalTracks(global || []);
        setTokyoTracks(tokyo || []);
        setNewReleaseTracks(newReleases || []);
        
        console.log('✅ Explore data loaded!');
        console.log('📊 API Stats:', apiKeyManager.getStats());
      } catch (error) {
        console.error('❌ Error loading explore data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExploreData();
  }, []);
  const moods = [
    { 
      label: 'Commute', 
      icon: Zap, 
      gradient: 'from-blue-600 via-cyan-500 to-blue-400',
      glow: 'shadow-[0_0_60px_rgba(59,130,246,0.5)]',
      iconBg: 'bg-gradient-to-br from-blue-400 to-cyan-500'
    },
    { 
      label: 'Workout', 
      icon: Flame, 
      gradient: 'from-orange-600 via-red-500 to-orange-400',
      glow: 'shadow-[0_0_60px_rgba(249,115,22,0.5)]',
      iconBg: 'bg-gradient-to-br from-orange-400 to-red-500'
    },
    { 
      label: 'Focus', 
      icon: Music, 
      gradient: 'from-emerald-600 via-green-500 to-emerald-400',
      glow: 'shadow-[0_0_60px_rgba(16,185,129,0.5)]',
      iconBg: 'bg-gradient-to-br from-emerald-400 to-green-500'
    },
    { 
      label: 'Party', 
      icon: Sparkles, 
      gradient: 'from-purple-600 via-pink-500 to-purple-400',
      glow: 'shadow-[0_0_60px_rgba(168,85,247,0.5)]',
      iconBg: 'bg-gradient-to-br from-purple-400 to-pink-500'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-20 animate-in fade-in duration-1000 px-6 py-12 md:py-20 bg-black min-h-screen">
      {/* Mood Hub */}
      <section className="space-y-10">
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white font-['Inter'] uppercase mb-3">
            What's the vibe?
          </h2>
          <p className="text-zinc-500 text-lg font-medium font-['Roboto_Flex']">
            Choose your mood and let the music match your energy
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 perspective-1000">
          {moods.map((mood) => (
            <button 
              key={mood.label}
              className="group relative"
              style={{ perspective: '1000px' }}
            >
              {/* 3D Card with true depth */}
              <div className="relative transform-gpu transition-all duration-500 hover:-translate-y-4 hover:rotate-y-5 active:scale-95"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Back layer for depth */}
                <div className="absolute inset-0 rounded-[48px] bg-gradient-to-br from-black to-zinc-900 blur-xl opacity-80 translate-z-[-50px]" 
                  style={{ transform: 'translateZ(-50px)' }}
                />
                
                {/* Main card face */}
                <div className={`relative p-8 md:p-10 rounded-[48px] border-2 border-white/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_100px_${mood.glow.match(/rgba\(([^)]+)\)/)?.[1]},inset_0_1px_0_rgba(255,255,255,0.3)]`}
                  style={{ transform: 'translateZ(0px)' }}
                >
                  {/* Colored gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${mood.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay`} />
                  
                  {/* Top light reflection */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent rounded-t-[48px]" />
                  
                  {/* 3D Elevated Icon */}
                  <div className="relative mb-6 transform-gpu transition-all duration-500 group-hover:translate-y-[-8px]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Icon shadow layer */}
                    <div className={`absolute inset-0 w-20 h-20 md:w-24 md:h-24 ${mood.iconBg} rounded-[28px] blur-2xl opacity-60`}
                      style={{ transform: 'translateZ(-20px)' }}
                    />
                    
                    {/* Icon container with extrusion */}
                    <div className={`relative w-20 h-20 md:w-24 md:h-24 ${mood.iconBg} rounded-[28px] flex items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.5),0_5px_15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.5)]`}
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      {/* Multiple glass layers for depth */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-[28px]" />
                      <div className="absolute inset-0 bg-gradient-to-tl from-black/20 via-transparent to-transparent rounded-[28px]" />
                      
                      <mood.icon 
                        className="relative z-10 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter brightness-110" 
                        size={48} 
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                  
                  {/* Content with depth */}
                  <div className="relative z-10" style={{ transform: 'translateZ(10px)' }}>
                    <span className="block text-2xl md:text-3xl font-black tracking-tight text-white mb-2 font-['Inter'] leading-none uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {mood.label}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.5em] font-['Roboto_Flex'] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                      Curated Mix
                    </span>
                  </div>
                  
                  {/* Bottom shadow for card depth */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent rounded-b-[48px]" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Global Charts */}
      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-black tracking-tighter text-white font-['Inter'] flex items-center gap-4 uppercase">
            <Globe className="text-indigo-500" size={32} />
            Global Pulse
          </h2>
          <button className="text-[11px] font-black text-zinc-600 hover:text-white flex items-center gap-3 transition-colors uppercase tracking-[0.5em] font-['Roboto_Flex']">
            View All <ArrowRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              title: 'Top 100 Global', 
              sub: 'The most played songs right now', 
              img: globalTracks[0]?.coverArt || 'https://picsum.photos/seed/global/600/600', 
              color: 'border-blue-500/20',
              tracks: globalTracks.slice(0, 5)
            },
            { 
              title: 'Trending: Tokyo', 
              sub: 'City Pop & Future Funk hits', 
              img: tokyoTracks[0]?.coverArt || 'https://picsum.photos/seed/tokyo/600/600', 
              color: 'border-pink-500/20',
              tracks: tokyoTracks.slice(0, 5)
            },
            { 
              title: 'New Release Mix', 
              sub: 'Personalized unreleased gems', 
              img: newReleaseTracks[0]?.coverArt || 'https://picsum.photos/seed/newmix/600/600', 
              color: 'border-emerald-500/20',
              tracks: newReleaseTracks.slice(0, 5)
            },
          ].map((chart, i) => (
            <div key={i} className={`relative group aspect-[3/4] rounded-[56px] overflow-hidden border ${chart.color} cursor-pointer shadow-2xl`}>
              <img src={chart.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={chart.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-12 space-y-4 text-white w-full">
                <h4 className="text-4xl font-black leading-none tracking-tight font-['Inter'] uppercase">{chart.title}</h4>
                <p className="text-zinc-400 text-lg font-medium font-['Roboto_Flex'] tracking-tight">{chart.sub}</p>
                <div className="pt-6 flex items-center gap-5 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                  <button 
                    onClick={() => chart.tracks[0] && onPlayTrack(chart.tracks[0])}
                    className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                  >
                    <Play className="text-black ml-1.5" fill="black" size={28} />
                  </button>
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] font-['Roboto_Flex'] text-white/60">Listen Now</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discover Call to Action */}
      <section className="bg-zinc-950 border border-white/10 p-16 md:p-24 rounded-[64px] text-center space-y-10 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/5 to-transparent pointer-events-none" />
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white font-['Inter'] leading-[0.85] relative z-10 uppercase">
          Break the <br /> <span className="text-zinc-700">Loop.</span>
        </h2>
        <p className="text-zinc-500 text-xl md:text-2xl max-w-2xl mx-auto font-medium tracking-tight font-['Roboto_Flex'] relative z-10 leading-relaxed">
          Our AI picks deep cuts based on your core rotation. Step into the unknown.
        </p>
        <button className="bg-white text-black px-16 py-6 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_40px_80px_rgba(255,255,255,0.2)] relative z-10 font-['Roboto_Flex'] uppercase tracking-[0.2em]">
          Surprise Me
        </button>
      </section>
    </div>
  );
};

export default Explore;
