
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Home, PlaySquare, Radio, Library, Search, Bell, Settings, Mic, Play, LogOut, User as UserIcon, CheckCircle2, Plus, Music2 } from 'lucide-react';
import { Track, AudioMode } from './types';
import { MOCK_TRACKS, MOCK_FRIENDS } from './constants';
import { searchMusic, YouTubeTrack } from './services/youtubeService';
import BottomPlayer from './components/BottomPlayer';
import NowPlaying from './components/NowPlaying';
import GreenRoom from './components/GreenRoom';
import Explore from './components/Explore';
import HomeContent from './components/HomeContent';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track>(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<AudioMode>(AudioMode.OFFICIAL);
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoOpenQueue, setAutoOpenQueue] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'new' | 'radio' | 'library' | 'search'>('home');
  
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<0 | 1 | 2>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  
  const playerRef = useRef<any>(null);

  const handleSeek = (val: number) => {
    setProgress(val);
    playerRef.current?.seekTo(val);
  };

  const [queue, setQueue] = useState<Track[]>(MOCK_TRACKS.slice(1));
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await searchMusic(query);
      const convertedResults: Track[] = results.map(ytTrack => ({
        id: ytTrack.id,
        title: ytTrack.title,
        artist: ytTrack.artist,
        album: ytTrack.album,
        coverArt: ytTrack.coverArt,
        duration: 180, // Default or fetch detail
        videoId: ytTrack.videoId,
        isLossless: false
      }));
      setSearchResults(convertedResults);
    } catch (error) {
      console.error("Search failed:", error);
      showToast("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  }, []);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
    
    const currentIndex = MOCK_TRACKS.findIndex(t => t.id === track.id);
    const newQueue = MOCK_TRACKS.slice(currentIndex + 1);
    setQueue(newQueue);
  };

  const addToQueue = (track: Track) => {
    setQueue(prev => [...prev, track]);
    showToast(`Added "${track.title}" to queue`);
  };

  const playNext = (track: Track) => {
    setQueue(prev => [track, ...prev.filter(t => t.id !== track.id)]);
    showToast(`Playing "${track.title}" next`);
  };

  const clearQueue = () => {
    setQueue([]);
    showToast("Queue cleared");
  };

  const handleNext = useCallback(() => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      const newQueue = queue.slice(1);
      setCurrentTrack(nextTrack);
      setQueue(newQueue);
    } else {
      const currentIndex = MOCK_TRACKS.findIndex(t => t.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % MOCK_TRACKS.length;
      setCurrentTrack(MOCK_TRACKS[nextIndex]);
    }
    setProgress(0);
  }, [queue, currentTrack]);

  const handlePrevious = () => {
    const currentIndex = MOCK_TRACKS.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + MOCK_TRACKS.length) % MOCK_TRACKS.length;
    const prevTrack = MOCK_TRACKS[prevIndex];
    
    setQueue([currentTrack, ...queue]);
    setCurrentTrack(prevTrack);
    setProgress(0);
  };

  const removeFromQueue = (id: string) => {
    setQueue(queue.filter(t => t.id !== id));
  };

  const handleLogin = () => {
    setUser({
      name: 'Liam Beats',
      email: 'liam@yebeats.io',
      avatar: 'https://i.pravatar.cc/150?u=ye_user'
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsPlaying(false);
  };

  const handleExpandPlayer = (view: 'player' | 'queue' = 'player') => {
    setAutoOpenQueue(view === 'queue');
    setIsExpanded(true);
  };


  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent onTrackSelect={handleTrackSelect} onAddToQueue={addToQueue} onPlayNext={playNext} onLogout={handleLogout} />;
      case 'new':
        return <Explore onPlayTrack={handleTrackSelect} />;
      case 'radio':
        return <GreenRoom />;
      case 'search':
        return (
          <div className="p-6 md:p-12 animate-in fade-in duration-700 min-h-screen bg-black">
            <div className="max-w-4xl mx-auto space-y-12 pb-32">
              <header className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-['Inter'] uppercase leading-none">
                  Search
                </h1>
                <p className="text-zinc-500 text-xl font-medium font-['Roboto_Flex'] tracking-tight">
                  Find your next favorite track
                </p>
              </header>

              <div className="relative group">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(searchQuery);
                    }
                  }}
                  placeholder="Search for artists, songs, albums..."
                  className="w-full bg-zinc-900/50 border border-white/10 px-16 py-6 rounded-[32px] text-xl text-white focus:outline-none focus:ring-2 focus:ring-red-600/40 focus:border-red-600/40 transition-all placeholder:text-zinc-700 font-['Roboto_Flex'] font-medium backdrop-blur-xl"
                />
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors" size={28} />
                {isSearching && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {searchResults.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black tracking-tight text-white font-['Inter'] uppercase">Results</h2>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {searchResults.map((track) => (
                      <div 
                        key={track.id}
                        onClick={() => handleTrackSelect(track)}
                        className="bg-zinc-900/40 hover:bg-zinc-800/60 p-5 rounded-[32px] cursor-pointer transition-all border border-white/5 group"
                      >
                        <img 
                          src={track.coverArt} 
                          alt={`${track.title} by ${track.artist}`}
                          className="w-full aspect-square rounded-[24px] mb-4 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <h3 className="font-black text-lg text-white truncate mb-1 font-['Inter'] uppercase leading-none">{track.title}</h3>
                        <p className="text-zinc-600 font-black text-xs uppercase tracking-[0.3em] truncate font-['Roboto_Flex']">{track.artist}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black tracking-tight text-white font-['Inter'] uppercase">Recent Searches</h2>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['The Weeknd', 'Blinding Lights', 'Kiss Land', 'After Hours'].map((term) => (
                      <button 
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          handleSearch(term);
                        }}
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-[20px] text-sm font-black text-zinc-400 hover:text-white hover:bg-white/10 transition-all font-['Roboto_Flex'] uppercase tracking-[0.2em]"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'library':
      default:
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
                    <div key={track.id} className="group cursor-pointer" onClick={() => handleTrackSelect(track)}>
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
                    <div key={track.id} className="group cursor-pointer" onClick={() => handleTrackSelect(track)}>
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
    }
  };

  return (
    <div className="flex h-screen w-full bg-black overflow-hidden font-sans select-none relative animate-in fade-in duration-1000">
      <div className={`fixed top-12 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 transform ${toast.visible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'}`}>
        <div className="bg-zinc-900/90 backdrop-blur-3xl border border-red-600/30 px-8 py-4 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(255,0,0,0.2)] flex items-center gap-4 min-w-[320px]">
          <CheckCircle2 className="text-red-600" size={20} />
          <span className="text-sm font-black text-white tracking-tight uppercase font-['Roboto_Flex']">{toast.message}</span>
        </div>
      </div>

      <nav className="hidden lg:flex flex-col w-[340px] flex-shrink-0 bg-gradient-to-b from-zinc-950/95 via-black/95 to-black/95 backdrop-blur-2xl border-r border-white/10 p-10 overflow-y-auto fixed left-0 top-0 bottom-0 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        {/* Logo */}
        <div className="flex items-center gap-4 mb-16 pl-2">
          <div className="relative w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-[20px] flex-shrink-0 flex items-center justify-center shadow-[0_8px_32px_rgba(255,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[20px]" />
            <div className="w-4 h-4 bg-white rounded-full animate-pulse relative z-10" />
          </div>
          <span className="text-4xl font-black tracking-tighter text-white brand-cursive drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Ye Beats</span>
        </div>

        {/* Main Navigation */}
        <div className="space-y-3 mb-8">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'new', icon: PlaySquare, label: 'Explore' },
            { id: 'radio', icon: Radio, label: 'Radio' },
            { id: 'library', icon: Library, label: 'Library' },
            { id: 'search', icon: Search, label: 'Search' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)} 
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[24px] font-black text-sm tracking-[0.1em] uppercase transition-all duration-300 relative group font-['Roboto_Flex'] ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-white/15 to-white/10 text-white shadow-[0_8px_24px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.2)] scale-[1.02] border border-white/20' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className={`transition-all duration-300 ${
                activeTab === tab.id ? 'text-white scale-110' : 'text-zinc-500 group-hover:text-white'
              }`}>
                <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} /> 
              </div>
              <span className="flex-1 text-left">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="w-2 h-2 bg-red-600 rounded-full shadow-[0_0_12px_rgba(255,0,0,0.8)] animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto space-y-6">
            {/* Audio Engine Card */}
            <div className="p-6 rounded-[32px] bg-gradient-to-br from-red-600/15 to-red-600/5 border border-red-500/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(255,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]">
                <p className="text-[10px] font-black tracking-[0.5em] text-red-400 uppercase mb-2 font-['Roboto_Flex']">Audio Engine</p>
                <h6 className="text-white font-black text-base mb-4 leading-none brand-cursive">Ye V2 Audio</h6>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-gradient-to-r from-red-600 to-red-500 w-[85%] animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
                </div>
            </div>

            {/* User Profile */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center gap-4 mb-4 p-4 rounded-[24px] hover:bg-white/5 transition-all cursor-pointer group">
                <div className="relative">
                  <img src={user?.avatar} alt="Profile" className="w-12 h-12 rounded-[18px] border-2 border-white/20 shadow-lg" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-black rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-white truncate font-['Inter'] tracking-tight group-hover:text-red-400 transition-colors">{user?.name}</p>
                  <p className="text-[10px] font-bold text-zinc-500 truncate uppercase tracking-[0.2em] font-['Roboto_Flex']">Premium</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center p-3 bg-white/5 rounded-[18px] text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-white/10">
                  <UserIcon size={20} />
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center p-4 bg-red-600/10 rounded-2xl text-red-500 hover:bg-red-600/20 transition-all"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
        </div>
      </nav>

      <main className="flex-1 h-full overflow-y-scroll bg-black relative scroll-smooth no-scrollbar touch-pan-y z-10">
        <div className="safe-bottom-mobile lg:safe-bottom-desktop">
          {renderContent()}
        </div>
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <div className="px-4 pb-4">
            <BottomPlayer 
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onPrevious={handlePrevious}
              audioMode={audioMode}
              onToggleMode={setAudioMode}
              onExpand={handleExpandPlayer}
              progress={progress}
              setProgress={handleSeek}
              volume={volume}
              setVolume={setVolume}
              isShuffle={isShuffle}
              setIsShuffle={setIsShuffle}
              repeatMode={repeatMode}
              setRepeatMode={setRepeatMode}
              queueCount={queue.length}
            />
          </div>
          
          <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-zinc-950/98 to-zinc-950/95 backdrop-blur-2xl h-[88px] border-t border-white/15 flex items-center justify-around px-2 pb-safe shadow-[0_-8px_32px_rgba(0,0,0,0.6),0_-1px_0_rgba(255,255,255,0.1)] z-50">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'new', icon: PlaySquare, label: 'Explore' },
              { id: 'radio', icon: Radio, label: 'Radio' },
              { id: 'library', icon: Library, label: 'Library' },
              { id: 'search', icon: Search, label: 'Search' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex flex-col items-center gap-1.5 min-w-[68px] py-2 active:scale-90 transition-all duration-300 relative"
              >
                <div className={`relative p-2.5 rounded-[18px] transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-br from-red-600/30 to-red-600/20 shadow-[0_4px_16px_rgba(255,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] scale-110' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}>
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[18px]" />
                  )}
                  <tab.icon 
                    className={`relative z-10 transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'text-red-500 drop-shadow-[0_2px_8px_rgba(255,0,0,0.6)]' 
                        : 'text-zinc-600'
                    }`}
                    size={22}
                    strokeWidth={activeTab === tab.id ? 2.5 : 2}
                  />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 font-['Roboto_Flex'] ${
                  activeTab === tab.id ? 'text-red-500' : 'text-zinc-600'
                }`}>
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute top-0 w-1 h-1 bg-red-500 rounded-full shadow-[0_0_8px_rgba(255,0,0,0.8)] animate-pulse" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="hidden lg:block fixed bottom-12 left-[calc(50%+170px)] -translate-x-1/2 w-[calc(100%-700px)] z-[80]">
        <BottomPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          audioMode={audioMode}
          onToggleMode={setAudioMode}
          onExpand={handleExpandPlayer}
          progress={progress}
          setProgress={handleSeek}
          volume={volume}
          setVolume={setVolume}
          isShuffle={isShuffle}
          setIsShuffle={setIsShuffle}
          repeatMode={repeatMode}
          setRepeatMode={setRepeatMode}
          queueCount={queue.length}
        />
      </div>

      {isExpanded && (
        <NowPlaying
          track={currentTrack}
          audioMode={audioMode}
          onClose={() => setIsExpanded(false)}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          progress={progress}
          setProgress={handleSeek}
          volume={volume}
          setVolume={setVolume}
          isShuffle={isShuffle}
          setIsShuffle={setIsShuffle}
          repeatMode={repeatMode}
          setRepeatMode={setRepeatMode}
          queue={queue}
          removeFromQueue={removeFromQueue}
          clearQueue={clearQueue}
          playNext={playNext}
          onJumpToTrack={(track) => {
            const index = queue.findIndex(t => t.id === track.id);
            if (index !== -1) {
              const nextQueue = queue.slice(index + 1);
              setCurrentTrack(track);
              setQueue(nextQueue);
              setProgress(0);
            }
          }}
          playbackSpeed={playbackSpeed}
          setPlaybackSpeed={setPlaybackSpeed}
          initialQueueOpen={autoOpenQueue}
        />
      )}

      {/* Hidden React Player */}
      <div className="hidden">
        <ReactPlayer
          ref={playerRef}
          url={currentTrack.videoId ? `https://www.youtube.com/watch?v=${currentTrack.videoId}` : undefined}
          playing={isPlaying}
          volume={volume}
          playbackRate={playbackSpeed}
          onProgress={({ played }) => setProgress(played)}
          onEnded={handleNext}
          width="0"
          height="0"
          config={{
            youtube: {
              playerVars: { showinfo: 0, controls: 0, autoplay: 1 }
            }
          }}
        />
      </div>
    </div>
  );
};

export default App;
