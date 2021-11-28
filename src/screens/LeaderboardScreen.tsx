import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Center, Text } from "native-base";
import React from "react";
import { RootStackParamList } from "../../App";

type LeaderboardProps = NativeStackScreenProps<
  RootStackParamList,
  "LeaderboardScreen"
>;

export default function LeaderboardScreen({ navigation }: LeaderboardProps) {
  return (
    <Center>
      <Text>Leaderboard</Text>
    </Center>
  );
}
