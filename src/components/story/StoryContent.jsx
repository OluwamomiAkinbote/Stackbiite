'use client';
import Link from 'next/link';
import { X, Play, Pause, Share2, ChevronLeft, ChevronRight, Home, Eye, Link2 } from 'lucide-react';

export default function StoryContent({
  story,
  media,
  currentIndex,
  progress,
  isPlaying,
  isVideo,
  isBackHome,
  views,
  videoRef,
  onNext,
  onPrev,
  onClose,
  onTogglePlayPause,
}) {
  const handleShare = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/stories/${story.id}`;
    if (navigator.share) {
      navigator.share({ title: story.title, text: media.description || '', url: shareUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Share link copied!');
    }
  };

  return (
    <>
      {/* ✅ Always show Progress Bar */}
      <div className="absolute top-3 left-3 right-3 flex gap-1 z-30">
        {story.media.map((_, i) => (
          <div key={i} className="h-1 bg-white/30 flex-1 rounded-full">
            <div
              className="h-full bg-white transition-all duration-100 rounded-full"
              style={{
                width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {/* ✅ Handle Back Home Story */}
      {isBackHome ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6"
          style={{ backgroundImage: `url(${media.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="backdrop-blur-xl bg-black/40 rounded-3xl p-8 shadow-2xl">
            <Home className="w-12 h-12 mb-4 text-green-400" />
            <h2 className="text-2xl font-bold mb-3 tracking-wide">{media.title}</h2>
            <p className="text-gray-200 text-sm mb-6 leading-relaxed">{media.description}</p>
            <Link
              href={media.link || '/'}
              onClick={onClose}
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold hover:scale-105 transition-transform"
            >
              {media.linkText || '← Back to Home'}
            </Link>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* ✅ Remove hand gesture: click disabled, only chevrons active on small screens */}
          {isVideo ? (
            <video
              ref={videoRef}
              src={media.url}
              className="w-full h-full object-contain"
              muted
              playsInline
              loop={false}
            />
          ) : (
            <img src={media.url} alt={media.title} className="w-full h-full object-contain" />
          )}

          {/* Overlay Header */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-b from-black/70 to-transparent">
            <div className="flex items-center gap-3">
              <img src={story.avatar} alt={story.title} className="w-9 h-9 rounded-full border-2 border-white" />
              <span className="text-white font-semibold">{story.title}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Bottom Info & Buttons */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/70 to-transparent">
            <h2 className="text-lg font-bold text-white mb-2">{media.title}</h2>
            {media.description && <p className="text-gray-300 text-sm mb-4">{media.description}</p>}

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20">
                <Eye className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">{views}</span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-white/10 transition-colors"
              >
                <Share2 className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Share</span>
              </button>

              {media.link && (
                <Link
                  href={media.link}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Link2 className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">{media.linkText || 'Visit'}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Play/Pause for Video */}
          {isVideo && (
            <button
              onClick={onTogglePlayPause}
              className="absolute inset-x-0 bottom-20 flex justify-center"
            >
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition">
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </div>
            </button>
          )}

          {/* ✅ Chevron Buttons — Only functional on small screens */}
          <div >
            {currentIndex > 0 && (
              <button
                onClick={onPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}
            {currentIndex < story.media.length - 1 && (
              <button
                onClick={onNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
