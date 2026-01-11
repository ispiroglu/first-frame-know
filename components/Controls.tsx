import React from 'react';
import { Play, SkipForward, RefreshCw } from 'lucide-react';

interface ControlsProps {
  isRevealed: boolean;
  onReveal: () => void;
  onNext: () => void;
  isLastItem: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ isRevealed, onReveal, onNext, isLastItem }) => {
  return (
    <div className="grid grid-cols-2 gap-6 w-full max-w-4xl mx-auto mt-8">
      {/* Reveal / Play Button */}
      <button
        onClick={onReveal}
        disabled={isRevealed}
        className={`
          flex items-center justify-center gap-3 p-6 rounded-xl text-xl font-bold transition-all transform active:scale-95 shadow-lg
          ${isRevealed 
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50' 
            : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-500/20'
          }
        `}
      >
        <Play className="w-8 h-8 fill-current" />
        {isRevealed ? 'PLAYING...' : 'REVEAL ANSWER'}
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="
          flex items-center justify-center gap-3 p-6 rounded-xl text-xl font-bold 
          bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-all transform active:scale-95 shadow-lg
        "
      >
        {isLastItem ? (
          <>
            <RefreshCw className="w-8 h-8" />
            FINISH GAME
          </>
        ) : (
          <>
            <SkipForward className="w-8 h-8" />
            NEXT VIDEO
          </>
        )}
      </button>
    </div>
  );
};