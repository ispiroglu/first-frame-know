import React from 'react';
import { RefreshCw, Trophy } from 'lucide-react';

interface EndScreenProps {
  onRestart: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[60vh] text-center space-y-8 animate-fade-in">
      <div className="p-8 bg-zinc-900 rounded-full border-4 border-yellow-500/20 shadow-2xl shadow-yellow-500/10">
        <Trophy className="w-24 h-24 text-yellow-500" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-4xl font-extrabold text-white tracking-tight">Competition Complete!</h2>
        <p className="text-zinc-400 text-lg">Thank you for playing.</p>
      </div>

      <button
        onClick={onRestart}
        className="
          flex items-center gap-3 px-8 py-4 mt-8
          bg-indigo-600 hover:bg-indigo-500 text-white 
          rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-indigo-500/20
        "
      >
        <RefreshCw className="w-6 h-6" />
        Start New Game
      </button>
    </div>
  );
};