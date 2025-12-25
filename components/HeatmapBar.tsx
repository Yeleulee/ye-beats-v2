
import React, { useRef, useState, useEffect, useCallback } from 'react';

interface HeatmapBarProps {
  progress: number;
  heatmap: number[];
  onChange: (val: number) => void;
}

const HeatmapBar: React.FC<HeatmapBarProps> = ({ progress, heatmap, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateProgressFromEvent = useCallback((e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : (e as MouseEvent | React.MouseEvent).clientX;
    
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    onChange(percentage);
  }, [onChange]);

  // Handle global mouse move and up events when dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMove = (e: MouseEvent) => {
      updateProgressFromEvent(e);
    };

    const handleGlobalUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalUp);
    window.addEventListener('touchmove', handleGlobalMove as any);
    window.addEventListener('touchend', handleGlobalUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalUp);
      window.removeEventListener('touchmove', handleGlobalMove as any);
      window.removeEventListener('touchend', handleGlobalUp);
    };
  }, [isDragging, updateProgressFromEvent]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    updateProgressFromEvent(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setHoverProgress(Math.max(0, Math.min(1, x / rect.width)));
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full cursor-pointer flex items-end group transition-all ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverProgress(null)}
    >
      {/* Visual Heatmap Backdrop */}
      <div className={`absolute inset-x-0 bottom-1 h-6 flex items-end justify-between px-0.5 pointer-events-none transition-all duration-500 ${isDragging ? 'opacity-60' : 'opacity-20 group-hover:opacity-40'}`}>
        {heatmap.map((val, idx) => (
          <div 
            key={idx} 
            className={`bg-white rounded-t-[1px] transition-all duration-700`} 
            style={{ 
              height: `${val * 100}%`, 
              width: `${100 / heatmap.length - 1}%`,
              backgroundColor: isDragging ? 'rgba(255, 255, 255, 0.8)' : 'white'
            }} 
          />
        ))}
      </div>

      {/* Main Track Bar Background */}
      <div className={`absolute bottom-0 left-0 w-full bg-white/10 transition-all ${isDragging ? 'h-[5px]' : 'h-[2.5px] group-hover:h-[5px]'}`} />
      
      {/* Progress Track */}
      <div 
        className={`absolute bottom-0 left-0 bg-white transition-all z-20 shadow-[0_0_8px_rgba(255,255,255,0.3)] ${isDragging ? 'h-[5px]' : 'h-[2.5px] group-hover:h-[5px]'}`} 
        style={{ width: `${progress * 100}%` }}
      >
        {/* Playhead Glow */}
        <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full transition-all shadow-[0_0_16px_rgba(255,255,255,1)] z-30 ${isDragging ? 'opacity-100 scale-125' : 'opacity-0 group-hover:opacity-100'}`} />
      </div>

      {/* Hover Preview Bar (Only show if not dragging) */}
      {hoverProgress !== null && !isDragging && (
        <div 
          className="absolute bottom-0 left-0 h-[2.5px] bg-white/30 group-hover:h-[5px] pointer-events-none transition-all"
          style={{ width: `${hoverProgress * 100}%` }}
        />
      )}

      {/* Dragging Feedback Tooltip */}
      {isDragging && (
        <div 
          className="absolute bottom-8 -translate-x-1/2 bg-white text-black text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xl z-40 pointer-events-none uppercase tracking-tighter"
          style={{ left: `${progress * 100}%` }}
        >
          Scrubbing {Math.round(progress * 100)}%
        </div>
      )}
    </div>
  );
};

export default HeatmapBar;
