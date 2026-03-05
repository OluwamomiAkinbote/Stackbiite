'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '@/components/home/ThemeContext';
import { storiesWithPreview } from '@/components/story/StoriesData';

export default function ModernStoriesGrid() {
  const scrollRef = useRef(null);
  const { theme } = useTheme();
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  // Check if scroll buttons are needed
  useEffect(() => {
    const checkScroll = () => {
      const container = scrollRef.current;
      if (container) setShowScrollButtons(container.scrollWidth > container.clientWidth);
    };
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const getMediaIcon = (mediaType, isFirst) => {
    if (!isFirst) return null;
    return mediaType === 'video' ? <Play size={12} className="text-white" /> : <ImageIcon size={12} className="text-white" />;
  };

  return (
    <section className={`py-12 transition-colors duration-300 ${theme.secondary}`}>
      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="text-center mb-10 lg:mb-12 pt-16">
          <h2 className={`text-3xl lg:text-5xl font-extrabold ${theme.text} mb-3 tracking-tight`}>
            <span className="relative inline-block">
              <span className="relative">{`Our Creative Highlights`}</span>
            </span>
          </h2>
          <p className={`text-base lg:text-lg max-w-md mx-auto italic ${theme.text}`}>
            Quick glimpses of our design energy and innovation.
          </p>
        </div>

        {/* Scroll Buttons */}
        {showScrollButtons && (
          <>
            <button
              onClick={() => scroll('left')}
              className={`absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 ${theme.button} text-white rounded-full shadow-lg p-3 hidden sm:flex hover:scale-110 transition-transform`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 ${theme.button} text-white rounded-full shadow-lg p-3 hidden sm:flex hover:scale-110 transition-transform`}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Story Circles */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-4">
          {storiesWithPreview.map((story) => {
            const firstMedia = story.media[0];
            const previewUrl = firstMedia?.url;
            const mediaCount = story.media.length;

            return (
              <Link
                key={story.id}
                href={`/stories/${story.id}`}
                className="flex flex-col items-center group shrink-0 transition-all hover:scale-105"
              >
                <div className="relative">
                  <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full p-[2px] ${theme.primary}`}>
                    <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                      {firstMedia?.type === 'video' ? (
                        <video
                          src={previewUrl}
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <img
                          src={previewUrl}
                          alt={story.title}
                          className="w-full h-full object-cover rounded-full"
                        />
                      )}
                      <div className="absolute bottom-1 left-1 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
                        {getMediaIcon(firstMedia?.type, true)}
                      </div>
                    </div>
                    {mediaCount > 1 && (
                      <div
                        className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${theme.badge} text-white flex items-center justify-center border-2 border-white`}
                      >
                        +{mediaCount}
                      </div>
                    )}
                  </div>
                </div>
                <p className={`mt-3 text-sm font-semibold ${theme.text} group-hover:${theme.accent}`}>
                  {story.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
