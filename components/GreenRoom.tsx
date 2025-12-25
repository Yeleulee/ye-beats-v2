

import React, { useState } from 'react';
import { Play, Filter, Music2, Clock, Zap } from 'lucide-react';

const GENRES = ['R&B', 'Electronic', 'Jazz', 'City Pop', 'Lo-fi', 'Phonk', 'Techno', 'Hip-Hop'];
const ERAS = ['1970s', '1980s', '1990s', '2000s', 'Modern'];

const GreenRoom: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['R&B']);
  const [selectedEra, setSelectedEra] = useState<string>('Modern');
  const [isTuning, setIsTuning] = useState(false);



  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const handleTune = () => {
    setIsTuning(true);
    setTimeout(() => setIsTuning(false), 2000);
  };

  return (
    <div className="p-3 md:p-5 lg:p-6 pb-24 md:pb-28 max-w-5xl mx-auto animate-in fade-in duration-700">
      <header className="mb-8 md:mb-10 lg:mb-12">
        <div className="space-y-2.5 md:space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-none text-white font-['Inter'] uppercase">
            Radio
          </h1>
          <p className="text-zinc-500 text-sm md:text-base lg:text-lg font-medium tracking-tight font-['Roboto_Flex'] brand-cursive">Personalized streams, synchronized souls.</p>
        </div>
      </header>

      <section className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
          <div className="bg-zinc-950/80 backdrop-blur-[40px] border border-white/5 rounded-[48px] p-8 md:p-12 shadow-[0_45px_90px_-20px_rgba(0,0,0,1)] relative overflow-hidden group">
            <div className="relative z-10 space-y-12">
              <div className="space-y-3">
                <h2 className="text-3xl font-black tracking-tighter text-white flex items-center gap-3 font-['Inter'] uppercase">
                  <Filter size={28} className="text-red-600" />
                  Station Tuner
                </h2>
                <p className="text-zinc-500 text-base font-medium max-w-xl font-['Roboto_Flex'] tracking-tight">Fine-tune the algorithm. Mix genres and eras to generate your unique frequency.</p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Music2 size={16} className="text-zinc-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 font-['Roboto_Flex']">Select Dialects</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {GENRES.map(genre => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`px-6 py-3 rounded-[20px] text-[10px] font-black uppercase tracking-[0.25em] transition-all border font-['Roboto_Flex'] ${
                        selectedGenres.includes(genre)
                          ? 'bg-white text-black border-white shadow-lg scale-105'
                          : 'bg-white/5 text-zinc-500 border-white/5 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-zinc-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 font-['Roboto_Flex']">Temporal Range</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {ERAS.map(era => (
                    <button
                      key={era}
                      onClick={() => setSelectedEra(era)}
                      className={`px-6 py-3 rounded-[20px] text-[10px] font-black uppercase tracking-[0.25em] transition-all border font-['Roboto_Flex'] ${
                        selectedEra === era
                          ? 'bg-red-600 text-white border-red-500 shadow-lg scale-105'
                          : 'bg-white/5 text-zinc-500 border-white/5 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      {era}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleTune}
                className="w-full py-4 md:py-5 lg:py-6 bg-white text-black rounded-[24px] md:rounded-[28px] font-black text-base md:text-lg lg:text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-3 md:gap-5 relative overflow-hidden font-['Roboto_Flex'] uppercase tracking-wider"
              >
                {isTuning ? 'Tuning Archive...' : 'Generate Frequency'}
              </button>
            </div>
          </div>
      </section>
    </div>
  );
};

export default GreenRoom;
