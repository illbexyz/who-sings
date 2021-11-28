import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Artist } from "../../../src/models/artist";
import { cors } from "../cors";
import { runMiddleware } from "../middlewares";
import {
  baseUrl,
  getBody,
  MusixmatchResponse,
  MUSIXMATCH_API_KEY,
} from "../utils";

interface ArtistResponse {
  artist: {
    artist_id: number;
    artist_name: string;
  };
}

interface ArtistListResponse {
  artist_list: ArtistResponse[];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{ artists: Artist[] }>
) => {
  await runMiddleware(req, res, cors);

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
