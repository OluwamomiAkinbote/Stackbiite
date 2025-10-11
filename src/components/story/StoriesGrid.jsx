'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Image, Palette } from 'lucide-react';
import { storiesWithPreview } from './StoriesData';
import StoryViewer from './StoryViewer';

// Color themes for customization
const colorThemes = {
  modern: {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    secondary: 'bg-blue-100',
    text: 'text-gray-800',
    accent: 'text-blue-600',
    badge: 'bg-blue-500',
    button: 'bg-blue-600 hover:bg-blue-700',
  },
  professional: {
    primary: 'bg-gradient-to-r from-gray-700 to-gray-900',
    secondary: 'bg-gray-100',
    text: 'text-gray-800',
    accent: 'text-gray-700',
    badge: 'bg-gray-600',
    button: 'bg-gray-700 hover:bg-gray-800',
  },
  vibrant: {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500',
    secondary: 'bg-purple-50',
    text: 'text-gray-800',
    accent: 'text-purple-600',
    badge: 'bg-purple-500',
    button: 'bg-purple-600 hover:bg-purple-700',
  },
  nature: {
    primary: 'bg-gradient-to-r from-green-500 to-emerald-500',
    secondary: 'bg-green-50',
    text: 'text-gray-800',
    accent: 'text-green-600',
    badge: 'bg-green-500',
    button: 'bg-green-600 hover:bg-green-700',
  }
};

export default function ModernStoriesGrid() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('modern');
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const scrollRef = useRef(null);
  const dropdownRef = useRef(null);

  const theme = colorThemes[currentTheme];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowThemeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if scroll is needed
  useEffect(() => {
    const checkScroll = () => {
      const container = scrollRef.current;
      if (container) {
        setShowScrollButtons(container.scrollWidth > container.clientWidth);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ 
      left: direction === 'left' ? -scrollAmount : scrollAmount, 
      behavior: 'smooth' 
    });
  };

  const getMediaIcon = (mediaType, isFirst) => {
    if (!isFirst) return null;
    return mediaType === 'video' ? (
      <Play size={12} className="text-white" />
    ) : (
      <Image size={12} className="text-white" />
    );
  };

  return (
    <section className={`py-12 lg:py-16 ${theme.secondary} transition-colors duration-300`}>
      <div className="container mx-auto px-4 max-w-7xl relative">
        
        {/* Header with Smart Theme Selector */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="flex flex-col items-center mb-6 gap-4">
            {/* Main Title */}
            <div className="flex-1 w-full">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-3">
                Latest Stories
              </h2>
              <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                Discover recent updates, project milestones, and exclusive insights
              </p>
            </div>
            
            {/* Smart Theme Selector - Clean and Mobile-Friendly */}
            <div className="relative" ref={dropdownRef}>
              {/* Theme Trigger Button */}
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${theme.button} text-white shadow-lg transition-all hover:scale-105`}
              >
                <Palette size={18} />
                <span className="hidden sm:inline">Theme</span>
                <span className="text-xs opacity-90 hidden xs:inline">({currentTheme})</span>
              </button>

              {/* Dropdown Menu */}
              {showThemeDropdown && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 py-2">
                  <div className="text-xs font-semibold text-gray-500 px-4 py-2 border-b">
                    CHOOSE THEME
                  </div>
                  {Object.keys(colorThemes).map((themeKey) => (
                    <button
                      key={themeKey}
                      onClick={() => {
                        setCurrentTheme(themeKey);
                        setShowThemeDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all ${
                        currentTheme === themeKey 
                          ? `${theme.button} text-white` 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {/* Color Preview Dot */}
                      <div 
                        className={`w-4 h-4 rounded-full ${
                          themeKey === 'modern' ? 'bg-blue-500' :
                          themeKey === 'professional' ? 'bg-gray-700' :
                          themeKey === 'vibrant' ? 'bg-purple-500' :
                          'bg-green-500'
                        }`} 
                      />
                      <span className="capitalize font-medium">{themeKey}</span>
                      {currentTheme === themeKey && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-white" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Buttons - Conditionally rendered */}
        {showScrollButtons && (
          <>
            <button
              onClick={() => scroll('left')}
              className={`absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 ${theme.button} text-white rounded-full shadow-lg p-3 z-10 hidden sm:flex items-center justify-center transition-all hover:scale-105`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 ${theme.button} text-white rounded-full shadow-lg p-3 z-10 hidden sm:flex items-center justify-center transition-all hover:scale-105`}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Modern Story Grid */}
        <div
          ref={scrollRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-2 lg:px-4 py-4"
        >
          {storiesWithPreview.map((story, index) => {
            const mediaCount = story.media.length;
            const firstMedia = story.media[0];
            const previewUrl = firstMedia?.url;
            const isNew = story.isNew;

            return (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="flex flex-col items-center cursor-pointer group shrink-0 transition-all duration-300 hover:scale-105"
              >
                {/* Modern Story Circle */}
                <div className="relative">
                  {/* Outer Ring with Progress Indicator */}
                  <div className={`w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full p-[2px] ${theme.primary} relative`}>
                    {/* Inner Content */}
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
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
                      
                      {/* Media Type Overlay */}
                      <div className="absolute bottom-1 left-1 w-6 h-6 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                        {getMediaIcon(firstMedia?.type, true)}
                      </div>
                    </div>

                    {/* Media Count Badge */}
                    {mediaCount > 1 && (
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 lg:w-7 lg:h-7 rounded-full ${theme.badge} border-2 border-white shadow-lg flex items-center justify-center`}>
                        <span className="text-xs font-bold text-white">
                          +{mediaCount}
                        </span>
                      </div>
                    )}

                    {/* New Story Indicator */}
                    {isNew && (
                      <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white animate-pulse" />
                    )}
                  </div>

                  {/* Online Status Indicator */}
                  <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                </div>

                {/* Story Title with Better Typography */}
                <div className="text-center mt-3 lg:mt-4 max-w-[100px] lg:max-w-[120px]">
                  <p className={`text-sm lg:text-base font-semibold ${theme.text} group-hover:${theme.accent} transition-colors truncate`}>
                    {story.title}
                  </p>
                  {story.timestamp && (
                    <p className="text-xs text-gray-500 mt-1">
                      {story.timestamp}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Story Viewer */}
        {selectedStory && (
          <StoryViewer
            story={selectedStory}
            onClose={() => setSelectedStory(null)}
          />
        )}
      </div>
    </section>
  );
}