import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Column, Text } from "native-base";
import React, { useCallback } from "react";
import { RootStackParamList } from "../../App";
import { Score } from "../models/score";
import { useStore } from "../store/store";
import { theme } from "../utils/theme";

type LeaderboardProps = NativeStackScreenProps<
  RootStackParamList,
  "LeaderboardScreen"
>;

interface ScoreProps {
  score: Score;
}

const LeaderboardScore = ({ score }: ScoreProps) => (
  <Box>
    <Text>
      {score.username}: {score.points}
    </Text>
  </Box>
);

export default function LeaderboardScreen({ navigation }: LeaderboardProps) {
  const sortedScores = useStore(
    useCallback(
      (store) => [...store.scores].sort((s1, s2) => s2.points - s1.points),
      []
    )
  );

  return (
    <Column safeArea flex={1} bg={theme.colors.backgroundGradient} p={8}>
      {sortedScores.map((score, idx) => (
        <LeaderboardScore key={idx} score={score} />
      ))}
    </Column>
  );
}
