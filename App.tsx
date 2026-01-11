import React, { useState, useCallback } from 'react';
import { GameState, VideoItem } from './types';
import { INITIAL_DATA } from './constants';
import { shuffleArray } from './utils/gameUtils';
import { Stage } from './components/Stage';
import { Controls } from './components/Controls';
import { EndScreen } from './components/EndScreen';
import { CsvUpload } from './components/CsvUpload';
import { Clapperboard } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'idle', 
    currentRoundIndex: 0,
    isRevealed: false,
    playlist: [],
  });

  // Handler for uploading CSV
  const handleDataLoaded = useCallback((data: VideoItem[]) => {
    const shuffled = shuffleArray(data);
    setGameState({
      status: 'playing',
      currentRoundIndex: 0,
      isRevealed: false,
      playlist: shuffled,
    });
  }, []);

  // Handler for Demo Mode
  const handleUseDemo = useCallback(() => {
    handleDataLoaded(INITIAL_DATA);
  }, [handleDataLoaded]);

  const handleRestart = () => {
    setGameState({
      status: 'idle',
      currentRoundIndex: 0,
      isRevealed: false,
      playlist: [],
    });
  };

  const handleReveal = () => {
    setGameState(prev => ({ ...prev, isRevealed: true }));
  };

  const handleNext = () => {
    setGameState(prev => {
      const nextIndex = prev.currentRoundIndex + 1;
      
      // Check if game is over
      if (nextIndex >= prev.playlist.length) {
        return { ...prev, status: 'finished' };
      }

      // Move to next item, reset reveal state
      return {
        ...prev,
        currentRoundIndex: nextIndex,
        isRevealed: false,
      };
    });
  };

  const currentItem = gameState.playlist[gameState.currentRoundIndex];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/30">
      
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Clapperboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">First Frame Know</h1>
          </div>
          
          {gameState.status === 'playing' && (
            <div className="text-sm font-medium px-4 py-1.5 bg-zinc-800 rounded-full border border-zinc-700">
              <span className="text-zinc-400 mr-2">Progress</span>
              <span className="text-white">{gameState.currentRoundIndex + 1}</span>
              <span className="text-zinc-500 mx-1">/</span>
              <span className="text-zinc-400">{gameState.playlist.length}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-start pt-8 pb-12 px-4 sm:px-6">
        
        {/* Idle / Upload State */}
        {gameState.status === 'idle' && (
          <div className="w-full flex flex-col items-center justify-center pt-8">
            <CsvUpload 
              onDataLoaded={handleDataLoaded} 
              onUseDemo={handleUseDemo} 
            />
          </div>
        )}

        {/* Game Active State */}
        {gameState.status === 'playing' && currentItem && (
          <div className="w-full max-w-5xl flex flex-col items-center animate-fade-in">
            {/* The Stage (Video/Image) */}
            <Stage 
              item={currentItem} 
              isRevealed={gameState.isRevealed} 
            />

            {/* Hint / ID Display for Moderator */}
            <div className="mt-4 flex items-center gap-4 text-xs text-zinc-600 font-mono uppercase tracking-widest">
              <span>ID: {currentItem.id}</span>
              <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
              <span>{gameState.isRevealed ? currentItem.title : 'HIDDEN'}</span>
              {currentItem.level && (
                <>
                  <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
                  <span className={`
                    ${currentItem.level.toLowerCase() === 'hard' ? 'text-red-900' : ''}
                    ${currentItem.level.toLowerCase() === 'medium' ? 'text-yellow-900' : ''}
                    ${currentItem.level.toLowerCase() === 'easy' ? 'text-green-900' : ''}
                  `}>
                    {currentItem.level}
                  </span>
                </>
              )}
            </div>

            {/* Controls */}
            <Controls 
              isRevealed={gameState.isRevealed}
              onReveal={handleReveal}
              onNext={handleNext}
              isLastItem={gameState.currentRoundIndex === gameState.playlist.length - 1}
            />
          </div>
        )}

        {/* Game Finished State */}
        {gameState.status === 'finished' && (
          <EndScreen onRestart={handleRestart} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-zinc-600 text-sm">
        <p>Moderator Dashboard • Press F11 for Fullscreen</p>
      </footer>
    </div>
  );
};

export default App;