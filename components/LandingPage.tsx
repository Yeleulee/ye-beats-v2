
import React from 'react';
import { ArrowRight, Star, Music, Zap, Fire, Headphones } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {

  const handleJoinClick = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <header className="px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter uppercase font-['Inter']">TuneStream</div>
        <button onClick={handleJoinClick} className="px-6 py-3 bg-red-600 font-bold rounded-full hover:bg-red-700 transition-all text-sm uppercase tracking-wider">Join Now</button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <div className="inline-block bg-white/10 text-white text-xs px-4 py-2 rounded-full font-semibold mb-6 uppercase tracking-widest">
            <Star size={12} className="inline-block mr-2 text-yellow-400" />
            Curated Playlists, Uninterrupted Flow
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase font-['Inter'] leading-none">
            Your Personal Radio Station
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-zinc-400 font-['Roboto_Flex']">
            Discover new music, create playlists, and enjoy a seamless listening experience powered by YouTube. No ads, no interruptions, just pure music.
          </p>
          <div className="mt-10">
            <button onClick={handleJoinClick} className="bg-white text-black font-bold text-lg px-10 py-5 rounded-full hover:scale-105 transition-transform flex items-center mx-auto shadow-lg shadow-white/20">
              Start Listening for Free
              <ArrowRight className="ml-3" />
            </button>
          </div>
        </div>
      </main>

      <footer className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Music size={24} className="text-red-500 mb-2" />
            <h3 className="font-bold uppercase tracking-wider">Vast Library</h3>
            <p className="text-sm text-zinc-500">Millions of songs via YouTube</p>
          </div>
          <div className="flex flex-col items-center">
            <Zap size={24} className="text-yellow-500 mb-2" />
            <h3 className="font-bold uppercase tracking-wider">AI-Powered</h3>
            <p className="text-sm text-zinc-500">Smart recommendations</p>
          </div>
          <div className="flex flex-col items-center">
            <Headphones size={24} className="text-blue-500 mb-2" />
            <h3 className="font-bold uppercase tracking-wider">High Fidelity</h3>
            <p className="text-sm text-zinc-500">Lossless audio streaming</p>
          </div>
          <div className="flex flex-col items-center">
            <Fire size={24} className="text-orange-500 mb-2" />
            <h3 className="font-bold uppercase tracking-wider">Fresh & New</h3>
            <p className="text-sm text-zinc-500">Daily updated charts</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
