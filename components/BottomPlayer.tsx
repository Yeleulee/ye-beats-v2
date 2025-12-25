
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Play, SkipForward, SkipBack, Pause, Volume2, Volume1, VolumeX, ListMusic, Activity, Video } from 'lucide-react';
import { Track, AudioMode } from '../types';

interface BottomPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  audioMode: AudioMode;
  onToggleMode: (mode: AudioMode) => void;
  onExpand: (view?: 'player' | 'queue') => void;
  progress: number;
  setProgress: (val: number) => void;
  volume: number;
  setVolume: (val: number) => void;
  isShuffle: boolean;
  setIsShuffle: (val: boolean) => void;
  repeatMode: 0 | 1 | 2;
  setRepeatMode: (val: 0 | 1 | 2) => void;
  queueCount?: number;
}

const BottomPlayer: React.FC<BottomPlayerProps> = ({ 
  currentTrack, 
  isPlaying, 
  onPlayPause, 
  onNext,
  onPrevious,
  audioMode,
  onExpand,
  progress,
  setProgress,
  volume,
  setVolume,
  queueCount = 0
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);

  const handleScrub = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = clientX - rect.left;
    const val = Math.max(0, Math.min(1, x / rect.width));
    setProgress(val);
  }, [setProgress]);

  const updateVolumeFromEvent = useCallback((clientX: number) => {
    if (!volumeRef.current) return;
    const rect = volumeRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const val = Math.max(0, Math.min(1, x / rect.width));
    setVolume(val);
  }, [setVolume]);

  const handleVolumeMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsDraggingVolume(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    updateVolumeFromEvent(clientX);
  };

  useEffect(() => {
    if (!isDraggingVolume) return;
    const handleMove = (e: MouseEvent) => updateVolumeFromEvent(e.clientX);
    const handleUp = () => setIsDraggingVolume(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [isDraggingVolume, updateVolumeFromEvent]);

  const renderVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  const renderQualityIcon = () => {
    if (audioMode === AudioMode.VIDEO) {
      return <Video size={12} className="text-red-500" />;
    }
    if (currentTrack.isLossless) {
      return <Activity size={12} className="text-emerald-500 animate-pulse" />;
    }
    return null;
  };

  return (
    <div 
      className="w-full lg:max-w-6xl xl:max-w-7xl lg:mx-auto h-[68px] md:h-[72px] bg-zinc-900/95 backdrop-blur-3xl rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-between px-3 md:px-4 select-none shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300 active:scale-[0.99] group cursor-pointer"
      onClick={(e) => {
        const isAction = (e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('.interactive-bar');
        if (!isAction) {
          onExpand('player');
        }
      }}
    >
      {/* Interactive Progress Bar Layer */}
      <div 
        ref={progressRef}
        className="interactive-bar absolute top-0 left-0 w-full h-[4px] bg-white/5 cursor-pointer hover:h-[6px] transition-all group/bar z-10"
        onClick={handleScrub}
        onMouseDown={(e) => {
          e.stopPropagation();
          const onMove = (me: MouseEvent) => {
             const rect = progressRef.current?.getBoundingClientRect();
             if (rect) {
               const val = Math.max(0, Math.min(1, (me.clientX - rect.left) / rect.width));
               setProgress(val);
             }
          };
          const onUp = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
          };
          window.addEventListener('mousemove', onMove);
          window.addEventListener('mouseup', onUp);
        }}
      >
        <div 
          className="h-full bg-red-600 transition-all duration-300 relative" 
          style={{ width: `${progress * 100}%` }} 
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 group-hover/bar:opacity-100 shadow-[0_0_12px_rgba(239,68,68,1)]" />
        </div>
      </div>

      {/* Left: Metadata */}
      <div className="flex items-center gap-4 min-w-0 pr-4">
        <div className="relative w-12 h-12 flex-shrink-0">
          <img 
            src={currentTrack.coverArt} 
            alt={currentTrack.title} 
            className="w-full h-full rounded-xl object-cover shadow-2xl border border-white/5 transition-transform group-hover:scale-105"
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-black text-[14px] text-white truncate leading-tight tracking-tight">
              {currentTrack.title}
            </h4>
            {renderQualityIcon()}
          </div>
          <p className="text-[11px] text-zinc-500 font-bold truncate tracking-tight uppercase tracking-wider">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Center/Right: Essential Controls */}
      <div className="flex items-center gap-1 md:gap-3">
        {/* Animated Queue Indicator - Now Clickable */}
        <button 
          onClick={(e) => { e.stopPropagation(); onExpand('queue'); }}
          className={`flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 text-[9px] font-black transition-all hover:bg-white/10 active:scale-90 ${queueCount > 0 ? 'text-red-600 border-red-600/20' : 'text-zinc-400'}`}
        >
          <ListMusic size={12} className={queueCount > 0 ? 'animate-pulse' : ''} />
          {queueCount}
        </button>

        {/* Desktop Mini Volume */}
        <div className="hidden md:flex items-center gap-3 pl-4 pr-6 py-2 bg-white/5 rounded-full border border-white/5 group/volume_container transition-all hover:bg-white/10">
          <button 
            onClick={(e) => { e.stopPropagation(); setVolume(volume === 0 ? 0.8 : 0); }}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            {renderVolumeIcon()}
          </button>
          <div 
            ref={volumeRef}
            onMouseDown={handleVolumeMouseDown}
            className="interactive-bar w-24 h-1.5 bg-zinc-800 rounded-full relative cursor-pointer group/vol-bar overflow-visible"
          >
            <div 
              className={`absolute left-0 top-0 h-full rounded-full transition-colors ${isDraggingVolume ? 'bg-red-600' : 'bg-zinc-400 group-hover/volume_container:bg-red-500'}`} 
              style={{ width: `${volume * 100}%` }}
            >
               <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-all ${isDraggingVolume ? 'scale-125 opacity-100' : 'scale-0 group-hover/vol-bar:scale-100 opacity-0 group-hover/vol-bar:opacity-100'}`} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onPrevious(); }}
            className="p-2.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-all active:scale-75"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onPlayPause(); }}
            className="p-3 bg-white text-black rounded-full hover:scale-110 transition-all active:scale-90 shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
          >
            {isPlaying ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" className="ml-1" />
            )}
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="p-2.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-all active:scale-75"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;
