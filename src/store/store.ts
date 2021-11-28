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

export const QUESTION_TIME_MS = 10000;

export const useStore = create<AppState>((set) => ({
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
