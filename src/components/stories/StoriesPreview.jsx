'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '../home/ThemeContext'; // adjust path if needed

export const StoriesPreview = ({ users, onStoryPress }) => {
  const [seenStories, setSeenStories] = useState([]);
  const { theme } = useTheme();

  const handleStoryClick = (index, userId) => {
    if (!seenStories.includes(userId)) {
      setSeenStories((prev) => [...prev, userId]);
    }
    onStoryPress(index);
  };

  return (
    <div
      className={`
        w-full 
        overflow-x-auto 
        scrollbar-hide 
        ${theme.secondary}   /* 👈 Theme background */
        transition-colors duration-300
      `}
    >
      <div className="flex justify-center gap-6 px-4 md:pt-24 sm:pt-18 pb-4 min-w-max">
        {users.map((user, index) => {
          const firstMedia = user.stories[0];
          const isSeen = seenStories.includes(user.id);

          return (
            <button
              key={user.id}
              onClick={() => handleStoryClick(index, user.id)}
              className="flex flex-col items-center gap-2 min-w-[80px] transition-transform duration-300 lg:hover:scale-105"
            >
              {/* Story Ring */}
              <div
                className={`
                  relative
                  w-16 h-16
                  md:w-14 md:h-14
                  lg:w-20 lg:h-20
                  rounded-full
                  p-[3px]
                  ${isSeen ? theme.stories.seen : theme.stories.unseen}
                `}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-black">
                  {firstMedia.type === 'video' ? (
                    <video
                      src={firstMedia.url}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={firstMedia.url}
                      alt="story preview"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Topic Name */}
              <span
                className={`
                  text-xs font-medium text-center truncate
                  w-[80px] md:w-[70px] lg:w-[110px]
                  ${theme.text}
                `}
              >
                {user.topic}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};