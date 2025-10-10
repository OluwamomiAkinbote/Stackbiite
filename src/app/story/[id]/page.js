'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import StoryViewer from '@/components/story/StoryViewer';
import { storiesData } from '@/components/story/StoriesData';

export default function StoryPage({ params }) {
  const resolvedParams = use(params); // unwrap the promise
  const { id } = resolvedParams;

  const router = useRouter();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const foundStory = storiesData.find((s) => s.id === id);
    if (foundStory) setStory(foundStory);
  }, [id]);

  if (!story) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-lg">Story not found</p>
      </div>
    );
  }

  return (
    <StoryViewer
      story={story}
      onClose={() => router.push('/')} // Return to home after viewing
    />
  );
}
