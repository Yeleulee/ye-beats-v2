
import React, { memo } from 'react';

const DiscoverCTA: React.FC = () => {
    return (
        <section className="bg-zinc-900 border border-white/10 p-10 rounded-3xl text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/10 to-transparent" />
            <h2 className="text-4xl font-bold text-white relative z-10">Break the Loop</h2>
            <p className="text-white/70 max-w-lg mx-auto relative z-10">
                Our AI picks deep cuts based on your core rotation. Step into the unknown.
            </p>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg relative z-10">
                Surprise Me
            </button>
        </section>
    );
};

export default memo(DiscoverCTA);
