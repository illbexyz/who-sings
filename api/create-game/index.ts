import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Artist } from "../../src/models/artist";
import { GameConfig, GameQuestion } from "../../src/models/game";
import { Track } from "../../src/models/track";
import { cors } from "../../src/utils/cors";
import { runMiddleware } from "../../src/utils/middleware";
import {
  ArtistResponse,
  getRandomLine,
  LyricsResponse,
  musixmatchApiUrl,
  musixmatchGetBody,
  MusixmatchResponse,
  MUSIXMATCH_API_KEY,
  randomizeChoices,
  toArtist,
  toTrackNoLyrics,
  TrackNoLyrics,
  TrackResponse,
} from "../../src/utils/musixmatch";
import { randomIntTo } from "../../src/utils/random";
import { shuffle } from "../../src/utils/shuffle";

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

async function fetchTracks(
  pageSize = 5,
  country = "it"
): Promise<TrackNoLyrics[]> {
  const page = randomIntTo(5);
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
