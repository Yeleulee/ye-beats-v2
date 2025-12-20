

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
    <div className="p-8 pb-32 max-w-5xl mx-auto animate-in fade-in duration-700">
      <header className="mb-16">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-white font-['Inter'] uppercase">
            Radio
          </h1>
          <p className="text-zinc-500 text-xl font-medium tracking-tight font-['Roboto_Flex'] brand-cursive">Personalized streams, synchronized souls.</p>
        </div>
      </header>

      <section className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
          <div className="bg-zinc-950/80 backdrop-blur-[40px] border border-white/5 rounded-[56px] p-10 md:p-16 shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] relative overflow-hidden group">
            <div className="relative z-10 space-y-16">
              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tighter text-white flex items-center gap-4 font-['Inter'] uppercase">
                  <Filter size={32} className="text-red-600" />
                  Station Tuner
                </h2>
                <p className="text-zinc-500 text-lg font-medium max-w-xl font-['Roboto_Flex'] tracking-tight">Fine-tune the algorithm. Mix genres and eras to generate your unique frequency.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Music2 size={18} className="text-zinc-600" />
                  <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-500 font-['Roboto_Flex']">Select Dialects</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {GENRES.map(genre => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`px-8 py-4 rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] transition-all border font-['Roboto_Flex'] ${
                        selectedGenres.includes(genre)
                          ? 'bg-white text-black border-white shadow-xl scale-105'
                          : 'bg-white/5 text-zinc-500 border-white/5 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Clock size={18} className="text-zinc-600" />
                  <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-500 font-['Roboto_Flex']">Temporal Range</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {ERAS.map(era => (
                    <button
                      key={era}
                      onClick={() => setSelectedEra(era)}
                      className={`px-8 py-4 rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] transition-all border font-['Roboto_Flex'] ${
                        selectedEra === era
                          ? 'bg-red-600 text-white border-red-500 shadow-xl scale-105'
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
                className="w-full py-8 bg-white text-black rounded-[32px] font-black text-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-6 relative overflow-hidden font-['Roboto_Flex'] uppercase tracking-widest"
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
