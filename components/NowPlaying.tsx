
import React, { useState, useRef, useCallback, useEffect, memo } from 'react';
import ReactPlayer from 'react-player/youtube';
import {
  ChevronDown, MoreHorizontal, Share2, Music2, Video, Play, Pause, SkipBack, SkipForward, Repeat,
  Shuffle, Repeat1, Volume2, Volume1, VolumeX, ListMusic, X, Zap, Gauge, Radio, Airplay
} from 'lucide-react';
import { Track, AudioMode } from '../types';
import { cn } from '../lib/utils';
import UpNext from './now-playing/UpNext';

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
  volume,
  setVolume,
  isShuffle,
  setIsShuffle,
  repeatMode,
  setRepeatMode,
  queue,
  onJumpToTrack,
}) => {
  const volumeRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<ReactPlayer>(null);

  // Sync video player progress with main audio progress
  useEffect(() => {
    if (audioMode === AudioMode.VIDEO && videoPlayerRef.current) {
        const videoCurrentTime = videoPlayerRef.current.getCurrentTime();
        const audioCurrentTime = progress * track.duration;
        // Sync if the difference is more than 2 seconds
        if (Math.abs(videoCurrentTime - audioCurrentTime) > 2) {
            videoPlayerRef.current.seekTo(audioCurrentTime, 'seconds');
        }
    }
  }, [progress, audioMode, track.duration]);

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
        
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 rounded-full bg-black/40 border border-white/10 p-1">
                <button
                    onClick={() => onToggleMode(AudioMode.OFFICIAL)}
                    className={cn(
                        "px-6 py-2 rounded-full text-xs font-bold transition-colors",
                        audioMode === AudioMode.OFFICIAL ? 'bg-white text-black' : 'text-zinc-300 hover:bg-white/10'
                    )}
                >
                    Song
                </button>
                <button
                    onClick={() => onToggleMode(AudioMode.VIDEO)}
                    className={cn(
                        "px-6 py-2 rounded-full text-xs font-bold transition-colors",
                        audioMode === AudioMode.VIDEO ? 'bg-white text-black' : 'text-zinc-300 hover:bg-white/10'
                    )}
                >
                    Video
                </button>
            </div>
        </div>
        
        <button onClick={onClose} className="absolute top-4 right-4 lg:top-6 lg:right-8 z-20 p-2 bg-black/30 hover:bg-white/20 rounded-full transition-all">
          <ChevronDown size={24} className="text-white" />
        </button>

        <div className="w-full lg:w-[calc(50%-0.75rem)] h-1/2 lg:h-full flex flex-col items-center justify-center bg-black/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="aspect-video w-full max-w-2xl relative">
                <div className={cn("w-full h-full transition-opacity duration-500", audioMode === AudioMode.VIDEO ? "opacity-100" : "opacity-0")}>
                    {track.videoId && (
                        <ReactPlayer
                            ref={videoPlayerRef}
                            url={`https://www.youtube.com/watch?v=${track.videoId}`}
                            playing={isPlaying}
                            muted={true}
                            width="100%"
                            height="100%"
                            className="w-full h-full rounded-lg shadow-2xl overflow-hidden"
                            progressInterval={1000}
                            config={{
                                youtube: {
                                    playerVars: {
                                        controls: 0,
                                        disablekb: 1,
                                        modestbranding: 1,
                                        playsinline: 1,
                                    }
                                }
                            }}
                        />
                    )}
                </div>
                <div className={cn("absolute inset-0 transition-opacity duration-500", audioMode === AudioMode.OFFICIAL ? "opacity-100" : "opacity-0 pointer-events-none")}>
                    <img src={track.coverArt} alt={track.title} className="w-full h-full object-contain rounded-lg shadow-2xl" />
                </div>
            </div>
        </div>

        <div className="w-full lg:w-[calc(50%+0.75rem)] h-1/2 lg:h-full flex flex-col bg-black/20 rounded-2xl p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="text-3xl lg:text-5xl font-black text-white truncate uppercase tracking-tighter">{track.title}</h1>
                <p className="text-lg lg:text-xl text-zinc-400 font-bold brand-cursive">{track.artist}</p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(1)}</span>
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
            
            <UpNext queue={queue} currentTrackId={track.id} onJumpToTrack={onJumpToTrack} />

        </div>
      </div>
    </div>
  );
};

export default memo(NowPlaying);
