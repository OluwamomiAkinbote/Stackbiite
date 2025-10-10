'use client';
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storiesData } from './StoriesData';
import StoryViewer from './StoryViewer';

export default function StoriesGrid() {
  const [selectedStory, setSelectedStory] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = direction === 'left' ? -250 : 250;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="py-10 bg-gradient-to-b from-white via-slate-50 to-purple-50">
      <div className="container mx-auto px-4 max-w-6xl relative">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Latest Updates
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            Explore real-time progress, project launches, and behind-the-scenes insights
          </p>
        </div>

        {/* Scroll Controllers (visible on small screens) */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-600 text-white rounded-full shadow-md p-2 hidden sm:flex hover:bg-purple-700 transition"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-600 text-white rounded-full shadow-md p-2 hidden sm:flex hover:bg-purple-700 transition"
        >
          <ChevronRight size={22} />
        </button>

        {/* Horizontal Story Bar */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-2 sm:px-4"
        >
          {storiesData.map((story) => {
            const firstMedia = story.media[0];
            const previewUrl = firstMedia?.url;

            return (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="flex flex-col items-center cursor-pointer group shrink-0 snap-start"
              >
                {/* Story Circle */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full p-[3px] bg-gradient-to-tr from-purple-600 via-green-400 to-purple-700 hover:from-green-500 hover:to-purple-600 transition-all duration-500">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
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
                  </div>

                  {/* Avatar Icon */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-purple-500 to-green-500 border-2 border-white shadow flex items-center justify-center overflow-hidden">
                    {story.avatar && (
                      <img
                        src={story.avatar}
                        alt=""
                        className="w-3 h-3 sm:w-4 sm:h-4 object-contain filter brightness-0 invert"
                      />
                    )}
                  </div>
                </div>

                {/* Story Title */}
                <p className="text-[10px] sm:text-xs md:text-sm mt-2 font-medium text-gray-700 group-hover:text-purple-600 text-center truncate w-[70px] sm:w-[90px] md:w-[110px]">
                  {story.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Fullscreen Story Viewer */}
        {selectedStory && (
          <StoryViewer story={selectedStory} onClose={() => setSelectedStory(null)} />
        )}
      </div>
    </section>
  );
}
