'use client';
import { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Share2, Heart } from 'lucide-react';

export default function StoryViewer({ story, onClose = () => {} }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef(null);
  const progressInterval = useRef(null);
  const controlsTimeout = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const media = story.media[currentIndex];
  const isVideo = media.type === 'video';

  // Load likes from localStorage
  useEffect(() => {
    const storedLikes = parseInt(localStorage.getItem(`likes_${story.id}`)) || 0;
    const userLiked = localStorage.getItem(`userLiked_${story.id}`) === 'true';
    setLikes(storedLikes);
    setIsLiked(userLiked);
  }, [story.id]);

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isLiked) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setIsLiked(true);
      localStorage.setItem(`likes_${story.id}`, newLikes.toString());
      localStorage.setItem(`userLiked_${story.id}`, 'true');
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/story/${story.id}`;
    if (navigator.share) {
      navigator.share({ title: story.title, text: media.description || '', url: shareUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Share link copied!');
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const resetControls = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  const startProgress = () => {
    stopProgress();
    const duration = media.duration || 5000;
    const startTime = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / duration) * 100;
      if (newProgress >= 100) nextMedia();
      else setProgress(newProgress);
    }, 50);
  };

  const stopProgress = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  const nextMedia = () => {
    if (currentIndex < story.media.length - 1) setCurrentIndex((i) => i + 1);
    else onClose();
  };

  const prevMedia = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  // Only respond to mouse clicks (not touch)
  const handleContainerClick = (e) => {
    if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 3) prevMedia();
    else if (clickX > (rect.width * 2) / 3) nextMedia();
    else if (isVideo) setIsPlaying((p) => !p);
  };

  // --- Swipe gestures ---
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const deltaX = touchEndX.current - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) prevMedia(); // Swipe right
      else nextMedia(); // Swipe left
    } else {
      // If it’s a tap (not swipe), toggle play/pause
      if (isVideo) setIsPlaying((p) => !p);
    }
  };

  // Video & progress effect
  useEffect(() => {
    resetControls();

    if (isVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    } else if (!isVideo && isPlaying) {
      startProgress();
    }

    return () => {
      stopProgress();
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    };
  }, [currentIndex, isPlaying, isVideo]);

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideo) return;

    const handleVideoEnd = () => nextMedia();
    const handleTimeUpdate = () => {
      if (video.duration) {
        const newProgress = (video.currentTime / video.duration) * 100;
        setProgress(newProgress);
      }
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentIndex, isVideo]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // close only when clicking outside content
      }}
    >
      <div
        className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center touch-pan-y"
        onClick={handleContainerClick}
        onMouseMove={resetControls}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress Bars */}
        <div className={`absolute top-3 left-3 right-3 flex gap-1 z-30 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {story.media.map((_, i) => (
            <div key={i} className="h-0.5 bg-white/30 flex-1 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 transition-all"
                style={{ width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%' }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className={`absolute top-5 left-3 right-3 flex justify-between items-center z-30 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg">🎥</div>
            <div>
              <p className="text-white text-sm font-semibold">{story.title}</p>
              <p className="text-white/50 text-xs">{currentIndex + 1} of {story.media.length}</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Media */}
        {isVideo ? (
          <video 
            ref={videoRef} 
            src={media.url} 
            className="w-full h-full object-contain" 
            muted={isMuted} 
            playsInline 
            loop={false}
          />
        ) : (
          <img src={media.url} alt={media.title} className="w-full h-full object-contain" />
        )}

        {/* Bottom Controls */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-white text-base font-semibold">{media.title}</h3>
          {media.description && <p className="text-white/60 text-xs mb-3">{media.description}</p>}

          <div className="flex items-center gap-3 text-white text-sm">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isLiked ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-white/10 hover:bg-white/20'}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>
            <button onClick={handleShare} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Center Play/Pause */}
        {isVideo && (
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={togglePlayPause}
              className="p-4 rounded-full bg-purple-600 hover:bg-purple-700 transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
            </button>
          </div>
        )}

        {/* Mute Button */}
        {isVideo && (
          <button
            onClick={toggleMute}
            className={`absolute bottom-24 right-4 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
          </button>
        )}
      </div>
    </div>
  );
}
