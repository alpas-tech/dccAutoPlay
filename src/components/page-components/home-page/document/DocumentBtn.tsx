'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Carousel = ({ extras }: { extras: any[] }) => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const length = extras.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slide
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
  };

  // Handle transition end for infinite loop
  const handleTransitionEnd = () => {
    if (current === length) {
      // reached clone → reset instantly to real first
      setIsTransitioning(false);
      setCurrent(0);

      // ensure next slides animate again
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }
  };

  // Swipe support
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    stopAutoSlide();
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      if (distance > 50) {
        nextSlide(); // only left swipe
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
    startAutoSlide();
  };

  if (!extras?.length) return null;

  return (
    <div
      className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extras.map((img, idx) => (
          <div key={idx} className="w-full flex-shrink-0 flex items-center justify-center">
            <Image
              src={img.file_url}
              alt={`extra-${idx}`}
              width={1200}
              height={1200}
              className="max-h-[70vh] w-auto object-contain"
            />
          </div>
        ))}
        {/* clone first image at the end */}
        <div className="w-full flex-shrink-0 flex items-center justify-center">
          <Image
            src={extras[0].file_url}
            alt="extra-clone"
            width={1200}
            height={1200}
            className="max-h-[70vh] w-auto object-contain"
          />
        </div>
      </div>

      {/* Only next button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {extras.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current % length ? 'bg-white scale-110' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
