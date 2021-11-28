import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Column } from "native-base";
import React from "react";
import { RootStackParamList } from "../../App";
import Login from "../components/Login";
import Logo from "../components/Logo";
import { useStore } from "../store/store";
import { theme } from "../utils/theme";

type HomeProps = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

export default function HomeScreen({ navigation }: HomeProps) {
  const user = useStore((store) => store.user);
  const logout = useStore((store) => store.logout);

  return (
    <Column
      flex={1}
      p="12"
      bg={theme.colors.backgroundGradient}
      safeArea
      justifyContent="center"
    >
      <Logo />

      {!user ? (
        <Login />
      ) : (
        <>
          <Button onPress={() => navigation.navigate("GameScreen")}>
            Play
          </Button>
          <Button
            mt="2"
            onPress={() => navigation.navigate("LeaderboardScreen")}
          >
            Leaderboard
          </Button>
          <Button mt="2" onPress={() => navigation.navigate("ProfileScreen")}>
            Profile
          </Button>
          <Button mt="2" onPress={() => logout()}>
            Logout
          </Button>
        </>
      )}
    </Column>
  );
}
