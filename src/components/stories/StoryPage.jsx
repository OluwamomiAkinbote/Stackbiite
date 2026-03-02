// StoryPage.jsx
'use client';

import React, { useState, useEffect } from 'react';
import * as Base from "@react-instastories/base";
import Image from 'next/image';

export const StoryPage = ({ story, user }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Handle video playback
  useEffect(() => {
    if (story.type === 'video') {
      // Video duration handling is automatic with the library
      return;
    }
  }, [story]);

  return (
    <Base.Page
      // Customize page behavior
      paused={isPaused}
      // Set duration based on story type
      duration={story.type === 'video' ? 15000 : 5000}
    >
      {/* Story content */}
      <div className="relative w-full h-full">
        {story.type === 'image' ? (
          <div className="relative w-full h-full">
            <Image
              src={story.url}
              alt="Story"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <video
            src={story.url}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted={false}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          />
        )}
        
        {/* Custom overlay content */}
        <StoryOverlay user={user} story={story} />
      </div>
    </Base.Page>
  );
};