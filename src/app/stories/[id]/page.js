'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import StoryViewer from '@/components/story/StoryViewer';
import { storiesWithPreview } from '@/components/story/StoriesData';

export default function StoryPage() {
  const params = useParams();
  const storyId = params.id;

  const story = storiesWithPreview.find((s) => s.id.toString() === storyId);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
    return () => { if (header) header.style.display = ''; };
  }, []);

  if (!story) return <div className="p-8 text-center">Story not found</div>;

  return <StoryViewer story={story} />;
}
