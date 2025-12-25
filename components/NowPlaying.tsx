

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronDown, MoreHorizontal, Share2, Loader2, Music2, Search, Activity, Video, Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Repeat1, Volume2, Volume1, VolumeX, ListMusic, X, Trash2, Zap, Gauge } from 'lucide-react';
import { Track, AudioMode } from '../types';

interface NowPlayingProps {
  track: Track;
  audioMode: AudioMode;
  onClose: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  progress: number;
  setProgress: (val: number) => void;
  volume: number;
  setVolume: (val: number) => void;
  isShuffle: boolean;
  setIsShuffle: (val: boolean) => void;
  repeatMode: 0 | 1 | 2;
  setRepeatMode: (val: 0 | 1 | 2) => void;
  queue: Track[];
  removeFromQueue: (id: string) => void;
  clearQueue: () => void;
  playNext: (track: Track) => void;
  onJumpToTrack: (track: Track) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  initialQueueOpen?: boolean;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ 
  track, 
  audioMode, 
  onClose, 
  isPlaying, 
  onPlayPause, 
  onNext,
  onPrevious,
  progress,
  setProgress,
  volume,
  setVolume,
  isShuffle,
  setIsShuffle,
  repeatMode,
  setRepeatMode,
  queue,
  removeFromQueue,
  clearQueue,
  playNext,
  onJumpToTrack,
  playbackSpeed,
  setPlaybackSpeed,
  initialQueueOpen = false
}) => {
  const [showSamples, setShowSamples] = useState(false);
  const [showQueue, setShowQueue] = useState(initialQueueOpen);
  const [samplesLoading, setSamplesLoading] = useState(false);
  const [sampleData, setSampleData] = useState<{samples: string[], sampledBy: string[]} | null>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const [isDraggingVolume, setIsDraggingVolume] = useState(false);

  // Sync volume with audio element

  const fetchSamples = async () => {
    // AI-powered sample detection has been disabled
    // This feature previously used Google AI to identify samples used in tracks
    alert('AI-powered sample detection feature has been removed. This feature previously used Google AI to analyze track samples and sample history.');
    setSamplesLoading(false);
  };

  const handleVolumeUpdate = useCallback((clientX: number) => {
    if (!volumeRef.current) return;
    const rect = volumeRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const val = Math.max(0, Math.min(1, x / rect.width));
    setVolume(val);
  }, [setVolume]);

  const handleVolumeMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDraggingVolume(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    handleVolumeUpdate(clientX);
  };

  useEffect(() => {
    if (!isDraggingVolume) return;

    const handleMouseMove = (e: MouseEvent) => handleVolumeUpdate(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleVolumeUpdate(e.touches[0].clientX);
    const handleMouseUp = () => setIsDraggingVolume(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove as any);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove as any);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDraggingVolume, handleVolumeUpdate]);

  const formatTime = (p: number) => {
    const totalSeconds = track.duration;
    const currentSeconds = Math.floor(p * totalSeconds);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const cycleRepeat = () => {
    setRepeatMode(((repeatMode + 1) % 3) as 0 | 1 | 2);
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const renderVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={28} />;
    if (volume < 0.5) return <Volume1 size={28} />;
    return <Volume2 size={28} />;
  };

  const renderQualityIcon = () => {
    if (audioMode === AudioMode.VIDEO) {
      return <Video size={32} className="text-red-600 ml-4" strokeWidth={3} />;
    }
    if (track.isLossless) {
      return <Activity size={32} className="text-emerald-500 animate-pulse ml-4" strokeWidth={3} />;
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-[100] animate-in slide-in-from-bottom duration-500 flex flex-col overflow-hidden select-none backdrop-blur-xl">
      {/* Hidden audio element for playback */}
      
      <header className="p-8 flex justify-between items-center z-10">
        <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-all active:scale-75 text-zinc-400 hover:text-white">
          <ChevronDown size={32} strokeWidth={2.5} />
        </button>
        <div className="text-center flex-1 mx-4">
          <p className="text-[10px] uppercase font-black tracking-[0.5em] text-zinc-600 mb-1 font-['Roboto_Flex']">Now Playing</p>
          <h5 className="text-sm font-bold text-zinc-400 truncate tracking-tight font-['Roboto_Flex'] uppercase">{track.album}</h5>
        </div>
        <button 
          onClick={() => setShowQueue(true)}
          className={`p-3 rounded-full transition-all active:scale-75 ${showQueue ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/10'}`}
        >
          <ListMusic size={32} />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start px-8 relative overflow-y-auto pt-8 pb-12">
        <div 
          className="absolute inset-0 opacity-40 blur-[160px] scale-150 pointer-events-none transition-all duration-1000"
          style={{ backgroundImage: `url(${track.coverArt})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />

        <div className="w-full max-w-xl flex flex-col items-center relative z-10">
          <div className="relative group w-full aspect-square mb-12 max-h-[440px]">
             <img src={track.coverArt} alt={track.title} className="w-full h-full rounded-[48px] shadow-2xl object-cover transform transition-all group-hover:scale-[1.05]" />
             {track.isLossless && audioMode === AudioMode.OFFICIAL && (
               <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-3xl border border-white/20 px-5 py-2.5 rounded-[24px] flex flex-col items-end">
                  <div className="flex items-center gap-2 text-white font-black text-[10px] tracking-[0.5em] font-['Roboto_Flex']">
                    LOSSLESS
                  </div>
               </div>
             )}
          </div>

          <div className="w-full flex items-center justify-between mb-10 px-2">
            <div className="flex flex-col items-start min-w-0 pr-8 w-full">
              <div className="flex items-center w-full min-w-0">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-2 leading-[0.9] text-white font-['Inter'] uppercase line-clamp-2 text-left">{track.title}</h2>
                {renderQualityIcon()}
              </div>
              <p className="text-xl md:text-2xl text-zinc-500 font-bold tracking-tight font-['Roboto_Flex'] brand-cursive">{track.artist}</p>
            </div>
            <button className="p-4 bg-white/5 rounded-[24px] text-zinc-400 hover:text-white transition-all shadow-xl flex-shrink-0">
              <Share2 size={24} />
            </button>
          </div>

          <div className="w-full space-y-3 px-2 mb-6">
            {/* Interactive Progress Bar */}
            <div 
              className="relative h-3 cursor-pointer group py-4"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = x / rect.width;
                setProgress(Math.max(0, Math.min(1, percent)));
              }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 w-full h-3 bg-white/10 rounded-full border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all relative shadow-[0_0_12px_rgba(255,0,0,0.4)]" 
                  style={{ width: `${progress * 100}%` }}
                >
                  {/* Draggable thumb */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.4),0_0_0_2px_rgba(255,0,0,0.3)] transition-transform group-hover:scale-125 border-2 border-red-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between text-[10px] font-black text-zinc-600 tracking-[0.4em] uppercase font-['Roboto_Flex']">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(1)}</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between max-w-lg mx-auto mb-6 gap-4">
            <button onClick={() => setIsShuffle(!isShuffle)} className={`p-3 ${isShuffle ? 'text-red-600' : 'text-zinc-600 hover:text-white'}`}>
              <Shuffle size={24} />
            </button>
            <button onClick={onPrevious} className="text-white hover:text-zinc-400 p-3 active:scale-75"><SkipBack size={32} fill="currentColor" /></button>
            <button onClick={onPlayPause} className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-90 transition-all shadow-xl">
              {isPlaying ? <Pause className="text-black" fill="black" size={32} /> : <Play className="text-black ml-1" fill="black" size={32} />}
            </button>
            <button onClick={onNext} className="text-white hover:text-zinc-400 p-3 active:scale-75"><SkipForward size={32} fill="currentColor" /></button>
            <button onClick={cycleRepeat} className={`p-3 ${repeatMode > 0 ? 'text-red-600' : 'text-zinc-600 hover:text-white'}`}>
              {repeatMode === 2 ? <Repeat1 size={24} /> : <Repeat size={24} />}
            </button>
          </div>

          {/* Volume and Speed Controls - Combined Row */}
          <div className="w-full max-w-lg mx-auto flex items-center gap-6">
             {/* Volume Control */}
             <div className="flex items-center gap-3 flex-1">
                <button 
                  onClick={() => setVolume(volume === 0 ? 0.8 : 0)} 
                  className="text-zinc-400 hover:text-white transition-colors active:scale-90 p-2 hover:bg-white/10 rounded-full flex-shrink-0"
                >
                  {renderVolumeIcon()}
                </button>
                
                <div className="flex-1 flex items-center gap-3">
                  <div 
                    ref={volumeRef} 
                    onMouseDown={handleVolumeMouseDown}
                    onTouchStart={handleVolumeMouseDown}
                    className="relative flex-1 h-3 cursor-pointer touch-none group py-3"
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 w-full h-3 bg-white/10 rounded-full border border-white/5">
                      <div 
                        className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all relative shadow-[0_0_12px_rgba(255,0,0,0.4)]" 
                        style={{ width: `${volume * 100}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.4),0_0_0_2px_rgba(255,0,0,0.3)] transition-transform group-hover:scale-125 group-active:scale-110 border-2 border-red-500">
                          <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <span className="text-xs font-black text-zinc-400 w-10 text-right tabular-nums font-['Roboto_Flex']">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
             </div>

             {/* Speed Control */}
             <button onClick={cycleSpeed} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all group flex-shrink-0">
                <span className="text-[10px] font-black tracking-wider uppercase font-['Roboto_Flex'] text-zinc-400 group-hover:text-white transition-colors">
                  {playbackSpeed}x
                </span>
                <Gauge size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
             </button>
          </div>

        </div>
      </main>

      {showQueue && (
        <div className="absolute inset-0 bg-black/98 backdrop-blur-[60px] z-[110] p-10 pt-28 animate-in fade-in slide-in-from-bottom-12 duration-500 overflow-y-auto no-scrollbar">
          <button onClick={() => setShowQueue(false)} className="absolute top-10 left-10 p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all text-zinc-400">
            <ChevronDown size={32} strokeWidth={2.5} />
          </button>
          
          <div className="max-w-3xl mx-auto space-y-16">
            <div className="space-y-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter flex items-center gap-6 text-white font-['Inter'] uppercase leading-none">
                  Up Next
                </h2>
                <p className="text-zinc-600 font-bold text-xl leading-relaxed tracking-tight mt-2 font-['Roboto_Flex'] brand-cursive">Manage your sonic timeline.</p>
              </div>
            </div>

            <div className="space-y-16 pb-24">
              <section>
                <div className="flex items-center gap-6 mb-8">
                  <label className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.6em] font-['Roboto_Flex']">Resonance Active</label>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="bg-white/5 p-8 rounded-[40px] flex items-center justify-between border border-red-500/20 shadow-xl">
                  <div className="flex items-center gap-6">
                    <img src={track.coverArt} className="w-16 h-16 rounded-[24px] object-cover shadow-2xl" />
                    <div>
                      <span className="font-black block text-2xl text-white tracking-tight leading-none font-['Inter'] uppercase">{track.title}</span>
                      <span className="text-[10px] text-red-500 font-black uppercase tracking-[0.4em] mt-2 block font-['Roboto_Flex']">Frequency 001</span>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-6 mb-8">
                  <label className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.6em] font-['Roboto_Flex']">Future Tracks ({queue.length})</label>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="space-y-4">
                  {queue.map((t) => (
                    <div key={t.id} className="bg-white/[0.02] p-8 rounded-[40px] flex items-center justify-between group cursor-pointer hover:bg-white/[0.06] transition-all border border-white/5">
                      <div className="flex items-center gap-6 flex-1 min-w-0" onClick={() => onJumpToTrack(t)}>
                        <img src={t.coverArt} className="w-16 h-16 rounded-[24px] object-cover shadow-2xl" />
                        <div className="truncate">
                          <span className="font-black block text-2xl text-white tracking-tight leading-none font-['Inter'] uppercase truncate">{t.title}</span>
                          <span className="text-[11px] text-zinc-600 font-black uppercase tracking-[0.4em] mt-2 block font-['Roboto_Flex'] truncate">{t.artist}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={(e) => { e.stopPropagation(); playNext(t); }} className="p-3 text-zinc-700 hover:text-emerald-500 transition-colors opacity-0 group-hover:opacity-100"><Zap size={24} /></button>
                        <button onClick={(e) => { e.stopPropagation(); removeFromQueue(t.id); }} className="p-3 text-zinc-700 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"><X size={24} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NowPlaying;
