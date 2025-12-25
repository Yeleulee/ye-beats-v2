
import React, { memo } from 'react';
import { Music } from 'lucide-react';
import { YouTubeTrack } from '../../services/youtubeService';

interface CratePlaylistProps {
    playlist: YouTubeTrack[];
    onPlayTrack: (track: YouTubeTrack) => void;
}

const CratePlaylist: React.FC<CratePlaylistProps> = ({ playlist, onPlayTrack }) => {
    if (playlist.length === 0) return null;

    return (
        <div className="mt-10 space-y-4">
            <h3 className="text-xl font-bold text-white">Results</h3>
            <div className="grid gap-3">
                {playlist.map((track, i) => (
                    <div 
                        key={i}
                        className="group bg-zinc-900/60 hover:bg-zinc-800/80 p-4 rounded-lg flex items-center gap-4 border border-white/10 transition-all cursor-pointer"
                        onClick={() => onPlayTrack(track)}
                    >
                        <div className="w-14 h-14 bg-zinc-800 rounded-md flex items-center justify-center overflow-hidden">
                            {track.coverArt ? (
                                <img src={track.coverArt} alt={track.title} className="w-full h-full object-cover" />
                            ) : (
                                <Music size={24} className="text-zinc-500" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white truncate">{track.title}</h4>
                            <p className="text-sm text-zinc-400 truncate">{track.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(CratePlaylist);
