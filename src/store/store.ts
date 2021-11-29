import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import create from "zustand";
import { Artist } from "../models/artist";
import { Game, GameConfig } from "../models/game";
import { apiBaseUrl } from "../utils/api";

export interface AppState {
  isInitializing: boolean;
  game: Game | null;
  user: string | null;
  createGame: () => void;
  clearGame: () => void;
  answer: (artist: Artist | null) => void;
  nextQuestion: () => void;
  login: (user: string) => void;
  logout: () => void;
  restoreState: () => void;
}

export const QUESTION_TIME_MS = 10000;
const STORAGE_USER_KEY = "who-sings:user";

export const useStore = create<AppState>((set) => ({
  isInitializing: true,
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

  login: (user: string) => {
    set((_) => ({ user }));

    AsyncStorage.setItem(STORAGE_USER_KEY, user);
  },

  logout: () => {
    set((_) => ({ user: null }));

    AsyncStorage.removeItem(STORAGE_USER_KEY);
  },

  restoreState: async () => {
    set(() => ({ isInitializing: true }));

    try {
      const user = await AsyncStorage.getItem(STORAGE_USER_KEY);

      if (user) {
        set(() => ({ user }));
      }
    } catch (error) {}

    set(() => ({ isInitializing: false }));
  },
}));
