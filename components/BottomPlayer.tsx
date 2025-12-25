
import React, { useRef, useCallback, useState, useEffect, memo } from 'react';
import {
    Play, SkipForward, SkipBack, Pause, Volume2, Volume1, VolumeX, Music2, Video, ChevronUp
} from 'lucide-react';
import { Track, AudioMode } from '../types';
import { cn } from '../lib/utils';

interface BottomPlayerProps {
    currentTrack: Track;
    isPlaying: boolean;
    onPlayPause: () => void;
    onNext: () => void;
    onPrevious: () => void;
    audioMode: AudioMode;
    onToggleMode: (mode: AudioMode) => void;
    onExpand: () => void;
    progress: number;
    volume: number;
    setVolume: (val: number) => void;
}

const BottomPlayer: React.FC<BottomPlayerProps> = ({
    currentTrack,
    isPlaying,
    onPlayPause,
    onNext,
    onPrevious,
    audioMode,
    onToggleMode,
    onExpand,
    progress,
    volume,
    setVolume,
}) => {
    const progressRef = useRef<HTMLDivElement>(null);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [scrubProgress, setScrubProgress] = useState(0);

    const handleScrub = useCallback((clientX: number) => {
        if (!progressRef.current) return;
        const rect = progressRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const newProgress = Math.max(0, Math.min(1, x / rect.width));
        setScrubProgress(newProgress);
    }, []);

    const handleScrubMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsScrubbing(true);
        handleScrub(e.clientX);
    }, [handleScrub]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isScrubbing) handleScrub(e.clientX);
        };
        const handleMouseUp = () => {
            if (isScrubbing) setIsScrubbing(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isScrubbing, handleScrub]);

    const displayProgress = isScrubbing ? scrubProgress : progress;

    const renderVolumeIcon = useCallback(() => {
        if (volume === 0) return <VolumeX size={20} />;
        if (volume < 0.5) return <Volume1 size={20} />;
        return <Volume2 size={20} />;
    }, [volume]);

    const handleOfficialModeClick = useCallback(() => onToggleMode(AudioMode.OFFICIAL), [onToggleMode]);
    const handleVideoModeClick = useCallback(() => onToggleMode(AudioMode.VIDEO), [onToggleMode]);
    const handleVolumeMute = useCallback(() => setVolume(volume > 0 ? 0 : 0.8), [volume, setVolume]);

    return (
        <div className="w-full lg:max-w-4xl xl:max-w-5xl lg:mx-auto h-[64px] md:h-[72px] bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-between px-3 md:px-4 select-none shadow-2xl shadow-black/50 relative overflow-hidden font-['Inter']">
            <div
                ref={progressRef}
                className="absolute top-0 left-0 w-full h-[3px] cursor-pointer group bg-white/10"
                onMouseDown={handleScrubMouseDown}
            >
                <div
                    className="h-full bg-red-600 relative transition-all duration-150"
                    style={{ width: `${displayProgress * 100}%` }}
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>

            <div className="flex items-center gap-3 min-w-0 flex-1">
                <img
                    src={currentTrack.coverArt}
                    alt={currentTrack.title}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover shadow-lg cursor-pointer"
                    onClick={onExpand}
                />
                <div className="min-w-0">
                    <h4 className="font-bold text-sm text-white truncate">{currentTrack.title}</h4>
                    <p className="text-xs text-zinc-400 truncate">{currentTrack.artist}</p>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2">
                <button onClick={onPrevious} className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full">
                    <SkipBack size={20} fill="currentColor" />
                </button>
                <button
                    onClick={onPlayPause}
                    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                >
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={onNext} className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full">
                    <SkipForward size={20} fill="currentColor" />
                </button>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={handleOfficialModeClick}
                        className={cn("p-2 rounded-full transition-colors", audioMode === AudioMode.OFFICIAL ? 'bg-red-600/30 text-red-400' : 'text-zinc-500 hover:text-white')}
                    >
                        <Music2 size={16} />
                    </button>
                     <button
                        onClick={handleVideoModeClick}
                        className={cn("p-2 rounded-full transition-colors", audioMode === AudioMode.VIDEO ? 'bg-red-600/30 text-red-400' : 'text-zinc-500 hover:text-white')}
                    >
                        <Video size={16} />
                    </button>
                </div>
                
                <div className="hidden lg:flex items-center gap-2 w-28">
                    <button onClick={handleVolumeMute} className="text-zinc-400 hover:text-white">{renderVolumeIcon()}</button>
                    <div className="h-1 flex-1 bg-white/10 rounded-full cursor-pointer">
                        <div className="h-full bg-white rounded-full" style={{width: `${volume * 100}%`}} />
                    </div>
                </div>

                <button onClick={onExpand} className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full">
                    <ChevronUp size={20} />
                </button>
            </div>
        </div>
    );
};

export default memo(BottomPlayer);
