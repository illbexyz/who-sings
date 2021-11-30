import { useFocusEffect } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Column, Heading, Row, Text } from "native-base";
import React, { useCallback } from "react";
import { RootStackParamList } from "../../App";
import Error from "../components/Error";
import ScreenWithTitle from "../components/ScreenWithTitle";
import {
  bonusPointsOfGame,
  rightAnswersOfGame,
  RIGHT_ANSWER_SCORE,
} from "../models/score";
import { useStore } from "../store/store";

type LeaderboardProps = NativeStackScreenProps<
  RootStackParamList,
  "LeaderboardScreen"
>;

export default function GameResultsScreen({ navigation }: LeaderboardProps) {
  const game = useStore((store) => store.game);
  const [rightAnswers, bonusPoints] = useStore(
    useCallback(
      (store) =>
        store.game
          ? [rightAnswersOfGame(store.game), bonusPointsOfGame(store.game)]
          : [null, null],
      [game]
    )
  );

  const score =
    rightAnswers &&
    bonusPoints &&
    rightAnswers * RIGHT_ANSWER_SCORE + bonusPoints;

  const clearGame = useStore((store) => store.clearGame);
  const saveScore = useStore((store) => store.saveScore);

  useFocusEffect(
    useCallback(() => {
      if (score != null) {
        saveScore(score);
      }
    }, [score])
  );

  if (score == null) {
    return <Error />;
  }

  return (
    <ScreenWithTitle title={`Results`}>
      <Column flexGrow={1} maxH={{ sm: 96 }}>
        <Text fontSize="xl">Score</Text>
        <Heading fontSize="7xl">{score}</Heading>

        <Row>
          <Text w="32" fontSize="xl">
            {rightAnswers}/{game?.config.questions.length} songs{" "}
          </Text>
          <Text fontSize="xl">{rightAnswers! * RIGHT_ANSWER_SCORE}</Text>
        </Row>

        <Row>
          <Text w="32" fontSize="xl">
            Time bonus
          </Text>
          <Text fontSize="xl">{bonusPoints}</Text>
        </Row>

        <Box flex={1}></Box>

        <Button
          mt="8"
          onPress={() => {
            clearGame();
            navigation.replace("GameScreen");
          }}
        >
          Play Again
        </Button>

        <Button mt="4" onPress={() => navigation.pop()}>
          Home
        </Button>
      </Column>
    </ScreenWithTitle>
  );
}
