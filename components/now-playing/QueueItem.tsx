
import React, { memo } from 'react';
import { cn } from '../../lib/utils';
import { Track } from '../../types';

interface QueueItemProps {
    track: Track;
    onPlay: () => void;
    isActive: boolean;
}

const QueueItem: React.FC<QueueItemProps> = ({ track, onPlay, isActive }) => {
    return (
        <div 
            className={cn(
                "flex-shrink-0 w-32 text-center cursor-pointer group",
                isActive && "font-bold"
            )}
            onClick={onPlay}
        >
            <div className="relative mb-2">
                <img 
                    src={track.coverArt} 
                    alt={track.title} 
                    className={cn(
                        "w-full h-32 object-cover rounded-lg shadow-md transition-all",
                        isActive ? "border-2 border-red-500" : "border-2 border-transparent group-hover:scale-105"
                    )} 
                />
            </div>
            <p className={cn("text-xs truncate", isActive ? "text-white" : "text-zinc-400 group-hover:text-white")}>{track.title}</p>
            <p className={cn("text-xs truncate", isActive ? "text-zinc-300" : "text-zinc-500 group-hover:text-zinc-400")}>{track.artist}</p>
        </div>
    );
};

export default memo(QueueItem);
