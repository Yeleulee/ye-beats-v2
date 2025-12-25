
import React from 'react';
import { Track } from '../types';
import { useHomeData } from '../hooks/useHomeData';
import HomeHeader from './home/HomeHeader';
import TimeBasedRecommendations from './home/TimeBasedRecommendations';
import ReplaySection from './home/ReplaySection';
import PodcastSection from './home/PodcastSection';
import RecentlyPlayedSection from './home/RecentlyPlayedSection';
import CollectionSection from './home/CollectionSection';

interface HomeContentProps {
  onTrackSelect: (track: Track) => void;
  onAddToQueue: (track: Track) => void;
  onPlayNext: (track: Track) => void;
  onLogout: () => void;
}

const HomeContent: React.FC<HomeContentProps> = ({ onTrackSelect, onAddToQueue, onPlayNext, onLogout }) => {
  const {
    trendingTracks,
    timeBasedTracks,
    recentlyPlayedTracks,
    podcastData,
    isLoading,
    getGreeting,
    getFormattedDate,
    recommendations,
    stats,
  } = useHomeData();

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-1000 relative min-h-screen bg-black overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-red-950/20 blur-[180px] rounded-full animate-pulse opacity-60" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-indigo-950/15 blur-[160px] rounded-full opacity-40" />
      </div>

      <HomeHeader 
        greeting={getGreeting()} 
        formattedDate={getFormattedDate()} 
        onLogout={onLogout} 
      />

      <div className="relative z-10">
        <TimeBasedRecommendations 
          recommendations={recommendations} 
          onTrackSelect={onTrackSelect} 
        />

        <ReplaySection 
          stats={stats} 
          onTrackSelect={onTrackSelect} 
          topTrack={trendingTracks[0]} 
        />

        <PodcastSection 
          podcasts={podcastData} 
          onTrackSelect={onTrackSelect} 
          fallbackTracks={timeBasedTracks}
        />

        <RecentlyPlayedSection 
          tracks={recentlyPlayedTracks} 
          isLoading={isLoading} 
          onTrackSelect={onTrackSelect} 
        />

        <CollectionSection 
          tracks={trendingTracks} 
          onTrackSelect={onTrackSelect} 
          onAddToQueue={onAddToQueue} 
          topTrack={trendingTracks[0]} 
        />
      </div>
    </div>
  );
};

export default HomeContent;
