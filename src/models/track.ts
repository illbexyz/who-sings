import { Artist } from "./artist";

export interface Track {
  id: number;
  title: string;
  lyrics: string;
  artist: Artist;
}
