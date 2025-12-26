
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import Sidebar from './components/Sidebar';
import HomeContent from './components/HomeContent';
import NowPlaying from './components/NowPlaying';
import LandingPage from './components/LandingPage';
import SearchContent from './components/SearchContent';
import NewReleasesContent from './components/NewReleasesContent';
import RadioContent from './components/RadioContent';
import LibraryContent from './components/LibraryContent';
import { Track, AudioMode } from './types';
import { MOCK_TRACKS } from './lib/mock-data';
import YouTube from 'react-youtube';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track>(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<AudioMode>(AudioMode.OFFICIAL);
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoOpenQueue, setAutoOpenQueue] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'new' | 'radio' | 'library' | 'search'>('home');
  
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<0 | 1 | 2>(0); // 0: no repeat, 1: repeat one, 2: repeat all
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const [queue, setQueue] = useState<Track[]>(MOCK_TRACKS);
  const [originalQueue, setOriginalQueue] = useState<Track[]>(MOCK_TRACKS);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    // Firebase auth state change will handle the rest
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleTrackSelect = (track: Track, tracks: Track[] = []) => {
    setQueue(tracks.length > 0 ? tracks : [track, ...queue.filter(t => t.id !== track.id)]);
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
    setAutoOpenQueue(false); // Close queue when a new track is selected
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = useCallback(() => {
    if (queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    let nextIndex;

    if (repeatMode === 1) {
      nextIndex = currentIndex;
    } else if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (currentIndex + 1) % queue.length;
      if (repeatMode === 2 && nextIndex === 0 && currentIndex === queue.length - 1) {
        // Loop back to the start
      } else if (nextIndex === 0 && currentIndex === queue.length - 1 && repeatMode !== 2) {
        setIsPlaying(false);
        return;
      }
    }
    
    setCurrentTrack(queue[nextIndex]);
    setProgress(0);
  }, [queue, currentTrack, isShuffle, repeatMode]);

  const handlePrevious = () => {
    if (queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentTrack(queue[prevIndex]);
    setProgress(0);
  };
  
  const handlePlayerReady = (event: any) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume * 100);
    playerRef.current.setPlaybackRate(playbackSpeed);
    if (isPlaying) {
      playerRef.current.playVideo();
    }
  };

  const handlePlayerStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.ENDED) {
      handleNext();
    } 
  };

  useEffect(() => {
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(volume * 100);
    }
  }, [volume]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.setPlaybackRate) {
      playerRef.current.setPlaybackRate(playbackSpeed);
    }
  }, [playbackSpeed]);

  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    if (isPlaying && playerRef.current && playerRef.current.getDuration) {
      progressIntervalRef.current = window.setInterval(() => {
        const duration = playerRef.current.getDuration();
        const currentTime = playerRef.current.getCurrentTime();
        if (duration > 0) {
          setProgress(currentTime / duration);
        }
      }, 1000);
    } 

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying, currentTrack]);

  const handleShuffle = () => {
    const newShuffleState = !isShuffle;
    setIsShuffle(newShuffleState);
    if (newShuffleState) {
      const shuffled = [...queue].sort(() => Math.random() - 0.5);
      const currentTrackIndex = shuffled.findIndex(t => t.id === currentTrack.id);
      if (currentTrackIndex > -1) {
        // Move current track to the top
        const [track] = shuffled.splice(currentTrackIndex, 1);
        shuffled.unshift(track);
      }
      setQueue(shuffled);
    } else {
      // Return to original order, keeping current track at its position if possible
      const originalIndex = originalQueue.findIndex(t => t.id === currentTrack.id);
      if (originalIndex > -1) {
        const reordered = [...originalQueue];
        setCurrentTrack(reordered[originalIndex]);
        setQueue(reordered);
      } else {
        setQueue(originalQueue);
      }
    }
  };
  
  const addToQueue = (track: Track) => {
    if (!queue.find(t => t.id === track.id)) {
      setQueue([...queue, track]);
    }
  };

  const playNext = (track: Track) => {
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const newQueue = [...queue];
    newQueue.splice(currentIndex + 1, 0, track);
    setQueue(newQueue);
  };

  const removeFromQueue = (id: string) => {
    setQueue(queue.filter(t => t.id !== id));
  };

  const jumpToTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
  };

  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent onTrackSelect={(track, tracks) => handleTrackSelect(track, tracks)} onAddToQueue={addToQueue} onPlayNext={playNext} onLogout={handleLogout} />;
      case 'search':
        return <SearchContent onTrackSelect={handleTrackSelect} />;
      case 'new':
        return <NewReleasesContent onTrackSelect={handleTrackSelect} />;
      case 'radio':
        return <RadioContent onTrackSelect={handleTrackSelect} onAddToQueue={addToQueue} />;
      case 'library':
        return <LibraryContent onTrackSelect={handleTrackSelect} onAddToQueue={addToQueue} />;
      default:
        return null;
    }
  }

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {renderContent()}
        </div>
        {currentTrack && (
          <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${isExpanded ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}>
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
                setProgress={setProgress} // This needs careful handling
                volume={volume}
                setVolume={setVolume}
                isShuffle={isShuffle}
                setIsShuffle={handleShuffle}
                repeatMode={repeatMode}
                setRepeatMode={setRepeatMode}
                queue={queue}
                removeFromQueue={removeFromQueue}
                playNext={playNext}
                onJumpToTrack={jumpToTrack}
                playbackSpeed={playbackSpeed}
                setPlaybackSpeed={setPlaybackSpeed}
            />
          </div>
        )}
      </main>
      <YouTube 
        videoId={currentTrack?.id}
        opts={{
          height: '0',
          width: '0',
          playerVars: {
            autoplay: 1,
            controls: 0,
          },
        }}
        onReady={handlePlayerReady}
        onStateChange={handlePlayerStateChange}
        className="hidden"
      />
    </div>
  );
};

export default App;
