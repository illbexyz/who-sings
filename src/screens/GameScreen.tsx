import { useFocusEffect } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Column, Text, useTheme } from "native-base";
import React, { useCallback } from "react";
import { RootStackParamList } from "../../App";
import GameButton from "../components/GameButton";
import GameTimer from "../components/GameTimer";
import ScreenWithLoader from "../components/ScreenWithLoader";
import { Artist } from "../models/artist";
import { Game, gameHasNextQuestion } from "../models/game";
import { useStore } from "../store/store";

type GameProps = NativeStackScreenProps<RootStackParamList, "GameScreen">;

export default function GameScreen({ navigation }: GameProps) {
  const theme = useTheme();
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
    return <ScreenWithLoader />;
  }

  const userChoice = game.showCorrectAnswer
    ? game.answers[game.currentIndex]
    : undefined;

  return (
    <Column
      safeArea
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      bg={theme.colors.backgroundGradient}
    >
      <Column
        flexGrow={1}
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
          onTimesUp={() => answerThenGoNext(game, null)}
        />

        <Text fontSize="md" mt="8">
          Song {game.currentIndex + 1} of {game.config.questions.length}
        </Text>

        <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start" mt="2">
          {question.track.lyrics}
        </Text>

        <Box flexGrow={1} minH="16" />

        {question.choices.map((artist) => (
          <GameButton
            key={artist.id}
            artist={artist}
            question={question}
            userChoice={userChoice}
            onPress={() =>
              !game.showCorrectAnswer && answerThenGoNext(game, artist)
            }
          ></GameButton>
        ))}
      </Column>
    </Column>
  );
}
