export interface VideoItem {
  id: number;
  imageUrl: string; // The "First Frame" or hint image
  youtubeId: string;
  startAt?: number; // Optional start time in seconds
  title?: string; // Internal use for moderator only
  level?: 'easy' | 'medium' | 'hard' | string; // Difficulty level from CSV
}

export type GameStatus = 'idle' | 'playing' | 'finished';

export interface GameState {
  status: GameStatus;
  currentRoundIndex: number;
  isRevealed: boolean; // True = Video Playing, False = Showing Image
  playlist: VideoItem[];
}