import React, { memo } from 'react';
import { Play } from 'lucide-react';
import { YouTubeTrack } from '../../services/youtubeService';
import { cn } from '../../lib/utils';

interface ChartCardProps {
    title: string;
    sub: string;
    img: string;
    color: string;
    tracks: YouTubeTrack[];
    onPlayTrack: (track: YouTubeTrack) => void;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, sub, img, color, tracks, onPlayTrack }) => {
    return (
        <div className={cn('relative group aspect-[3/4] rounded-3xl overflow-hidden border', color)}>
            <img src={img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 space-y-2 text-white w-full">
                <h4 className="text-2xl font-bold">{title}</h4>
                <p className="text-white/70">{sub}</p>
                <div className="pt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <button 
                        onClick={() => tracks[0] && onPlayTrack(tracks[0])}
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                        <Play className="text-black ml-1" fill="black" size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(ChartCard);
