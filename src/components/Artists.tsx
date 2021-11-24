import { ActivityIndicator, Text } from "react-native";
import useSWR from "swr";
import { Artist } from "../models/artist";

const fetchArtists = (url: string): Promise<{ artists: Artist[] }> =>
  fetch(url).then((res) => res.json());

export default function Artists() {
  const { data, error } = useSWR("/api/artists", fetchArtists);

  if (error) return <Text>Failed to load</Text>;

  if (!data) return <ActivityIndicator />;

  return <Text>{data.artists.map((a) => a.name).join(", ")}</Text>;
}
