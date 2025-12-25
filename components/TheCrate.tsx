import React from 'react';
import { Globe } from 'lucide-react';
import RegionSelector from './crate/RegionSelector';
import DecadeSelector from './crate/DecadeSelector';
import CratePlaylist from './crate/CratePlaylist';
import { useCrateDigger } from '../hooks/useCrateDigger';

interface TheCrateProps {
    onPlayTrack: (track: any) => void;
}

const TheCrate: React.FC<TheCrateProps> = ({ onPlayTrack }) => {
    const {
        region,
        setRegion,
        decade,
        setDecade,
        loading,
        playlist,
        handleDig,
        regions,
        decades
    } = useCrateDigger();

    return (
        <div className="p-5 max-w-5xl mx-auto space-y-8">
            <header className="mb-6">
                <h1 className="text-4xl font-bold text-white flex items-center gap-4"><Globe className="text-red-500" /> The Crate</h1>
                <p className="text-zinc-400">Uncover the cultural gems of music history.</p>
            </header>

            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/10">
                <h2 className="text-lg font-bold text-white mb-2">How it works</h2>
                <p className="text-sm text-zinc-400">Select a region and a decade, then click "Start Digging" to unearth a playlist of musical gems from that time and place. It's a musical journey through time and around the world.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <RegionSelector regions={regions} selectedRegion={region} onSelectRegion={setRegion} />
                <DecadeSelector decades={decades} selectedDecade={decade} onSelectDecade={setDecade} />
            </div>

            <button
                onClick={handleDig}
                disabled={loading}
                className="w-full bg-white text-black py-4 rounded-lg font-bold text-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
                {loading ? 'Digging...' : 'Start Digging'}
            </button>

            <CratePlaylist playlist={playlist} onPlayTrack={onPlayTrack} />
        </div>
    );
};

export default TheCrate;
