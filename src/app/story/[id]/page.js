// app/stories/[id]/page.js
import { Metadata } from 'next';
import { storiesData } from '@/components/story/StoriesData';
import StoryViewer from '@/components/story/StoryViewer';

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { id } = params;
  const story = storiesData.find((s) => s.id === id);

  if (!story) {
    return {
      title: 'Story Not Found',
      description: 'The requested story could not be found.',
    };
  }

  const seoImage =
    story.seoImage ||
    story.media?.find((m) => m.type === 'image')?.url ||
    '/images/seo-professional.jpg';

  return {
    title: `${story.title} | Stories`,
    description: story.description || 'Professional story insights and updates.',
    openGraph: {
      title: story.title,
      description: story.description || 'Explore engaging stories and visual updates.',
      images: [seoImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description: story.description || '',
      images: [seoImage],
    },
  };
}

// Generate static params for better SEO
export async function generateStaticParams() {
  return storiesData.map((story) => ({
    id: story.id,
  }));
}

// Client component
export default function StoryPage({ params }) {
  const { id } = params;
  const story = storiesData.find((s) => s.id === id);

  if (!story) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-lg">Story not found</p>
      </div>
    );
  }

  return <StoryViewer story={story} />;
}