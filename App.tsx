
import React, { useState, useEffect, useCallback } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, signInWithGoogle } from './services/firebase';
import HomeContent from './components/HomeContent';
import NowPlaying from './components/NowPlaying';
import LandingPage from './components/LandingPage';
import { Track } from './types';
import { MOCK_TRACKS } from './lib/mock-data';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
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

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleTrackSelect = (track: Track, tracks: Track[] = []) => {
    if (tracks.length > 0) {
      setQueue(tracks);
      setOriginalQueue(tracks);
    } else if (!queue.some(t => t.id === track.id)) {
      const newQueue = [track, ...queue];
      setQueue(newQueue);
      setOriginalQueue(newQueue);
    }
    setCurrentTrack(track);
    setIsExpanded(true);
  };

  const handleNext = useCallback(() => {
    if (!currentTrack) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentTrack(queue[nextIndex]);
  }, [queue, currentTrack]);

  const handlePrevious = () => {
    if (!currentTrack) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentTrack(queue[prevIndex]);
  };
  
  const addToQueue = (track: Track) => {
    if (!queue.find(t => t.id === track.id)) {
      const newQueue = [...queue, track];
      setQueue(newQueue);
      if (!isShuffle) {
        setOriginalQueue(newQueue);
      }
    }
  };

  const playNext = (track: Track) => {
    if (!currentTrack) {
      handleTrackSelect(track, [track]);
      return;
    }
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const newQueue = [...queue];
    newQueue.splice(currentIndex + 1, 0, track);
    setQueue(newQueue);
    if (!isShuffle) {
      setOriginalQueue(newQueue);
    }
  };

  const removeFromQueue = (id: string) => {
    if (currentTrack?.id === id) {
      handleNext();
    }
    const newQueue = queue.filter(t => t.id !== id);
    setQueue(newQueue);
    if (!isShuffle) {
      setOriginalQueue(newQueue);
    }
  };

  const jumpToTrack = (track: Track) => {
    setCurrentTrack(track);
  };

  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      <main className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <HomeContent onTrackSelect={handleTrackSelect} onAddToQueue={addToQueue} onPlayNext={playNext} onLogout={handleLogout} />
        </div>
        {currentTrack && isExpanded && (
          <NowPlaying 
              track={currentTrack} 
              onClose={() => setIsExpanded(false)}
              queue={queue}
              removeFromQueue={removeFromQueue}
              onJumpToTrack={jumpToTrack}
              onNext={handleNext}
              onPrevious={handlePrevious}
          />
        )}
      </main>
    </div>
  );
};

export default App;
