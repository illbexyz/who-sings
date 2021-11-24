import create from "zustand";

export interface Game {
  currentIndex: number;
}

export interface AppState {
  game: Game | null;
}

export const useStore = create<AppState>((set) => ({
  game: null,
  beginGame: (game: Game) => set((_) => ({ game })),
}));
