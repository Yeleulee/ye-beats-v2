"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

type Artist = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedArtists = ({
  artists,
  autoplay = true,
  className,
}: {
  artists: Artist[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % artists.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + artists.length) % artists.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, active]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("max-w-sm md:max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-20", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <div className="relative h-[400px] md:h-[500px] w-full">
            <AnimatePresence>
              {artists.map((artist, index) => (
                <motion.div
                  key={artist.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : artists.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={artist.src}
                    alt={artist.name}
                    draggable={false}
                    className="h-full w-full rounded-[48px] object-cover object-center shadow-2xl border-2 border-white/10"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4 md:py-8">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-4xl md:text-6xl font-black text-white font-['Inter'] uppercase tracking-tighter leading-none mb-4">
              {artists[active].name}
            </h3>
            <p className="text-base md:text-xl font-bold text-zinc-500 uppercase tracking-[0.3em] font-['Roboto_Flex'] mb-8">
              {artists[active].designation}
            </p>
            <motion.p className="text-lg md:text-2xl text-zinc-400 font-medium font-['Roboto_Flex'] leading-relaxed">
              {artists[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group/button hover:bg-white/20 transition-all shadow-xl"
            >
              <ChevronLeft className="h-6 w-6 md:h-7 md:w-7 text-white group-hover/button:scale-110 transition-transform duration-300" strokeWidth={2.5} />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group/button hover:bg-white/20 transition-all shadow-xl"
            >
              <ChevronRight className="h-6 w-6 md:h-7 md:w-7 text-white group-hover/button:scale-110 transition-transform duration-300" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
