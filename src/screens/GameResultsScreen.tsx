import { useFocusEffect } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Center, Column, Heading, Text } from "native-base";
import React, { useCallback } from "react";
import { RootStackParamList } from "../../App";
import { scoreOfGame } from "../models/score";
import { useStore } from "../store/store";
import { theme } from "../utils/theme";

type LeaderboardProps = NativeStackScreenProps<
  RootStackParamList,
  "LeaderboardScreen"
>;

const Container: React.FC = ({ children }) => (
  <Center bg={theme.colors.backgroundGradient} flex={1} safeArea>
    {children}
  </Center>
);

export default function GameResultsScreen({ navigation }: LeaderboardProps) {
  const score = useStore((store) =>
    store.game ? scoreOfGame(store.game) : null
  );
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
    return (
      <Container>
        <Text>Something went wrong</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Heading>Score: {score}</Heading>

      <Column>
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
    </Container>
  );
}
