'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Play, Pause, Volume2, VolumeX, Share2, ChevronLeft, ChevronRight, Home, Eye, Link2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StoryViewer({ story, onClose = () => {} }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [views, setViews] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef(null);
  const progressInterval = useRef(null);
  const controlsTimeout = useRef(null);
  const router = useRouter();

  const media = story.media[currentIndex];
  const isVideo = media.type === 'video';
  const isBackHome = media.isBackHome;

  const getDeviceId = () => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = btoa(navigator.userAgent + Date.now()).substring(0, 16);
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  };

  useEffect(() => {
    const deviceId = getDeviceId();
    const viewedDevices = JSON.parse(localStorage.getItem(`viewed_${story.id}_${media.id}`) || '[]');
    let newViews = parseInt(localStorage.getItem(`views_${story.id}_${media.id}`) || '0');
    if (!viewedDevices.includes(deviceId)) {
      viewedDevices.push(deviceId);
      localStorage.setItem(`viewed_${story.id}_${media.id}`, JSON.stringify(viewedDevices));
      newViews += 1;
      localStorage.setItem(`views_${story.id}_${media.id}`, newViews.toString());
    }
    setViews(newViews);
  }, [story.id, media.id]);

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

  const nextMedia = (e) => {
    if (e) e.stopPropagation();
    if (currentIndex < story.media.length - 1) setCurrentIndex((i) => i + 1);
    else if (isBackHome) router.push('/');
    else onClose();
  };

  const prevMedia = (e) => {
    if (e) e.stopPropagation();
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
    if (isVideo && videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    resetControls();
    setProgress(0);
    if (isVideo && videoRef.current) {
      if (isPlaying) videoRef.current.play().catch(console.error);
      else videoRef.current.pause();
    } else if (!isVideo && !isBackHome && isPlaying) startProgress();
    return () => {
      stopProgress();
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    };
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideo) return;
    const handleVideoEnd = () => nextMedia();
    const handleTimeUpdate = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100);
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
      onClick={handleBackgroundClick}
    >
      <div
        className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center"
        onMouseMove={resetControls}
      >
        {/* Progress Bars */}
        {!isBackHome && (
          <div
            className={`absolute top-3 left-3 right-3 flex gap-1 z-30 transition-opacity ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {story.media.map((_, i) => (
              <div key={i} className="h-0.5 bg-white/30 flex-1 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 transition-all"
                  style={{
                    width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%',
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Back Home Slide */}
        {isBackHome ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6"
            style={{ backgroundImage: `url(${media.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="backdrop-blur-xl bg-black/40 rounded-3xl p-8 shadow-2xl animate-fadeIn">
              <Home className="w-12 h-12 mb-4 text-green-400 animate-bounce" />
              <h2 className="text-2xl font-bold mb-3 tracking-wide text-white">{media.title}</h2>
              <p className="text-gray-200 text-sm mb-6 leading-relaxed">{media.description}</p>
              <Link
                href={media.link || '/'}
                onClick={onClose}
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold hover:scale-105 hover:from-green-300 transition-all"
              >
                {media.linkText || '← Back to Home'}
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Media */}
            <div className="relative w-full h-full flex items-center justify-center">
              {isVideo ? (
                <video
                  ref={videoRef}
                  src={media.url}
                  className="w-full h-full object-contain"
                  muted={isMuted}
                  playsInline
                  loop={false}
                  onClick={nextMedia}
                />
              ) : (
                <img
                  src={media.url}
                  alt={media.title}
                  className="w-full h-full object-contain"
                  onClick={nextMedia}
                />
              )}

              {/* Overlay Controls */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                {/* Header */}
                <div className="flex justify-between items-center pointer-events-auto">
                  <img src={story.avatar} alt={story.title} className="w-9 h-9 rounded-full border-2 border-white" />
                  <button
                    onClick={handleClose}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 pointer-events-auto"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Title & Description with Black Gradient */}
                <div className="absolute bottom-24 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent text-center rounded-t-xl pointer-events-none">
                  <h2 className="text-lg font-bold mb-1 text-white">{media.title}</h2>
                  {media.description && <p className="text-sm text-gray-200">{media.description}</p>}

                  {/* Views, Share & Link */}
                  <div className="flex justify-center items-center gap-2 mt-2 pointer-events-auto">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-600 text-white text-xs">
                      <Eye className="w-3 h-3" />
                      <span>{views}</span>
                    </div>

                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-600 text-white text-xs"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>Share</span>
                    </button>

                    {media.link && (
                      <Link
                        href={media.link}
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-600 text-white text-xs"
                      >
                        <Link2 className="w-3 h-3" />
                        <span>{media.linkText || 'Link'}</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Center Play/Pause for videos */}
                {isVideo && (
                  <div className="flex justify-center items-center pointer-events-auto">
                    <button
                      onClick={togglePlayPause}
                      className="p-4 rounded-full bg-purple-600 hover:bg-purple-700"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation */}
              {story.media.length > 1 && (
                <>
                  {currentIndex > 0 && (
                    <button
                      onClick={prevMedia}
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 sm:p-3 rounded-full transition-all z-40 pointer-events-auto"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                  )}
                  {currentIndex < story.media.length - 1 && (
                    <button
                      onClick={nextMedia}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 sm:p-3 rounded-full transition-all z-40 pointer-events-auto"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}