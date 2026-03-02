'use client';

import React, { useState } from 'react';

export const StoryFooter = ({ user }) => {
  const [message, setMessage] = useState('');

  const handleSendWhatsApp = () => {
    if (!message.trim()) return;
    const phone = '08149492012';
    const text = encodeURIComponent(`Reply to ${user.username}: ${message}`);
    const whatsappUrl = `https://wa.me/${phone}?text=${text}`;
    window.open(whatsappUrl, '_blank');
    setMessage('');
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
      {/* Reply Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Reply to ${user.username}...`}
          className="flex-1 px-4 py-2.5 bg-black/40 text-white rounded-full border border-white/30 focus:outline-none focus:border-white/60 text-sm placeholder:text-white/60"
        />
        {message.trim() && (
          <button
            onClick={handleSendWhatsApp}
            className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
};