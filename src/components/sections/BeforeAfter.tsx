import React, { useState, useRef, useCallback } from 'react';
import { beforeAfterItems } from '../../data/beforeAfter';
import { BeforeAfterItem } from '../../types';
import { Sparkles } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [activeItem, setActiveItem] = useState<BeforeAfterItem>(beforeAfterItems[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    setSliderPosition(percent);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <section id="before-after" className="py-24 sm:py-32 bg-pearl-50 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-semibold text-charcoal-900 mb-3 border border-pearl-300">
              <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
              <span>Трансформации</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-900 tracking-tight">
              До / После
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 max-w-md font-normal">
            Потяните разделитель в центре фотографии, чтобы увидеть результат преображения в студийном освещении.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {beforeAfterItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item);
                setSliderPosition(50);
              }}
              className={`px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                activeItem.id === item.id
                  ? 'bg-charcoal-900 text-white shadow-sm'
                  : 'bg-white hover:bg-pearl-100 text-zinc-600 border border-pearl-300'
              }`}
            >
              {item.categoryName}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full select-none overflow-hidden rounded-3xl bg-pearl-100 shadow-2xl border border-pearl-300 cursor-ew-resize touch-none"
          >
            {/* After Image */}
            <img
              src={activeItem.afterImage}
              alt={`${activeItem.title} - После`}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />

            {/* Before Image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeItem.beforeImage}
                alt={`${activeItem.title} - До`}
                className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: '100%',
                }}
              />
            </div>

            {/* Labels */}
            <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md text-charcoal-900 text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/60 pointer-events-none">
              До
            </div>
            <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md text-charcoal-900 text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/60 pointer-events-none">
              После
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-white text-charcoal-900 rounded-full shadow-xl flex items-center justify-center border border-pearl-300">
                <div className="flex items-center space-x-1 text-zinc-600 text-xs font-bold">
                  <span>‹</span>
                  <span>›</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pearl-300 mt-6 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                {activeItem.categoryName} • Мастер {activeItem.masterName}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 font-normal mt-1">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
