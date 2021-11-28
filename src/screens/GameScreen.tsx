import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Center,
  Column,
  Heading,
  Spinner,
  Text,
  useBreakpointValue,
} from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import React, { useEffect } from "react";
import { RootStackParamList } from "../../App";
import { Artist } from "../models/artist";
import { useStore } from "../store/store";
import { theme } from "../utils/theme";
import { zip } from "../utils/zip";

type GameProps = NativeStackScreenProps<RootStackParamList, "GameScreen">;

function buttonBg(
  correctChoice: Artist,
  userChoice: Artist,
  currentChoice: Artist
): ColorType {
  if (currentChoice.id === userChoice.id) {
    return currentChoice.id === correctChoice.id ? "green.400" : "red.400";
  }

  return currentChoice.id === correctChoice.id ? "green.400" : undefined;
}

export default function GameScreen({ navigation }: GameProps) {
  const maxHeight = useBreakpointValue({
    xl: "96",
  });
  const game = useStore((store) => store.game);
  const createGame = useStore((store) => store.createGame);
  const clearGame = useStore((store) => store.clearGame);
  const answer = useStore((store) => store.answer);

  useEffect(() => {
    createGame();
  }, []);

  if (!game) {
    return (
      <Center bg={theme.colors.backgroundGradient} flex={1} safeArea>
        <Spinner size="lg" accessibilityLabel="Loading game" />
      </Center>
    );
  }

  if (game.currentIndex > game.config.questions.length - 1) {
    const score = zip(
      game.userChoices,
      game.config.questions.map((q) => q.track.artist)
    ).reduce(
      (acc, [userChoice, correctAnswer]) =>
        userChoice?.id === correctAnswer.id ? acc + 1 : acc,
      0
    );

    return (
      <Center bg={theme.colors.backgroundGradient} flex={1} safeArea>
        <Heading>
          {score}/{game.config.questions.length}
        </Heading>

        <Button
          onPress={() => {
            clearGame();
            navigation.navigate("HomeScreen");
          }}
        >
          Yay!
        </Button>
      </Center>
    );
  }

  const question = game.config.questions[game.currentIndex];
  const userChoice = game.showCorrectAnswer
    ? game.userChoices[game.currentIndex]
    : null;

  return (
    <Column
      bg={{
        linearGradient: {
          colors: ["#2F8CE9", "#596FD4"],
          start: [0, 0],
          end: [0, 1],
        },
      }}
      flex={1}
      safeArea
      alignItems="center"
      justifyContent="center"
    >
      <Column
        w={{ base: "full", lg: "50%" }}
        h={{ base: "full", lg: "70%" }}
        px="8"
        py="6"
        alignItems="flex-start"
        maxH={maxHeight}
        flex={1}
      >
        <Box
          w="full"
          rounded="2xl"
          bg="#87C1FF"
          borderStyle="solid"
          borderColor="#87C1FF"
          borderWidth="2"
          justifyContent="center"
          overflow="hidden"
        >
          <Box
            position="absolute"
            w={`${game.timer * 10}%`}
            h="full"
            bg="#0da8fb"
            rounded="xl"
            shadow="1"
          ></Box>

          <Text fontSize="xl" fontWeight="bold" alignSelf="center" zIndex={1}>
            {Math.floor(game.timer)}
          </Text>
        </Box>

        <Text fontSize="md" mt="8">
          Song {game.currentIndex + 1} of {game.config.questions.length}
        </Text>

        <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start" mt="2">
          {question.track.lyrics}
        </Text>

        <Box flex={1} />

        {question.choices.map((choice) => {
          const bgColor = !userChoice
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
