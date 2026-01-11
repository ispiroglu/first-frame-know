import React from 'react';
import { VideoItem } from '../types';

interface StageProps {
  item: VideoItem;
  isRevealed: boolean;
}

export const Stage: React.FC<StageProps> = ({ item, isRevealed }) => {
  // Use youtube-nocookie.com for better privacy and potentially fewer embed restrictions.
  // We include 'origin' which is often required for the player to initialize correctly in modern browsers.
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  
  // startAt might be string from CSV, ensure it's number
  const startAt = item.startAt ? Number(item.startAt) : 0;
  
  const embedUrl = `https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&start=${startAt}&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${origin}`;

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-zinc-800">
      {/* 
        The Image Layer 
        Visible when !isRevealed.
      */}
      {!isRevealed && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950">
          <img 
            src={item.imageUrl} 
            alt="Guess the frame" 
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback if maxresdefault doesn't exist (common for some videos)
              e.currentTarget.src = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
            }}
          />
        </div>
      )}

      {/* 
        The Video Layer
        Mounted only when revealed.
      */}
      {isRevealed && (
        <div className="absolute inset-0 z-10 bg-black">
          <iframe
            src={embedUrl}
            title={item.title || "Video Player"}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};