import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Center, Heading } from "native-base";
import React, { useEffect } from "react";
import { RootStackParamList } from "../../App";
import { useStore } from "../store/store";
import { theme } from "../utils/theme";
import { zip } from "../utils/zip";

type LeaderboardProps = NativeStackScreenProps<
  RootStackParamList,
  "LeaderboardScreen"
>;

export default function GameResultsScreen({ navigation }: LeaderboardProps) {
  const game = useStore((store) => store.game);
  const clearGame = useStore((store) => store.clearGame);

  useEffect(() => {
    return () => {
      clearGame();
    };
  });

  if (!game) throw new Error("Game can't be null here");

  const score = zip(
    game.config.questions.map((q) => q.track.artist),
    game.userChoices
  ).reduce(
    (acc, [correctAnswer, userChoice]) =>
      userChoice?.id === correctAnswer.id ? acc + 1 : acc,
    0
  );

  return (
    <Center bg={theme.colors.backgroundGradient} flex={1} safeArea>
      <Heading>
        Score: {score}/{game.config.questions.length}
      </Heading>

      <Button mt="4" onPress={() => navigation.navigate("HomeScreen")}>
        Yay!
      </Button>
    </Center>
  );
}
