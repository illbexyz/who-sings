import { Artist } from "../models/artist";
import { Track } from "../models/track";
import { randomIntTo } from "./random";

export interface MusixmatchResponse<T> {
  message: {
    header: {
      status_code: 200 | 400 | 401 | 402 | 403 | 404 | 405 | 500 | 503;
      execute_time: number;
    };
    body: T;
  };
}

export const MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY;

export const musixmatchApiUrl = "https://api.musixmatch.com/ws/1.1";

export interface ArtistResponse {
  artist: {
    artist_id: number;
    artist_name: string;
  };
}

export interface TrackResponse {
  track: {
    track_id: number;
    commontrack_id: number;
    artist_id: number;
    artist_name: string;
    track_name: string;
    has_lyrics: 0 | 1;
  };
}

export interface LyricsResponse {
  lyrics_id: number;
  lyrics_body: string;
}

export type TrackNoLyrics = Omit<Track, "lyrics">;

export function musixmatchGetBody<T>(
  musixmatchResponse: MusixmatchResponse<T>
): T {
  return musixmatchResponse.message.body;
}

export function toArtist({ artist }: ArtistResponse): Artist {
  return {
    id: artist.artist_id,
    name: artist.artist_name,
  };
}

export function toTrackNoLyrics({ track }: TrackResponse): TrackNoLyrics {
  return {
    id: track.track_id,
    title: track.track_name,
    artist: {
      id: track.artist_id,
      name: track.artist_name,
    },
  };
}

export function getRandomLine(lyrics: LyricsResponse): string {
  const lines = lyrics.lyrics_body
    .split("\n")
    .filter((line) => line.length !== 0);
  const randomIndex = randomIntTo(Math.max(0, lines.length - 5));
  return `${lines[randomIndex]}\n${lines[randomIndex + 1]}`;
}

export function randomizeChoices(howMany: number, artists: Artist[]) {
  if (artists.length < howMany) {
    throw new Error(`Artists.length: ${artists.length}, howMany: ${howMany}`);
  }

  const choices = [];
  const remainingChoices = [...artists];

  for (let i = 0; i < howMany; i++) {
    const index = randomIntTo(remainingChoices.length - 1);
    const [artist] = remainingChoices.splice(index, 1);
    choices.push(artist);
  }

  return choices;
}
