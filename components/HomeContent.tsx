
import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Plus, LogOut, User as UserIcon, Settings, CheckCircle2, Bell, Music2 } from 'lucide-react';
import { Track } from '../types';
import { MOCK_TRACKS } from '../constants';
import { 
  fetchTrendingMusic, 
  fetchArtistTracks, 
  fetchEthiopianPodcasts,
  fetchPopularPodcasts,
  YouTubeTrack,
  Podcast as YouTubePodcast
} from '../services/youtubeService';
import { apiKeyManager } from '../utils/apiKeyManager';

interface HomeContentProps {
  onTrackSelect: (track: Track) => void;
  onAddToQueue: (track: Track) => void;
  onPlayNext: (track: Track) => void;
  onLogout: () => void;
}

// Helper function to convert YouTubeTrack to Track
const convertYouTubeTrackToTrack = (ytTrack: YouTubeTrack): Track => ({
  id: ytTrack.id,
  title: ytTrack.title,
  artist: ytTrack.artist,
  album: ytTrack.album,
  coverArt: ytTrack.coverArt,
  duration: ytTrack.duration,
  videoId: ytTrack.videoId,
  isLossless: false, // YouTube tracks are not lossless
});

const HomeContent: React.FC<HomeContentProps> = ({ onTrackSelect, onAddToQueue, onPlayNext, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState<'replay' | 'made-for-you'>('replay');
  
  // API Data States
  const [trendingTracks, setTrendingTracks] = useState<Track[]>([]);
  const [timeBasedTracks, setTimeBasedTracks] = useState<Track[]>([]);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<Track[]>([]);
  const [podcastData, setPodcastData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Fetch real data from YouTube API
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        console.log('🚀 Fetching real data from YouTube API...');
        console.log('📊 API Key Manager Stats:', apiKeyManager.getStats());

        // Determine time-based artist query
        const hour = currentTime.getHours();
        let timeBasedArtist = 'The Weeknd'; // Default
        if (hour < 12) timeBasedArtist = 'Dua Lipa energetic'; // Morning
        else if (hour < 18) timeBasedArtist = 'Polo G focus'; // Afternoon
        else timeBasedArtist = 'The Weeknd chill'; // Evening

        // Fetch all data in parallel with individual error handling
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

        // Log any failures
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

        // Combine podcasts with proper structure
        const allPodcasts = [
          ...(ethiopianPodcasts || []),
          ...(popularPodcasts || [])
        ].map(podcast => ({
          title: podcast.title,
          creator: podcast.creator,
          episodes: podcast.episodes,
          cover: podcast.cover,
          color: 'from-purple-600/80 to-pink-600/80' // Default color
        }));

        // Update state with real data (fallback to mock only if no data)
        setTrendingTracks(convertedTrending.length > 0 ? convertedTrending : MOCK_TRACKS);
        setTimeBasedTracks(convertedTimeBased.length > 0 ? convertedTimeBased : MOCK_TRACKS);
        setRecentlyPlayedTracks(convertedRecent.length > 0 ? convertedRecent : MOCK_TRACKS);
        setPodcastData(allPodcasts.length > 4 ? allPodcasts.slice(0, 4) : [
          {
            title: 'The Weeknd Experience',
            creator: 'Music Tales',
            episodes: '24 Episodes',
            cover: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=400&h=400&auto=format&fit=crop',
            color: 'from-purple-600/80 to-pink-600/80'
          },
          {
            title: 'Behind the Beat',
            creator: 'Producer Stories',
            episodes: '18 Episodes',
            cover: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400&h=400&auto=format&fit=crop',
            color: 'from-blue-600/80 to-cyan-600/80'
          },
          {
            title: 'City Pop Chronicles', 
            creator: 'Tokyo Nights',
            episodes: '32 Episodes',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&h=400&auto=format&fit=crop',
            color: 'from-orange-600/80 to-red-600/80'
          },
          {
            title: 'R&B Evolution',
            creator: 'Soul Stories',
            episodes: '41 Episodes',
            cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=400&h=400&auto=format&fit=crop',
            color: 'from-emerald-600/80 to-teal-600/80'
          }
        ]);

        setDataLoaded(true);
        console.log('✅ Data loaded successfully!');
        console.log('📊 Final API Stats:', apiKeyManager.getStats());
      } catch (error) {
        console.error('❌ Error fetching data:', error);
        // Fallback to mock data
        setTrendingTracks(MOCK_TRACKS);
        setTimeBasedTracks(MOCK_TRACKS);
        setRecentlyPlayedTracks(MOCK_TRACKS);
        setPodcastData([
          {
            title: 'The Weeknd Experience',
            creator: 'Music Tales',
            episodes: '24 Episodes',
            cover: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=400&h=400&auto=format&fit=crop',
            color: 'from-purple-600/80 to-pink-600/80'
          },
          {
            title: 'Behind the Beat',
            creator: 'Producer Stories',
            episodes: '18 Episodes',
            cover: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400&h=400&auto=format&fit=crop',
            color: 'from-blue-600/80 to-cyan-600/80'
          },
          {
            title: 'City Pop Chronicles', 
            creator: 'Tokyo Nights',
            episodes: '32 Episodes',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&h=400&auto=format&fit=crop',
            color: 'from-orange-600/80 to-red-600/80'
          },
          {
            title: 'R&B Evolution',
            creator: 'Soul Stories',
            episodes: '41 Episodes',
            cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=400&h=400&auto=format&fit=crop',
            color: 'from-emerald-600/80 to-teal-600/80'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []); // Only fetch once on mount

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Format date (e.g., "Saturday, December 21")
  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    };
    return currentTime.toLocaleDateString('en-US', options);
  };

  // Calculate personalized listening stats
  const getListeningStats = () => {
    const tracksToUse = trendingTracks.length > 0 ? trendingTracks : MOCK_TRACKS;
    const totalTracks = tracksToUse.length;
    const totalMinutes = tracksToUse.reduce((sum, track) => sum + Math.floor(track.duration / 60), 0);
    const topArtist = tracksToUse[0]?.artist || 'The Weeknd'; // Most frequently appearing artist
    const topGenre = 'R&B / Electronic';
    
    return {
      totalTracks,
      totalMinutes,
      topArtist,
      topGenre,
      totalHours: Math.floor(totalMinutes / 60)
    };
  };

  const stats = getListeningStats();

  // Get time-based recommendations
  const getTimeBasedRecommendations = () => {
    const hour = currentTime.getHours();
    const tracksToUse = timeBasedTracks.length > 0 ? timeBasedTracks.slice(0, 6) : MOCK_TRACKS.slice(0, 6);
    
    if (hour < 12) {
      // Morning: Energizing tracks, workout playlists
      return {
        title: 'Energize Your Morning',
        description: 'Start your day with high-energy tracks',
        tracks: tracksToUse,
        mood: 'energizing',
        color: 'from-orange-600 via-yellow-600 to-red-600'
      };
    } else if (hour < 18) {
      // Afternoon: Focus music, work playlists
      return {
        title: 'Afternoon Focus',
        description: 'Stay productive with deep focus music',
        tracks: tracksToUse,
        mood: 'focus',
        color: 'from-blue-600 via-indigo-600 to-purple-600'
      };
    } else {
      // Evening: Chill vibes, relaxing tracks
      return {
        title: 'Evening Wind Down',
        description: 'Relax with smooth, chill vibes',
        tracks: tracksToUse,
        mood: 'chill',
        color: 'from-purple-600 via-pink-600 to-rose-600'
      };
    }
  };

  const recommendations = getTimeBasedRecommendations();

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-1000 relative min-h-screen bg-black overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-red-950/20 blur-[180px] rounded-full animate-pulse opacity-60" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-indigo-950/15 blur-[160px] rounded-full opacity-40" />
      </div>

      <header className="sticky top-0 z-40 px-6 md:px-12 pt-12 pb-8 flex items-start justify-between transition-all duration-500 bg-gradient-to-b from-black via-black/60 to-transparent backdrop-blur-xl border-b border-white/5">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] font-['Inter'] uppercase leading-none">
            {getGreeting()}
          </h1>
          <p className="text-base md:text-xl font-bold text-zinc-500 tracking-tight font-['Roboto_Flex']">
            {getFormattedDate()}
          </p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all z-50 ring-2 ring-red-500/20"
          >
            <img src="https://i.pravatar.cc/150?u=ye_user" alt="Profile" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-black rounded-full" />
          </button>

          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
              <div className="absolute right-0 mt-4 w-80 bg-gradient-to-b from-zinc-900/98 to-black/98 backdrop-blur-3xl border border-white/20 rounded-[32px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)] z-50 animate-in fade-in slide-in-from-top-4 duration-300 overflow-hidden">
                {/* User Info Header */}
                <div className="p-6 bg-gradient-to-br from-red-600/20 via-purple-600/10 to-transparent border-b border-white/10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-xl">
                      <img src="https://i.pravatar.cc/150?u=ye_user" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-lg font-black text-white font-['Inter'] tracking-tight">Liam Beats</p>
                        <div className="px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                          <span className="text-[8px] font-black text-black uppercase tracking-wider">PRO</span>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-zinc-400 tracking-wide font-['Roboto_Flex']">liam@yebeats.io</p>
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                      <p className="text-2xl font-black text-white font-['Inter']">2.4K</p>
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em] font-['Roboto_Flex']">Songs</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                      <p className="text-2xl font-black text-white font-['Inter']">142h</p>
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em] font-['Roboto_Flex']">Listened</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-3">
                  {/* Account Section */}
                  <div className="mb-2">
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em] px-3 py-2 font-['Roboto_Flex']">Account</p>
                    <button className="w-full flex items-center gap-3 px-3 py-3 text-zinc-300 hover:text-white hover:bg-white/10 rounded-[18px] transition-all group">
                      <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all">
                        <UserIcon size={16} className="text-zinc-400 group-hover:text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-black font-['Roboto_Flex'] tracking-tight">Profile Settings</p>
                        <p className="text-[9px] text-zinc-600 font-['Roboto_Flex']">Manage your account</p>
                      </div>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-3 text-zinc-300 hover:text-white hover:bg-white/10 rounded-[18px] transition-all group">
                      <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all">
                        <Settings size={16} className="text-zinc-400 group-hover:text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-black font-['Roboto_Flex'] tracking-tight">Preferences</p>
                        <p className="text-[9px] text-zinc-600 font-['Roboto_Flex']">Customize your experience</p>
                      </div>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-3 text-zinc-300 hover:text-white hover:bg-white/10 rounded-[18px] transition-all group">
                      <div className="w-9 h-9 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center group-hover:from-yellow-500/30 group-hover:to-orange-500/30 transition-all border border-yellow-500/30">
                        <CheckCircle2 size={16} className="text-yellow-500" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-black font-['Roboto_Flex'] tracking-tight">Subscription</p>
                        <p className="text-[9px] text-zinc-600 font-['Roboto_Flex']">Manage your plan</p>
                      </div>
                    </button>
                  </div>

                  <div className="h-px bg-white/10 my-2" />

                  {/* Settings Section */}
                  <div className="mb-2">
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em] px-3 py-2 font-['Roboto_Flex']">Settings</p>
                    <button className="w-full flex items-center gap-3 px-3 py-3 text-zinc-300 hover:text-white hover:bg-white/10 rounded-[18px] transition-all group">
                      <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all">
                        <Bell size={16} className="text-zinc-400 group-hover:text-white" />
                      </div>
                      <span className="text-sm font-black font-['Roboto_Flex'] tracking-tight">Notifications</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-3 text-zinc-300 hover:text-white hover:bg-white/10 rounded-[18px] transition-all group">
                      <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all">
                        <Music2 size={16} className="text-zinc-400 group-hover:text-white" />
                      </div>
                      <span className="text-sm font-black font-['Roboto_Flex'] tracking-tight">Audio Quality</span>
                    </button>
                  </div>

                  <div className="h-px bg-white/10 my-2" />

                  {/* Logout */}
                  <button 
                    onClick={() => { onLogout(); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-[18px] transition-all group"
                  >
                    <div className="w-9 h-9 bg-red-500/10 rounded-full flex items-center justify-center group-hover:bg-red-500/20 transition-all">
                      <LogOut size={16} className="text-red-400" />
                    </div>
                    <span className="text-sm font-black font-['Roboto_Flex'] tracking-tight">Log Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      <div className="relative z-10">
        {/* Time-based Contextual Recommendations */}
        <section className="px-6 md:px-12 mb-16 mt-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white font-['Inter'] uppercase mb-2">
                {recommendations.title}
              </h2>
              <p className="text-zinc-500 text-sm md:text-base font-medium font-['Roboto_Flex']">
                {recommendations.description}
              </p>
            </div>

            <div className="flex overflow-x-auto gap-4 md:gap-6 no-scrollbar pb-4 -mx-2 px-2 scroll-smooth snap-x snap-mandatory">
              {recommendations.tracks.map((track) => (
                <div 
                  key={track.id}
                  onClick={() => onTrackSelect(track)}
                  className="snap-start flex-shrink-0 w-[280px] md:w-[320px] rounded-[40px] overflow-hidden cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${recommendations.color} opacity-80`} />
                  <div className="relative z-10 p-6 md:p-8 flex flex-col h-full backdrop-blur-sm">
                    <div className="flex-1 mb-6">
                      <img 
                        src={track.coverArt} 
                        alt={`${track.title} by ${track.artist}`}
                        className="w-full aspect-square rounded-[32px] object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none font-['Inter'] uppercase truncate">
                        {track.title}
                      </h3>
                      <p className="text-white/80 text-sm font-bold font-['Roboto_Flex'] uppercase tracking-[0.2em] truncate">
                        {track.artist}
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white rounded-full" 
                            style={{ width: `${(track.heatmap?.reduce((a, b) => a + b, 0) || 0) / (track.heatmap?.length || 1) * 100}%` }}
                          />
                        </div>
                        <Play className="text-white" size={24} fill="white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add more button to explore */}
              <div className="snap-start flex-shrink-0 w-[280px] md:w-[320px] rounded-[40px] bg-white/5 border-2 border-white/10 border-dashed flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all backdrop-blur-sm">
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                    <Plus size={32} className="text-white" />
                  </div>
                  <p className="text-white font-black text-lg uppercase tracking-tight font-['Inter']">
                    Explore More
                  </p>
                  <p className="text-zinc-400 text-xs font-medium font-['Roboto_Flex']">
                    Discover tracks for {recommendations.mood}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 mt-8">
          <div className="px-6 md:px-12 mb-8">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white font-['Inter'] uppercase">Your 2025</h2>
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

          <div className="flex overflow-x-auto gap-6 px-6 md:px-12 no-scrollbar pb-8 snap-x snap-mandatory scroll-smooth touch-pan-x">
            {/* Personalized Replay 2025 Card */}
            <div 
              onClick={() => onTrackSelect(trendingTracks[0] || MOCK_TRACKS[0])}
              className="snap-center flex-shrink-0 w-[85vw] md:w-[500px] rounded-[48px] overflow-hidden relative shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] border border-white/10 active:scale-[0.98] transition-all group cursor-pointer hover:border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 opacity-90" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-[20px] bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-xl">
                    <Play size={28} fill="white" />
                  </div>
                  <div>
                    <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] text-white font-['Inter'] uppercase mb-2">
                      Replay
                    </h3>
                    <span className="text-4xl md:text-6xl font-black tracking-tighter text-white/70 font-['Inter'] uppercase">2025</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Personalized Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-xl rounded-[24px] p-4 border border-white/20">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-1 font-['Roboto_Flex']">Total Hours</p>
                      <p className="text-3xl font-black text-white font-['Inter']">{stats.totalHours}h</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl rounded-[24px] p-4 border border-white/20">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-1 font-['Roboto_Flex']">Songs</p>
                      <p className="text-3xl font-black text-white font-['Inter']">{stats.totalTracks}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-xl rounded-[24px] p-4 border border-white/20">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-2 font-['Roboto_Flex']">Top Artist</p>
                    <p className="text-xl font-black text-white font-['Inter'] tracking-tight">{stats.topArtist}</p>
                    <p className="text-xs font-bold text-white/70 mt-1 font-['Roboto_Flex']">{stats.topGenre}</p>
                  </div>
                  
                  <button className="w-full bg-white/15 hover:bg-white/25 backdrop-blur-xl text-white py-4 rounded-[24px] font-black text-sm uppercase tracking-[0.3em] transition-all border border-white/30 font-['Roboto_Flex']">
                    View Full Replay
                  </button>
                </div>
              </div>
            </div>

            {/* Additional personalized cards could go here */}
          </div>
        </section>

        {/* Podcast Recommendations */}
        <section className="mb-20">
          <div className="px-6 md:px-12 mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white font-['Inter'] uppercase">
                Podcasts for You
              </h2>
              <button className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em] hover:text-white transition-all font-['Roboto_Flex']">
                See All
              </button>
            </div>
            <p className="text-zinc-500 text-sm md:text-base font-medium font-['Roboto_Flex']">
              Discover stories, insights, and conversations
            </p>
          </div>

          <div className="flex overflow-x-auto gap-6 px-6 md:px-12 no-scrollbar pb-8 snap-x snap-mandatory scroll-smooth touch-pan-x">
            {podcastData.map((podcast, i) => (
              <div 
                key={i}
                className="snap-start flex-shrink-0 w-[280px] md:w-[320px] group cursor-pointer"
              >
                {/* Card with full-bleed cover image */}
                <div className="relative h-[360px] md:h-[400px] rounded-[40px] overflow-hidden border border-white/20 hover:scale-[1.02] transition-all duration-500 shadow-2xl">
                  {/* Background image */}
                  <img 
                    src={podcast.cover} 
                    alt={podcast.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${podcast.color} via-black/60 to-black/40`} />
                  
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
                          onClick={() => onTrackSelect(timeBasedTracks[i] || trendingTracks[0])}
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

        <section className="mb-20">
          <div className="px-6 md:px-12 mb-10 flex items-center justify-between">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white font-['Inter'] uppercase">
              Recently Played
            </h2>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-zinc-500 text-xl font-medium font-['Roboto_Flex']">Loading tracks...</div>
            </div>
          ) : (
            <div className="flex overflow-x-auto gap-6 md:gap-8 px-6 md:px-12 no-scrollbar snap-x scroll-smooth touch-pan-x">
              {(recentlyPlayedTracks.length > 0 ? recentlyPlayedTracks : MOCK_TRACKS).map((track) => (
                <div key={track.id} className="snap-start flex-shrink-0 w-[180px] md:w-[240px] group cursor-pointer active:scale-95 transition-all">
                  <div className="relative aspect-square mb-6 rounded-[40px] overflow-hidden shadow-2xl bg-zinc-900 border border-white/5">
                    <img src={track.coverArt} alt={`${track.title} by ${track.artist} album cover`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[8px] gap-4">
                       <button onClick={(e) => { e.stopPropagation(); onTrackSelect(track); }} className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"><Play size={24} fill="currentColor" /></button>
                    </div>
                  </div>
                  <div className="space-y-2 px-2" onClick={() => onTrackSelect(track)}>
                    <h4 className="text-lg md:text-xl font-black truncate text-white tracking-tighter leading-none font-['Inter'] uppercase">{track.title}</h4>
                    <p className="text-[11px] md:text-xs text-zinc-600 font-black truncate uppercase tracking-[0.3em] font-['Roboto_Flex']">{track.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="px-6 md:px-12 pb-32">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white font-['Inter'] uppercase leading-none">Your Collection</h2>
            <button 
              onClick={() => onAddToQueue(trendingTracks[0] || MOCK_TRACKS[0])}
              className="p-3 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <Plus size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {(trendingTracks.length > 0 ? trendingTracks : MOCK_TRACKS).map(track => (
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
      </div>
    </div>
  );
};

export default HomeContent;
