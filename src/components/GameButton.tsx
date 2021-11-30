import { Button } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import React from "react";
import { GestureResponderEvent } from "react-native";
import { Artist } from "../models/artist";
import { GameAnswer, GameQuestion } from "../models/game";

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

interface GameButtonProps {
  userChoice: GameAnswer | undefined;
  question: GameQuestion;
  artist: Artist;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}

const GameButton = ({
  userChoice,
  question,
  artist,
  onPress,
}: GameButtonProps) => {
  const bgColor =
    userChoice === undefined
      ? undefined
      : buttonBg(question.track.artist, userChoice.artist, artist);

  return (
    <Button
      mt="3"
      w="full"
      justifyContent="flex-start"
      bg={bgColor}
      _focus={{ bg: bgColor }}
      _hover={{ bg: bgColor }}
      _pressed={{ bg: bgColor }}
      onPress={onPress}
    >
      {artist.name}
    </Button>
  );
};

export default GameButton;
