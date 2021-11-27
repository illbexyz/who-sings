import create from "zustand";

export interface Game {
  currentIndex: number;
}

export interface AppState {
  game: Game | null;
  user: string | null;
  beginGame: (game: Game) => void;
  login: (user: string) => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  game: null,
  user: null,
  beginGame: (game: Game) => set((_) => ({ game })),
  login: (user: string) => set((_) => ({ user })),
  logout: () => set((_) => ({ user: null })),
}));
