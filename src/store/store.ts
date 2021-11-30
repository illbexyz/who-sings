import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import create from "zustand";
import { Artist } from "../models/artist";
import { Game, GameConfig } from "../models/game";
import { Score } from "../models/score";
import { apiBaseUrl } from "../utils/api";

export interface AppState {
  isInitializing: boolean;
  game: Game | null;
  user: string | null;
  scores: Score[];
  createGame: () => void;
  clearGame: () => void;
  answer: (artist: Artist | null) => void;
  nextQuestion: () => void;
  login: (user: string) => void;
  logout: () => void;
  restoreState: () => void;
  saveScore: (points: number) => void;
}

export const QUESTION_TIME_MS = 10000;

const STORAGE_USER_KEY = "who-sings:user";
const STORAGE_SCORES_KEY = "who-sings:scores";

export const useStore = create<AppState>((set, get) => ({
  isInitializing: true,
  game: null,
  user: null,
  scores: [],

  createGame: async () => {
    try {
      const gameRes = await axios.get<GameConfig>(`${apiBaseUrl}/create-game`);
      set((_) => ({
        game: {
          currentIndex: 0,
          config: gameRes.data,
          showCorrectAnswer: false,
          answers: [],
          currentStartTimestamp: new Date().getTime(),
        },
      }));
    } catch (error) {
      console.log("createGame()", error);
    }
  },

  clearGame: () => {
    set((_) => ({ game: null }));
  },

  answer: (artist: Artist | null) => {
    set((state) => {
      if (!state.game) throw new Error("answer(): The game must be defined");

      const answer = {
        artist,
        elapsedMs: new Date().getTime() - state.game.currentStartTimestamp,
      };

      return {
        game: {
          ...state.game,
          showCorrectAnswer: true,
          answers: [...state.game.answers, answer],
        },
      };
    });
  },

  nextQuestion: () => {
    set((state) => {
      if (!state.game)
        throw new Error("nextQuestion(): The game must be defined");

      return {
        game: {
          ...state.game,
          currentIndex: state.game.currentIndex + 1,
          currentStartTimestamp: new Date().getTime(),
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
      const [[_k1, user], [_k2, scores]] = await AsyncStorage.multiGet([
        STORAGE_USER_KEY,
        STORAGE_SCORES_KEY,
      ]);

      if (user) {
        set(() => ({ user }));
      }

      if (scores) {
        set(() => ({ scores: JSON.parse(scores) ?? [] }));
      }
    } catch (error) {
      console.log("restoreState()", error);
    }

    set(() => ({ isInitializing: false }));
  },

  saveScore: async (points: number) => {
    const username = get().user;
    const scores = get().scores;

    if (!username) {
      console.error("saveScore(): user can't be null");
      return;
    }

    const score: Score = { username, points, timestamp: new Date().getTime() };
    const nextScores = [...scores, score];

    set(() => ({ scores: nextScores }));

    AsyncStorage.setItem(STORAGE_SCORES_KEY, JSON.stringify(nextScores));
  },
}));
