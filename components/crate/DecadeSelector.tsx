import React, { memo } from 'react';
import { cn } from '../../lib/utils';

interface DecadeSelectorProps {
    decades: string[];
    selectedDecade: string;
    onSelectDecade: (decade: string) => void;
}

const DecadeSelector: React.FC<DecadeSelectorProps> = ({ decades, selectedDecade, onSelectDecade }) => {
    return (
        <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/10">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Select Era</label>
            <div className="grid grid-cols-2 gap-3">
                {decades.map(d => (
                    <button
                        key={d}
                        onClick={() => onSelectDecade(d)}
                        className={cn(
                            'p-3 rounded-lg border text-sm font-bold transition-all',
                            selectedDecade === d
                                ? 'bg-white text-black border-white shadow-md'
                                : 'bg-black/40 text-white border-white/10 hover:bg-white/10'
                        )}
                    >
                        {d}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default memo(DecadeSelector);
