
import React, { useState, useRef, useCallback, useEffect, memo } from 'react';
import {
  ChevronDown, MoreHorizontal, Share2, Music2, Video, Play, Pause, SkipBack, SkipForward, Repeat,
  Shuffle, Repeat1, Volume2, Volume1, VolumeX, ListMusic, X, Zap, Gauge, Radio, Airplay
} from 'lucide-react';
import { Track, AudioMode } from '../types';
import { cn } from '../lib/utils';

interface NowPlayingProps {
  track: Track;
  audioMode: AudioMode;
  onToggleMode: (mode: AudioMode) => void; 
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
  playNext: (track: Track) => void;
  onJumpToTrack: (track: Track) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
}

const QueueItem = memo<{
    track: Track, 
    onPlay: () => void, 
    onRemove: () => void, 
    isPlaying: boolean
}>(({ track, onPlay, onRemove, isPlaying }) => {
    return (
        <div
            className={cn(
                "flex items-center gap-4 p-3 rounded-lg transition-colors group cursor-pointer",
                isPlaying ? "bg-red-600/10" : "hover:bg-white/5"
            )}
            onClick={onPlay}
        >
            <img src={track.coverArt} className="w-12 h-12 rounded-md object-cover" alt={track.title} />
            <div className="flex-1 min-w-0">
                <p className={cn("font-bold truncate", isPlaying ? "text-red-400" : "text-white")}>{track.title}</p>
                <p className="text-xs text-zinc-400 truncate">{track.artist}</p>
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onRemove(); }}
                className="p-2 text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <X size={16} />
            </button>
        </div>
    );
});

const NowPlaying: React.FC<NowPlayingProps> = ({
  track,
  audioMode,
  onToggleMode,
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
  onJumpToTrack,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const handleScrub = useCallback((e: React.MouseEvent) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, x / rect.width));
    setProgress(newProgress);
  }, [setProgress]);
  
  const handleVolumeScrub = useCallback((e: React.MouseEvent) => {
    if(!volumeRef.current) return;
    const rect = volumeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, x / rect.width));
    setVolume(newVolume);
  }, [setVolume]);

  const formatTime = useCallback((p: number) => {
    const totalSeconds = track.duration;
    const currentSeconds = Math.floor(p * totalSeconds);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, [track.duration]);

  const cycleRepeat = useCallback(() => {
    setRepeatMode(((repeatMode + 1) % 3) as 0 | 1 | 2);
  }, [repeatMode, setRepeatMode]);
  
  const renderVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] animate-in slide-in-from-bottom-4 duration-500 flex flex-col font-['Inter']">
      <div
        className="absolute inset-0 opacity-20 blur-[100px] scale-110"
        style={{ backgroundImage: `url(${track.coverArt})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      <div className="relative w-full h-full flex flex-col lg:flex-row p-4 lg:p-6 gap-4 lg:gap-6">
        
        <button onClick={onClose} className="absolute top-4 right-4 lg:top-6 lg:right-8 z-20 p-2 bg-black/30 hover:bg-white/20 rounded-full transition-all">
          <ChevronDown size={24} className="text-white" />
        </button>

        <div className="w-full lg:w-[calc(50%-0.75rem)] h-1/2 lg:h-full flex flex-col items-center justify-center bg-black/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="aspect-video w-full max-w-2xl relative">
                {audioMode === AudioMode.VIDEO ? (
                    <p className="text-white">Video Player would be here</p>
                ) : (
                    <img src={track.coverArt} alt={track.title} className="w-full h-full object-contain rounded-lg shadow-2xl" />
                )}
            </div>
             <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-black/40 border border-white/10 p-2">
                <button
                    onClick={() => onToggleMode(AudioMode.OFFICIAL)}
                    className={cn(
                        "px-4 py-2 rounded-full text-xs font-bold transition-colors",
                        audioMode === AudioMode.OFFICIAL ? 'bg-red-600 text-white' : 'text-zinc-300 hover:bg-white/10'
                    )}
                >
                    <Music2 size={16} />
                </button>
                <button
                    onClick={() => onToggleMode(AudioMode.VIDEO)}
                    className={cn(
                        "px-4 py-2 rounded-full text-xs font-bold transition-colors",
                        audioMode === AudioMode.VIDEO ? 'bg-red-600 text-white' : 'text-zinc-300 hover:bg-white/10'
                    )}
                >
                    <Video size={16} />
                </button>
            </div>
        </div>

        <div className="w-full lg:w-[calc(50%+0.75rem)] h-1/2 lg:h-full flex flex-col bg-black/20 rounded-2xl p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="text-3xl lg:text-5xl font-black text-white truncate uppercase tracking-tighter">{track.title}</h1>
                <p className="text-lg lg:text-xl text-zinc-400 font-bold brand-cursive">{track.artist}</p>
            </div>

            <div className="w-full space-y-2 mb-4">
                <div 
                    ref={progressRef}
                    onClick={handleScrub}
                    className="h-2 bg-white/10 rounded-full cursor-pointer group"
                >
                    <div 
                        className="h-full bg-red-600 rounded-full relative" 
                        style={{ width: `${progress * 100}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(1)}</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 my-4">
                 <button onClick={() => setIsShuffle(!isShuffle)} className={cn('p-3 text-zinc-400 hover:text-white', isShuffle && 'text-red-500')}>
                    <Shuffle size={20} />
                </button>
                <button onClick={onPrevious} className="p-3 text-white"><SkipBack size={32} fill="currentColor" /></button>
                <button onClick={onPlayPause} className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={onNext} className="p-3 text-white"><SkipForward size={32} fill="currentColor" /></button>
                <button onClick={cycleRepeat} className={cn('p-3 text-zinc-400 hover:text-white', repeatMode > 0 && 'text-red-500')}>
                    {repeatMode === 2 ? <Repeat1 size={20} /> : <Repeat size={20} />}
                </button>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 flex-1">
                    <button onClick={() => setVolume(volume > 0 ? 0 : 0.8)} className="text-zinc-400 hover:text-white">{renderVolumeIcon()}</button>
                    <div
                        ref={volumeRef}
                        onClick={handleVolumeScrub}
                        className="h-1.5 flex-1 bg-white/10 rounded-full cursor-pointer group"
                    >
                        <div className="h-full bg-white rounded-full relative" style={{width: `${volume * 100}%`}}>
                             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
                 <button onClick={() => {}} className="p-2 text-zinc-400 hover:text-white"><Airplay size={20} /></button>
            </div>
            
            <div className="mt-8 flex-1 overflow-y-auto pr-2 -mr-2">
                <h3 className="text-sm font-bold uppercase text-zinc-400 tracking-widest mb-4">Up Next</h3>
                <div className="space-y-2">
                    {queue.map(t => (
                        <QueueItem
                            key={t.id}
                            track={t}
                            onPlay={() => onJumpToTrack(t)}
                            onRemove={() => removeFromQueue(t.id)}
                            isPlaying={false} /* This would need to be dynamic based on if it's the currently playing track in a playlist context */
                        />
                    ))}
                    {queue.length === 0 && (
                        <p className="text-zinc-500 text-sm text-center py-4">Queue is empty.</p>
                    )}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default memo(NowPlaying);
