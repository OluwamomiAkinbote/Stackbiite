'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import StoryContent from './StoryContent';

export default function StoryViewer({ story, onClose = () => {} }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [views, setViews] = useState(0);

  const videoRef = useRef(null);
  const progressInterval = useRef(null);
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

  // ✅ Track views per device
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

  // ✅ Progress timer for image stories
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
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const nextMedia = () => {
    if (currentIndex < story.media.length - 1) {
      setCurrentIndex((i) => i + 1);
      setProgress(0);
    } else if (isBackHome) {
      router.push('/');
    } else {
      onClose();
    }
  };

  const prevMedia = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setProgress(0);
    }
  };

  const togglePlayPause = () => {
    if (isVideo && videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  // ✅ Handle media playback and progress updates
  useEffect(() => {
    setProgress(0);
    if (isVideo && videoRef.current) {
      if (isPlaying) videoRef.current.play().catch(console.error);
      else videoRef.current.pause();
    } else if (!isVideo && !isBackHome && isPlaying) {
      startProgress();
    }
    return stopProgress;
  }, [currentIndex, isPlaying]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 sm:p-4">
      <div className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center">
        <StoryContent
          story={story}
          media={media}
          currentIndex={currentIndex}
          progress={progress}
          isPlaying={isPlaying}
          isVideo={isVideo}
          isBackHome={isBackHome}
          views={views}
          videoRef={videoRef}
          onNext={nextMedia}
          onPrev={prevMedia}
          onClose={onClose}
          onTogglePlayPause={togglePlayPause}
        />
      </div>
    </div>
  );
}
