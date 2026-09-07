import React, { useState, useRef, useCallback } from 'react';
import { beforeAfterItems } from '../../data/beforeAfter';
import { BeforeAfterItem } from '../../types';

export const BeforeAfter: React.FC = () => {
  const [activeItem, setActiveItem] = useState<BeforeAfterItem>(beforeAfterItems[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100
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
    <section id="before-after" className="py-24 sm:py-32 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="w-8 h-[1px] bg-terracotta-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 font-semibold">
              Результаты работ
            </span>
            <span className="w-8 h-[1px] bg-terracotta-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
            До / После
          </h2>
          <p className="text-base text-charcoal-800/70 font-light">
            Потяните бегунок в центре фото, чтобы оценить преображение
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {beforeAfterItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 ${
                activeItem.id === item.id
                  ? 'bg-charcoal-900 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-charcoal-800/80 border border-cream-300'
              }`}
            >
              {item.categoryName}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Component */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full select-none overflow-hidden bg-cream-200 shadow-2xl border border-cream-300 cursor-ew-resize touch-none"
          >
            {/* After Image (Full background) */}
            <img
              src={activeItem.afterImage}
              alt={`${activeItem.title} - После`}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />

            {/* Before Image (Clipped overlay) */}
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

            {/* Badges: ДО and ПОСЛЕ */}
            <div className="absolute top-4 left-4 bg-charcoal-900/80 backdrop-blur-sm text-cream-100 text-[11px] uppercase tracking-widest font-semibold px-3 py-1.5 pointer-events-none">
              До
            </div>
            <div className="absolute top-4 right-4 bg-charcoal-900/80 backdrop-blur-sm text-cream-100 text-[11px] uppercase tracking-widest font-semibold px-3 py-1.5 pointer-events-none">
              После
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Handle Button */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white text-charcoal-900 rounded-full shadow-2xl flex items-center justify-center border-2 border-terracotta-500">
                <div className="flex items-center space-x-1 text-terracotta-600 text-xs font-bold">
                  <span>‹</span>
                  <span>›</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Card below slider */}
          <div className="bg-white p-6 sm:p-8 border border-cream-300 mt-6 shadow-luxury flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-terracotta-600 font-semibold block mb-1">
                {activeItem.categoryName} • Мастер: {activeItem.masterName}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-800/70 font-light mt-1">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
