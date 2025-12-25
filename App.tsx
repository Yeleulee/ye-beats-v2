 
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Home, PlaySquare, Library, Search, CheckCircle2, Music } from 'lucide-react';
import { Track, AudioMode } from './types';
import { MOCK_TRACKS } from './constants';
import BottomPlayer from './components/BottomPlayer';
import NowPlaying from './components/NowPlaying';
import Explore from './components/Explore';
import HomeContent from './components/HomeContent';
import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';
import LibraryPage from './components/LibraryPage';
import TheCrate from './components/TheCrate';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track>(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<AudioMode>(AudioMode.OFFICIAL);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'crate' | 'library' | 'search'>('home');
  
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<0 | 1 | 2>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  
  const playerRef = useRef<any>(null);

  const [queue, setQueue] = useState<Track[]>(MOCK_TRACKS.slice(1));
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  }, []);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
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
    setCurrentTrack(MOCK_TRACKS[prevIndex]);
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

  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent onPlayTrack={handleTrackSelect} />;
      case 'explore':
        return <Explore onPlayTrack={handleTrackSelect} />;
      case 'crate':
        return <TheCrate onPlayTrack={handleTrackSelect} />;
      case 'search':
        return <SearchPage onTrackSelect={handleTrackSelect} />;
      case 'library':
      default:
        return <LibraryPage onPlayTrack={handleTrackSelect} />;
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

      <nav className="hidden lg:flex flex-col w-[240px] flex-shrink-0 bg-gradient-to-b from-zinc-950/95 via-black/95 to-black/95 backdrop-blur-2xl border-r border-white/10 p-6 overflow-y-auto fixed left-0 top-0 bottom-0 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <div className="space-y-2 mb-6">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'explore', icon: PlaySquare, label: 'Explore' },
            { id: 'crate', icon: Music, label: 'The Crate' },
            { id: 'library', icon: Library, label: 'Library' },
            { id: 'search', icon: Search, label: 'Search' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-[18px] font-black text-xs tracking-[0.05em] uppercase transition-all duration-300 relative group font-['Roboto_Flex'] ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-white/10 to-white/5 text-white shadow-[0_4px_12px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.15)] scale-[1.01] border border-white/20' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className={`transition-all duration-300 ${
                activeTab === tab.id ? 'text-white scale-110' : 'text-zinc-500 group-hover:text-white'
              }`}>
                <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} /> 
              </div>
              <span className="flex-1 text-left">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_8px_rgba(255,0,0,0.8)] animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </nav>
      
      {isExpanded && (
        <NowPlaying
          track={currentTrack}
          audioMode={audioMode}
          onToggleMode={setAudioMode}
          onClose={() => setIsExpanded(false)}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          progress={progress}
          volume={volume}
          setVolume={setVolume}
          isShuffle={isShuffle}
          setIsShuffle={setIsShuffle}
          repeatMode={repeatMode}
          setRepeatMode={setRepeatMode}
          queue={queue}
          removeFromQueue={removeFromQueue}
          playNext={(track) => setQueue(prev => [track, ...prev.filter(t => t.id !== track.id)])}
          onJumpToTrack={(track) => {
            setCurrentTrack(track);
            setQueue(prev => prev.filter(t => t.id !== track.id));
          }}
          playbackSpeed={playbackSpeed}
          setPlaybackSpeed={setPlaybackSpeed}
        />
      )}

      <div className="fixed bottom-0 left-[-1000px] w-[200px] h-[200px] opacity-0 pointer-events-none overflow-hidden z-[-1]">
        <ReactPlayer
          ref={playerRef}
          url={currentTrack.videoId ? `https://www.youtube.com/watch?v=${currentTrack.videoId}` : undefined}
          playing={isPlaying}
          volume={volume}
          playbackRate={playbackSpeed}
          onProgress={(state: any) => setProgress(state.played)}
          onEnded={handleNext}
          onError={(e) => console.error("YouTube Player Error:", e)}
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: { 
                showinfo: 0, 
                controls: 0, 
                autoplay: 1,
                playsinline: 1,
                origin: window.location.origin,
                enablejsapi: 1
              }
            }
          } as any}
        />
      </div>
    </div>
  );
};

export default App;
