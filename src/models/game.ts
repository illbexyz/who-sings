import { Artist } from "./artist";
import { Track } from "./track";

export interface GameQuestion {
  track: Track;
  choices: Artist[];
}

export interface GameConfig {
  questions: GameQuestion[];
}

export interface GameAnswer {
  artist: Artist | null;
  elapsedMs: number;
}

export interface Game {
  currentIndex: number;
  currentStartTimestamp: number;
  showCorrectAnswer: boolean;
  answers: GameAnswer[];
  config: GameConfig;
}

export function gameHasNextQuestion(game: Game): boolean {
  return game.currentIndex + 1 in game.config.questions;
}
