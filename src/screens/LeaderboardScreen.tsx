import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Row, ScrollView, Text } from "native-base";
import React, { useCallback } from "react";
import { RootStackParamList } from "../../App";
import ScreenWithTitle from "../components/ScreenWithTitle";
import { bestScores, Score } from "../models/score";
import { useStore } from "../store/store";

type LeaderboardProps = NativeStackScreenProps<
  RootStackParamList,
  "LeaderboardScreen"
>;

interface ScoreProps {
  score: Score;
  idx: number;
}

const LeaderboardScore = ({ score, idx }: ScoreProps) => (
  <Row alignItems="center" overflow="hidden" maxW="100%">
    <Box flexShrink={0} w={8}>
      <Text fontSize="xl">{idx}.</Text>
    </Box>

    <Text
      minW="56"
      flexGrow={1}
      flexShrink={1}
      fontSize="xl"
      isTruncated
      px="2"
    >
      {score.username}
    </Text>

    <Text flexShrink={0} fontSize="2xl" fontWeight="bold">
      {score.points}
    </Text>
  </Row>
);

export default function LeaderboardScreen({ navigation }: LeaderboardProps) {
  const sortedScores = useStore(
    useCallback((store) => bestScores(store.scores).slice(0, 10), [])
  );

  return (
    <ScreenWithTitle title="Top 10 scores">
      {sortedScores.length ? (
        <ScrollView>
          {sortedScores.map((score, idx) => (
            <LeaderboardScore key={idx} score={score} idx={idx + 1} />
          ))}
        </ScrollView>
      ) : (
        <Text fontSize="xl">
          Play some games and check your scores here! 😎
        </Text>
      )}
    </ScreenWithTitle>
  );
}
