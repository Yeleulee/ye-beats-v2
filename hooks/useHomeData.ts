
import { useState, useEffect } from 'react';
import { Track, Podcast } from '../types';
import { 
  fetchTrendingMusic, 
  fetchArtistTracks, 
  fetchEthiopianPodcasts,
  fetchPopularPodcasts,
  YouTubeTrack
} from '../services/youtubeService';
import { apiKeyManager } from '../utils/apiKeyManager';

// Helper function to convert YouTubeTrack to Track
const convertYouTubeTrackToTrack = (ytTrack: YouTubeTrack): Track => ({
  id: ytTrack.id,
  title: ytTrack.title,
  artist: ytTrack.artist,
  album: ytTrack.album,
  coverArt: ytTrack.coverArt,
  duration: ytTrack.duration,
  videoId: ytTrack.videoId,
  isLossless: false, 
});

export const useHomeData = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // API Data States
  const [trendingTracks, setTrendingTracks] = useState<Track[]>([]);
  const [timeBasedTracks, setTimeBasedTracks] = useState<Track[]>([]);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<Track[]>([]);
  const [podcastData, setPodcastData] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); 
    return () => clearInterval(timer);
  }, []);

  // Fetch real data from YouTube API
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        console.log('🚀 Fetching real data from YouTube API...');
        
        // Determine time-based artist query
        const hour = currentTime.getHours();
        let timeBasedArtist = 'The Weeknd'; 
        if (hour < 12) timeBasedArtist = 'Dua Lipa energetic'; 
        else if (hour < 18) timeBasedArtist = 'Polo G focus'; 
        else timeBasedArtist = 'The Weeknd chill'; 

        // Fetch all data in parallel
        const results = await Promise.allSettled([
          fetchTrendingMusic(10),
          fetchArtistTracks(timeBasedArtist, 6),
          fetchArtistTracks('Drake recent hits', 10),
          fetchEthiopianPodcasts(),
          fetchPopularPodcasts()
        ]);

        // Extract successful results
        const trendingData = results[0].status === 'fulfilled' ? results[0].value : [];
        const timeBasedData = results[1].status === 'fulfilled' ? results[1].value : [];
        const recentData = results[2].status === 'fulfilled' ? results[2].value : [];
        const ethiopianPodcasts = results[3].status === 'fulfilled' ? results[3].value : [];
        const popularPodcasts = results[4].status === 'fulfilled' ? results[4].value : [];

        // Log failures
        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            const labels = ['Trending', 'Time-based', 'Recent', 'Ethiopian Podcasts', 'Popular Podcasts'];
            console.warn(`⚠️ Failed to fetch ${labels[index]}:`, result.reason);
          }
        });

        // Convert YouTube tracks to Track format
        const convertedTrending = trendingData?.map(convertYouTubeTrackToTrack) || [];
        const convertedTimeBased = timeBasedData?.map(convertYouTubeTrackToTrack) || [];
        const convertedRecent = recentData?.map(convertYouTubeTrackToTrack) || [];

        // Combine podcasts
        const allPodcasts: Podcast[] = [
          ...(ethiopianPodcasts || []),
          ...(popularPodcasts || [])
        ].map(podcast => ({
          title: podcast.title,
          creator: podcast.creator,
          episodes: podcast.episodes,
          cover: podcast.cover,
          color: 'from-purple-600/80 to-pink-600/80' 
        }));

        setTrendingTracks(convertedTrending);
        setTimeBasedTracks(convertedTimeBased);
        setRecentlyPlayedTracks(convertedRecent);
        setPodcastData(allPodcasts);

        setDataLoaded(true);
      } catch (error) {
        console.error('❌ Error fetching data:', error);
        setTrendingTracks([]);
        setTimeBasedTracks([]);
        setRecentlyPlayedTracks([]);
        setPodcastData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []); 

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    };
    return currentTime.toLocaleDateString('en-US', options);
  };

  const getListeningStats = () => {
    const tracksToUse = trendingTracks;
    const totalMinutes = tracksToUse.reduce((sum, track) => sum + Math.floor(track.duration / 60), 0);
    
    return {
      totalTracks: tracksToUse.length,
      totalMinutes,
      topArtist: tracksToUse[0]?.artist || 'The Weeknd',
      topGenre: 'R&B / Electronic',
      totalHours: Math.floor(totalMinutes / 60)
    };
  };

  const getTimeBasedRecommendations = () => {
    const hour = currentTime.getHours();
    const tracksToUse = timeBasedTracks.slice(0, 6);
    
    if (hour < 12) {
      return {
        title: 'Energize Your Morning',
        description: 'Start your day with high-energy tracks',
        tracks: tracksToUse,
        mood: 'energizing',
        color: 'from-orange-600 via-yellow-600 to-red-600'
      };
    } else if (hour < 18) {
      return {
        title: 'Afternoon Focus',
        description: 'Stay productive with deep focus music',
        tracks: tracksToUse,
        mood: 'focus',
        color: 'from-blue-600 via-indigo-600 to-purple-600'
      };
    } else {
      return {
        title: 'Evening Wind Down',
        description: 'Relax with smooth, chill vibes',
        tracks: tracksToUse,
        mood: 'chill',
        color: 'from-purple-600 via-pink-600 to-rose-600'
      };
    }
  };

  return {
    currentTime,
    trendingTracks,
    timeBasedTracks,
    recentlyPlayedTracks,
    podcastData,
    isLoading,
    dataLoaded,
    getGreeting,
    getFormattedDate,
    getListeningStats,
    getTimeBasedRecommendations,
    recommendations: getTimeBasedRecommendations(), // pre-calculate
    stats: getListeningStats(), // pre-calculate
  };
};
