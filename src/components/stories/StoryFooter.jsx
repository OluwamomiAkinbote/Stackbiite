'use client';

import React, { useState } from 'react';

export const StoryFooter = ({
  story,
  user,
  onReply,
  onLike,
  onShare
}) => {
  const [message, setMessage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !onReply) return;
    
    setIsSending(true);
    try {
      await onReply(message);
      setMessage('');
    } catch (error) {
      console.error('Failed to send reply:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLike) onLike();
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
      <div className="flex items-center gap-3">
        {/* Reply Form */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Reply to ${user.username}...`}
              disabled={isSending}
              className="w-full px-4 py-2.5 bg-black/40 text-white rounded-full border border-white/30 focus:outline-none focus:border-white/60 text-sm placeholder:text-white/60 disabled:opacity-50"
            />
            {message.trim() && (
              <button
                type="submit"
                disabled={isSending}
                className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
            )}
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="text-white hover:scale-110 transition-transform"
            aria-label="Like"
          >
            <svg 
              className={`w-7 h-7 ${isLiked ? 'text-red-500 fill-current' : 'stroke-current'}`} 
              fill={isLiked ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Share Button */}
          <button
            onClick={onShare}
            className="text-white hover:scale-110 transition-transform"
            aria-label="Share"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>

          {/* More Options Button */}
          <button
            className="text-white hover:scale-110 transition-transform"
            aria-label="More options"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};