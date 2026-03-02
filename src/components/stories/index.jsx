'use client';

import React, { useState } from 'react';
import { StoriesPreview } from './StoriesPreview';
import { StoriesViewer } from './StoriesViewer';
import { sampleStories } from './data';

export const Stories = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);

  const handleStoryPress = (userIndex) => {
    setSelectedUserIndex(userIndex);
    setIsViewerOpen(true);
  };

  return (
    <div className="w-full">
      {/* Preview shows first media */}
      <StoriesPreview
        users={sampleStories.map(user => ({
          ...user,
          firstMedia: user.stories[0].url
        }))}
        onStoryPress={handleStoryPress}
      />

      <StoriesViewer
        users={sampleStories}
        initialUserIndex={selectedUserIndex}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </div>
  );
};

export default Stories;