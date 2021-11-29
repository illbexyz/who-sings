import { Artist } from "./artist";
import { Track } from "./track";

export interface GameQuestion {
  track: Track;
  choices: Artist[];
}

export interface GameConfig {
  questions: GameQuestion[];
}

export interface Game {
  currentIndex: number;
  showCorrectAnswer: boolean;
  userChoices: (Artist | null)[];
  config: GameConfig;
}
