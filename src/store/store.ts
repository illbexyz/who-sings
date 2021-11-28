import axios from "axios";
import create from "zustand";
import { Artist } from "../models/artist";
import { GameConfig } from "../models/game";
import { apiBaseUrl } from "../utils/api";

export interface Game {
  currentIndex: number;
  showCorrectAnswer: boolean;
  userChoices: (Artist | null)[];
  config: GameConfig;
  timer: number;
}

export interface AppState {
  game: Game | null;
  user: string | null;
  createGame: () => void;
  clearGame: () => void;
  answer: (artist: Artist | null) => void;
  nextQuestion: () => void;
  login: (user: string) => void;
  logout: () => void;
}

export const QUESTION_TIME_SECONDS = 10;

export const useStore = create<AppState>((set, get) => ({
  game: null,
  user: null,

  createGame: async () => {
    try {
      const gameRes = await axios.get<GameConfig>(`${apiBaseUrl}/create-game`);
      set((_) => ({
        game: {
          currentIndex: 0,
          config: gameRes.data,
          showCorrectAnswer: false,
          userChoices: [],
          timer: QUESTION_TIME_SECONDS - 2,
          timerIntervalRef: null,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  },

  clearGame: () => {
    set((_) => ({ game: null }));
  },

  answer: (artist: Artist | null) => {
    if (get().game?.showCorrectAnswer) return;

    set((state) => {
      if (!state.game) throw new Error();

      return {
        game: {
          ...state.game,
          showCorrectAnswer: true,
          userChoices: [...state.game.userChoices, artist],
        },
      };
    });

    setTimeout(() => {
      get().nextQuestion();
    }, 1000);
  },

  nextQuestion: () => {
    set((state) => {
      if (!state.game) throw new Error();

      return {
        game: {
          ...state.game,
          currentIndex: state.game.currentIndex + 1,
          showCorrectAnswer: false,
        },
      };
    });
  },

  login: (user: string) => set((_) => ({ user })),

  logout: () => set((_) => ({ user: null })),
}));
