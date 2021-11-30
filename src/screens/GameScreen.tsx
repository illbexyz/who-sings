import { useFocusEffect } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, Column, Spinner, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import React, { useCallback } from "react";
import { RootStackParamList } from "../../App";
import GameTimer from "../components/GameTimer";
import { Artist } from "../models/artist";
import { Game, gameHasNextQuestion } from "../models/game";
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

const Loader = () => (
  <Center bg={theme.colors.backgroundGradient} flex={1} safeArea>
    <Spinner size="lg" accessibilityLabel="Loading game" />
  </Center>
);

export default function GameScreen({ navigation }: GameProps) {
  const [game, createGame, nextQuestion, answer] = useStore((store) => [
    store.game,
    store.createGame,
    store.nextQuestion,
    store.answer,
  ]);

  const answerThenGoNext = useCallback(
    (game: Game, artist: Artist | null) => {
      answer(artist);

      setTimeout(() => {
        if (gameHasNextQuestion(game)) {
          nextQuestion();
        } else {
          navigation.replace("GameResultsScreen");
        }
      }, 1000);
    },
    [navigation, game]
  );

  useFocusEffect(
    useCallback(() => {
      createGame();
    }, [])
  );

  const question = game?.config.questions[game.currentIndex];

  if (!question) {
    return <Loader />;
  }

  const userChoice = game.showCorrectAnswer
    ? game.answers[game.currentIndex]
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
        w={{ base: "full", sm: "85%", xl: "50%" }}
        px="8"
        py="6"
        alignItems="flex-start"
        _web={{
          maxH: {
            base: 175,
          },
        }}
      >
        <GameTimer
          isTicking={!game.showCorrectAnswer}
          onTimesUp={() => {
            answerThenGoNext(game, null);
          }}
        />

        <Text fontSize="md" mt="8">
          Song {game.currentIndex + 1} of {game.config.questions.length}
        </Text>

        <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start" mt="2">
          {question.track.lyrics}
        </Text>

        <Box flex={1} minH="16" />

        {question.choices.map((artist) => {
          const bgColor =
            userChoice === undefined
              ? undefined
              : buttonBg(question.track.artist, userChoice.artist, artist);

          return (
            <Button
              key={artist.id}
              mt="3"
              w="full"
              justifyContent="flex-start"
              bg={bgColor}
              _focus={{ bg: bgColor }}
              _hover={{ bg: bgColor }}
              _pressed={{ bg: bgColor }}
              onPress={() => {
                answerThenGoNext(game, artist);
              }}
            >
              {artist.name}
            </Button>
          );
        })}
      </Column>
    </Column>
  );
}
