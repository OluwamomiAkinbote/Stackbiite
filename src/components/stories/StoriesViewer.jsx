'use client';

import React, { useMemo } from 'react';
import Stories from 'react-insta-stories';

export const StoriesViewer = ({
  users,
  initialUserIndex,
  isOpen,
  onClose,
}) => {

  const formattedStories = useMemo(() => {
    const currentUser = users[initialUserIndex];
    if (!currentUser) return [];

    return currentUser.stories.map((story) => ({
      url: story.url,
      type: story.type === 'video' ? 'video' : 'image',
      duration: story.duration || 5000,
    }));
  }, [users, initialUserIndex]);

  if (!isOpen || formattedStories.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="relative w-full max-w-md h-[90vh]">

        <Stories
          stories={formattedStories}
          defaultInterval={5000}
          width="100%"
          height="100%"
          onAllStoriesEnd={onClose}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white z-50"
        >
          ✕
        </button>

      </div>
    </div>
  );
};