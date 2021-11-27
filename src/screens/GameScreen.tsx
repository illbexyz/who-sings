import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Center, Column, Text } from "native-base";
import React from "react";
import { RootStackParamList } from "../../App";
import { theme } from "../utils/theme";

type GameProps = NativeStackScreenProps<RootStackParamList, "GameScreen">;

export default function GameScreen({ navigation }: GameProps) {
  return (
    <Column bg={theme.colors.backgroundGradient} flex={1} safeArea>
      <Button
        variant="ghost"
        alignSelf="flex-start"
        onPress={() => navigation.goBack()}
      >
        🔙
      </Button>
      <Center flex={1}>
        <Text>Game Screen</Text>
      </Center>
    </Column>
  );
}
