import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Artist } from "../../src/models/artist";
import { GameConfig, GameQuestion } from "../../src/models/game";
import { Track } from "../../src/models/track";
import { cors } from "../../src/utils/cors";
import { runMiddleware } from "../../src/utils/middleware";
import {
  musixmatchApiUrl,
  musixmatchGetBody,
  MusixmatchResponse,
  MUSIXMATCH_API_KEY,
} from "../../src/utils/musixmatch";
import { randomIntTo } from "../../src/utils/random";
import { shuffle } from "../../src/utils/shuffle";

interface ArtistResponse {
  artist: {
    artist_id: number;
    artist_name: string;
  };
}

interface TrackResponse {
  track: {
    track_id: number;
    commontrack_id: number;
    artist_id: number;
    artist_name: string;
    track_name: string;
    has_lyrics: 0 | 1;
  };
}

interface LyricsResponse {
  lyrics_id: number;
  lyrics_body: string;
}

function toArtist({ artist }: ArtistResponse): Artist {
  return {
    id: artist.artist_id,
    name: artist.artist_name,
  };
}

async function fetchArtists(pageSize = 20, country = "it"): Promise<Artist[]> {
  const page = randomIntTo(3);
  const url = `${musixmatchApiUrl}/chart.artists.get?page=${page}&page_size=${pageSize}&country=${country}&apikey=${MUSIXMATCH_API_KEY}`;

  try {
    const res = await axios.get<
      MusixmatchResponse<{ artist_list: ArtistResponse[] }>
    >(url);

    return musixmatchGetBody(res.data).artist_list.map(toArtist);
  } catch (error) {
    console.log(error);
    return [];
  }
}

type TrackNoLyrics = Omit<Track, "lyrics">;

function toTrackNoLyrics({ track }: TrackResponse): TrackNoLyrics {
  return {
    id: track.track_id,
    title: track.track_name,
    artist: {
      id: track.artist_id,
      name: track.artist_name,
    },
  };
}

async function fetchTracks(
  pageSize = 5,
  country = "it"
): Promise<TrackNoLyrics[]> {
  const page = randomIntTo(10);
  const tracksUrl = `${musixmatchApiUrl}/chart.tracks.get?page=${page}&page_size=${pageSize}&country=${country}&f_has_lyrics=1&apikey=${MUSIXMATCH_API_KEY}`;

  return await axios
    .get<MusixmatchResponse<{ track_list: TrackResponse[] }>>(tracksUrl)
    .then((r) =>
      musixmatchGetBody(r.data)
        .track_list.filter(({ track }) => track.has_lyrics === 1)
        .map(toTrackNoLyrics)
    );
}

async function fetchLyrics(trackId: number): Promise<LyricsResponse> {
  const lyricsUrl = `${musixmatchApiUrl}/track.lyrics.get?track_id=${trackId}&apikey=${MUSIXMATCH_API_KEY}`;

  return await axios
    .get<MusixmatchResponse<{ lyrics: LyricsResponse }>>(lyricsUrl)
    .then((r) => musixmatchGetBody(r.data).lyrics);
}

function getRandomLine(lyrics: LyricsResponse): string {
  const lines = lyrics.lyrics_body
    .split("\n")
    .filter((line) => line.length !== 0);
  const randomIndex = randomIntTo(Math.max(0, lines.length - 5));
  return `${lines[randomIndex]}\n${lines[randomIndex + 1]}`;
}

function randomizeChoices(howMany: number, artists: Artist[]) {
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

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GameConfig>
) => {
  await runMiddleware(req, res, cors);

  // res.status(200).send(mockGame());
  // return;

  try {
    const [tracksResponse, artistsResponse] = await Promise.all([
      fetchTracks(),
      fetchArtists(),
    ]);

    const tracks: Track[] = await Promise.all(
      tracksResponse.map((track) =>
        fetchLyrics(track.id).then((lyrics) => {
          return {
            ...track,
            lyrics: getRandomLine(lyrics),
          };
        })
      )
    );

    const questions: GameQuestion[] = tracks.map((track) => ({
      track,
      choices: shuffle([
        ...randomizeChoices(
          3,
          artistsResponse.filter((artist) => artist.id !== track.artist.id)
        ),
        track.artist,
      ]),
    }));

    res.status(200).send({ questions });
  } catch (error) {
    console.log(error);
    res.status(500).send({ questions: [] });
  }
};
