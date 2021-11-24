import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Artist } from "../../../src/models/artist";

const MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY;

interface MusixmatchResponse<T> {
  message: {
    header: {
      status_code: 200 | 400 | 401 | 402 | 403 | 404 | 405 | 500 | 503;
      execute_time: number;
    };
    body: T;
  };
}

interface ArtistResponse {
  artist: {
    artist_id: number;
    artist_name: string;
  };
}

interface ArtistListResponse {
  artist_list: ArtistResponse[];
}

const baseUrl = "https://api.musixmatch.com/ws/1.1";

function getBody<T>(musixmatchResponse: MusixmatchResponse<T>): T {
  return musixmatchResponse.message.body;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{ artists: Artist[] }>
) => {
  const page = 1;
  const pageSize = 10;
  const country = "it";
  const url = `${baseUrl}/chart.artists.get?page=${page}&page_size=${pageSize}&country=${country}&apikey=${MUSIXMATCH_API_KEY}`;

  const apiRes = await axios
    .get<MusixmatchResponse<ArtistListResponse>>(url)
    .then((r) => getBody(r.data));

  const artists: Artist[] = apiRes.artist_list.map((artist) => ({
    id: artist.artist.artist_id,
    name: artist.artist.artist_name,
  }));

  res.status(200).send({ artists });
};