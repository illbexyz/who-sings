import { Button, ITheme, useTheme } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import React from "react";
import { GestureResponderEvent } from "react-native";
import { Artist } from "../models/artist";
import { GameAnswer, GameQuestion } from "../models/game";

function buttonColors(
  theme: ITheme,
  correctChoice: Artist,
  userChoice: Artist | null,
  currentChoice: Artist
): [ColorType, ColorType] {
  if (currentChoice.id === userChoice?.id) {
    return currentChoice.id === correctChoice.id
      ? [theme.colors.success, theme.colors.black]
      : [theme.colors.error, theme.colors.black];
  }

  return currentChoice.id === correctChoice.id
    ? [theme.colors.success, theme.colors.black]
    : [undefined, undefined];
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
  const theme = useTheme();
  const [bgColor, textColor] =
    userChoice === undefined
      ? [undefined, undefined]
      : buttonColors(theme, question.track.artist, userChoice.artist, artist);

  return (
    <Button
      mt="3"
      w="full"
      justifyContent="flex-start"
      bg={bgColor}
      _text={{ color: textColor }}
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
