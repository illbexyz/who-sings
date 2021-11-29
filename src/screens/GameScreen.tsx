import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, Column, Spinner, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import React, { useEffect } from "react";
import { RootStackParamList } from "../../App";
import GameTimer from "../components/GameTimer";
import { Artist } from "../models/artist";
import { useStore } from "../store/store";
import { theme } from "../utils/theme";

type GameProps = NativeStackScreenProps<RootStackParamList, "GameScreen">;

function buttonBg(
  correctChoice: Artist,
  userChoice: Artist | null,
  currentChoice: Artist
): ColorType {
  if (currentChoice.id === userChoice?.id) {
    return currentChoice.id === correctChoice.id ? "green.400" : "red.400";
  }

  return currentChoice.id === correctChoice.id ? "green.400" : undefined;
}

export default function GameScreen({ navigation }: GameProps) {
  const game = useStore((store) => store.game);
  const createGame = useStore((store) => store.createGame);
  const answer = useStore((store) => store.answer);
  const nextQuestion = useStore((store) => store.nextQuestion);

  useEffect(() => {
    createGame();
  }, []);

  useEffect(() => {
    if (game?.showCorrectAnswer) {
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    }
  }, [game?.showCorrectAnswer]);

  if (!game) {
    return (
      <Center bg={theme.colors.backgroundGradient} flex={1} safeArea>
        <Spinner size="lg" accessibilityLabel="Loading game" />
      </Center>
    );
  }

  if (game.currentIndex > game.config.questions.length - 1) {
    navigation.navigate("GameResultsScreen");
    return <Center bg={theme.colors.backgroundGradient}></Center>;
  }

  const question = game.config.questions[game.currentIndex];
  const userChoice = game.showCorrectAnswer
    ? game.userChoices[game.currentIndex]
    : undefined;

  return (
    <Column
      safeArea
      flex={1}
      alignItems="center"
      justifyContent="center"
      bg={theme.colors.backgroundGradient}
    >
      <Column
        flex={1}
        w={{ base: "full", lg: "50%" }}
        h={{ base: "full", lg: "70%" }}
        px="8"
        py="6"
        alignItems="flex-start"
        maxH={{ xl: 96 }}
      >
        <GameTimer
          isTicking={!game.showCorrectAnswer}
          onTimesUp={() => answer(null)}
        />

        <Text fontSize="md" mt="8">
          Song {game.currentIndex + 1} of {game.config.questions.length}
        </Text>

        <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start" mt="2">
          {question.track.lyrics}
        </Text>

        <Box flex={1} />

        {question.choices.map((choice) => {
          const bgColor =
            userChoice === undefined
              ? undefined
              : buttonBg(question.track.artist, userChoice, choice);
          return (
            <Button
              key={choice.id}
              mt="3"
              w="full"
              justifyContent="flex-start"
              bg={bgColor}
              _focus={{ bg: bgColor }}
              _hover={{ bg: bgColor }}
              _pressed={{ bg: bgColor }}
              onPress={() => answer(choice)}
            >
              {choice.name}
            </Button>
          );
        })}
      </Column>
    </Column>
  );
}
