import { useFocusEffect } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Column } from "native-base";
import React, { useCallback } from "react";
import { RootStackParamList } from "../../App";
import Login from "../components/Login";
import Logo from "../components/Logo";
import { useStore } from "../store/store";
import { theme } from "../utils/theme";

type HomeProps = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

export default function HomeScreen({ navigation }: HomeProps) {
  const user = useStore((store) => store.user);
  const clearGame = useStore((store) => store.clearGame);
  const logout = useStore((store) => store.logout);

  useFocusEffect(useCallback(() => clearGame(), []));

  return (
    <Column
      safeArea
      flex={1}
      p="12"
      alignItems="center"
      justifyContent="center"
      bg={theme.colors.backgroundGradient}
    >
      <Column w="100%" maxW="96">
        <Logo />

        {!user ? (
          <Login />
        ) : (
          <>
            <Button onPress={() => navigation.push("GameScreen")}>Play</Button>

            <Button mt="2" onPress={() => navigation.push("LeaderboardScreen")}>
              Leaderboard
            </Button>

            <Button mt="2" onPress={() => navigation.push("ProfileScreen")}>
              Profile
            </Button>

            <Button mt="2" onPress={() => logout()}>
              Logout
            </Button>
          </>
        )}
      </Column>
    </Column>
  );
}
