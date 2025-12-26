
import React, { memo, useCallback, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import {
  Airplay, ChevronDown, ListMusic, MoreHorizontal, Music2, Pause, Play, Repeat, Repeat1, Share2, Shuffle, SkipBack, SkipForward, Video, Volume1, Volume2, VolumeX, X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { AudioMode, Track } from '../types';

interface NowPlayingProps {
  track: Track;
  onClose: () => void;
  queue: Track[];
  onJumpToTrack: (track: Track) => void;
  onNext: () => void;
  onPrevious: () => void;
  removeFromQueue: (id: string) => void;
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
  onClose,
  queue,
  onJumpToTrack,
  onNext,
  onPrevious,
  removeFromQueue
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioMode, setAudioMode] = useState<AudioMode>(AudioMode.OFFICIAL);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<0 | 1 | 2>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleScrub = useCallback((e: React.MouseEvent) => {
    if (!progressRef.current || !playerRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, x / rect.width));
    playerRef.current.seekTo(newProgress * track.duration);
    setProgress(newProgress);
  }, [track.duration]);
  
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
      onNext();
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
    if (isPlaying && playerRef.current && typeof playerRef.current.getDuration === 'function') {
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
    if (!playerRef.current || typeof playerRef.current.playVideo !== 'function') return;
    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying, track]);

  return (
    <div className="fixed inset-0 bg-black z-[100] animate-in slide-in-from-bottom-4 duration-500 flex flex-col font-['Inter']">
       <div className="hidden">
        <YouTube 
          videoId={track?.id}
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
          key={track?.id}
        />
      </div>
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
            <div className={cn("absolute top-6 left-6 flex items-center gap-2 rounded-full bg-black/40 border-white/10 p-2 z-10", audioMode === AudioMode.VIDEO && "bg-transparent border-none")}>
                <button
                    onClick={() => setAudioMode(AudioMode.OFFICIAL)}
                    className={cn(
                        "px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2",
                        audioMode === AudioMode.OFFICIAL ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-300 hover:bg-white/10'
                    )}
                >
                    <Music2 size={14} />
                    <span>Music</span>
                </button>
                <button
                    onClick={() => setAudioMode(AudioMode.VIDEO)}
                    className={cn(
                        "px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2",
                        audioMode === AudioMode.VIDEO ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-300 hover:bg-white/10'
                    )}
                >
                    <Video size={14} />
                    <span>Video</span>
                </button>
            </div>
            <div className="aspect-video w-full max-w-2xl relative">
                 <div className={cn("w-full h-full transition-opacity duration-500", audioMode === AudioMode.OFFICIAL ? 'opacity-100' : 'opacity-0')}>
                    <img src={track.coverArt} alt={track.title} className="w-full h-full object-contain rounded-lg shadow-2xl" />
                </div>
                <div className={cn("absolute inset-0 w-full h-full transition-opacity duration-500", audioMode === AudioMode.VIDEO ? 'opacity-100' : 'opacity-0')}>
                   <YouTube videoId={track.id} className="w-full h-full" opts={{ width: '100%', height: '100%', playerVars: { autoplay: 1 } }} />
                </div>
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
                <button onClick={handlePlayPause} className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
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
                            isPlaying={t.id === track.id && isPlaying}
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
