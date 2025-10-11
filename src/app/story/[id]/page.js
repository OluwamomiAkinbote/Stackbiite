import Head from 'next/head';
import StoryViewer from '@/components/story/StoryViewer';
import { storiesWithPreview } from '@/components/story/StoriesData';

export default function StoryPage({ params }) {
  const { id } = params;

  // Find story server-side
  const story = storiesWithPreview.find((s) => s.id === id);

  if (!story) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-lg">Story not found</p>
      </div>
    );
  }

  const seoImage =
    story.seoImage ||
    story.media?.find((m) => m.type === 'image')?.url ||
    '/images/seo-professional.jpg';

  return (
    <>
      <Head>
        <title>{story.title} | Stories</title>
        <meta
          name="description"
          content={story.description || 'Professional story insights and updates.'}
        />
        <meta property="og:title" content={story.title} />
        <meta
          property="og:description"
          content={story.description || 'Explore engaging stories and visual updates.'}
        />
        <meta property="og:image" content={seoImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={story.title} />
        <meta property="twitter:description" content={story.description || ''} />
        <meta property="twitter:image" content={seoImage} />
      </Head>

      <StoryViewer story={story} onClose={() => {}} />
    </>
  );
}
