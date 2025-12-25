import React from 'react';
import { Play, Music, Zap, Flame, Globe, Sparkles } from 'lucide-react';
import MoodCard from './explore/MoodCard';
import ChartCard from './explore/ChartCard';
import DiscoverCTA from './explore/DiscoverCTA';
import { useExploreData } from '../hooks/useExploreData';

interface ExploreProps {
  onPlayTrack: (track: any) => void;
}

const moods = [
    { label: 'Commute', icon: Zap, gradient: 'from-blue-600 to-cyan-500', glow: 'shadow-blue-500/50', iconBg: 'bg-blue-500' },
    { label: 'Workout', icon: Flame, gradient: 'from-orange-600 to-red-500', glow: 'shadow-orange-500/50', iconBg: 'bg-orange-500' },
    { label: 'Focus', icon: Music, gradient: 'from-emerald-600 to-green-500', glow: 'shadow-emerald-500/50', iconBg: 'bg-emerald-500' },
    { label: 'Party', icon: Sparkles, gradient: 'from-purple-600 to-pink-500', glow: 'shadow-purple-500/50', iconBg: 'bg-purple-500' },
];

const Explore: React.FC<ExploreProps> = ({ onPlayTrack }) => {
    const { globalTracks, tokyoTracks, newReleaseTracks, isLoading } = useExploreData();

    const chartData = [
        {
            title: 'Top 100 Global',
            sub: 'The most played songs right now',
            img: globalTracks[0]?.coverArt || 'https://picsum.photos/seed/global/600/600',
            color: 'border-blue-500/30',
            tracks: globalTracks.slice(0, 5)
        },
        {
            title: 'Trending: Tokyo',
            sub: 'City Pop & Future Funk hits',
            img: tokyoTracks[0]?.coverArt || 'https://picsum.photos/seed/tokyo/600/600',
            color: 'border-pink-500/30',
            tracks: tokyoTracks.slice(0, 5)
        },
        {
            title: 'New Release Mix',
            sub: 'Personalized unreleased gems',
            img: newReleaseTracks[0]?.coverArt || 'https://picsum.photos/seed/newmix/600/600',
            color: 'border-emerald-500/30',
            tracks: newReleaseTracks.slice(0, 5)
        },
    ];

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen"><p className="text-white">Loading...</p></div>;
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12 py-10 px-5">
            <section>
                <h2 className="text-3xl font-bold text-white mb-6">What's the vibe?</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {moods.map((mood) => (
                        <MoodCard key={mood.label} {...mood} onClick={() => {}} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3"><Globe className="text-indigo-400" /> Global Pulse</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {chartData.map((chart, i) => (
                        <ChartCard key={i} {...chart} onPlayTrack={onPlayTrack} />
                    ))}
                </div>
            </section>

            <DiscoverCTA />
        </div>
    );
};

export default Explore;
