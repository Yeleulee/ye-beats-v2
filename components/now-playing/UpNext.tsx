
import React, { memo, useRef, useEffect } from 'react';
import { Track } from '../../types';
import QueueItem from './QueueItem';

interface UpNextProps {
    queue: Track[];
    currentTrackId: string;
    onJumpToTrack: (track: Track) => void;
}

const UpNext: React.FC<UpNextProps> = ({ queue, currentTrackId, onJumpToTrack }) => {
    const activeItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeItemRef.current) {
            activeItemRef.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    }, [currentTrackId]);

    if (queue.length === 0) {
        return <p className="text-zinc-500 text-sm text-center py-4">Queue is empty.</p>;
    }

    return (
        <div className="mt-6">
            <h3 className="text-sm font-bold uppercase text-zinc-400 tracking-widest mb-4">Up Next</h3>
            <div className="flex items-start gap-4 overflow-x-auto pb-4 -mx-6 px-6">
                {queue.map(track => (
                    <div ref={track.id === currentTrackId ? activeItemRef : null}>
                        <QueueItem
                            key={track.id}
                            track={track}
                            onPlay={() => onJumpToTrack(track)}
                            isActive={track.id === currentTrackId}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(UpNext);
