import React from "react";
import { ActivityIndicator, Platform, Text } from "react-native";
import useSWR from "swr";
import { Artist } from "../models/artist";

function baseUrl() {
  if (Platform.OS === "web") {
    return "";
  } else {
    return "https://who-sings-blond.vercel.app";
  }
}

function fetchArtists(url: string): Promise<{ artists: Artist[] }> {
  return fetch(url).then((res) => res.json());
}

export default function Artists() {
  const { data, error } = useSWR(`${baseUrl()}/api/artists`, fetchArtists);

  if (error) return <Text>Failed to load</Text>;

  if (!data) return <ActivityIndicator />;

  return <Text>{data.artists.map((a) => a.name).join(", ")}</Text>;
}
