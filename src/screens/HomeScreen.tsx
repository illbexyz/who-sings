import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Column, Heading } from "native-base";
import React from "react";
import { RootStackParamList } from "../../App";
import { useStore } from "../store/store";
import { theme } from "../utils/theme";

type HomeProps = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

const Logo = () => (
  <Box rounded="2xl" p="8" justifyContent="center" alignItems="center">
    <Heading
      fontFamily="heading"
      textAlign="center"
      fontSize="6xl"
      fontWeight="bold"
      lineHeight="xs"
    >
      WHO
    </Heading>
    <Heading
      fontFamily="heading"
      textAlign="center"
      fontSize="6xl"
      fontWeight="bold"
      lineHeight="xs"
    >
      SINGS
    </Heading>
  </Box>
);

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

      <Button onPress={() => navigation.navigate("GameScreen")}>Play</Button>

      {user && (
        <Button mt="2" onPress={() => logout()}>
          Logout
        </Button>
      )}
    </Column>
  );
}
