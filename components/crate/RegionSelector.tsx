
import React, { memo } from 'react';
import { cn } from '../../lib/utils';

interface RegionSelectorProps {
    regions: { name: string; emoji: string; searchTerm: string; }[];
    selectedRegion: string;
    onSelectRegion: (region: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ regions, selectedRegion, onSelectRegion }) => {
    return (
        <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/10">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Select Origin</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {regions.map(r => (
                    <button
                        key={r.name}
                        onClick={() => onSelectRegion(r.name)}
                        className={cn(
                            'p-3 rounded-lg border text-sm font-bold transition-all',
                            selectedRegion === r.name
                                ? 'bg-white text-black border-white shadow-md'
                                : 'bg-black/40 text-white border-white/10 hover:bg-white/10'
                        )}
                    >
                        {r.emoji} {r.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default memo(RegionSelector);
