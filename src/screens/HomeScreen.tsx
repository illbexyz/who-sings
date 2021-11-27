import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Column, Heading, IconButton, Text } from "native-base";
import React from "react";
import { RootStackParamList } from "../../App";
import { useStore } from "../store/store";
import { theme } from "../utils/theme";

type HomeProps = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

const Logo = () => (
  <>
    <Heading
      fontFamily="heading"
      textAlign="center"
      fontSize="7xl"
      fontWeight="bold"
      lineHeight="xs"
    >
      WHO
    </Heading>
    <Heading
      fontFamily="heading"
      textAlign="center"
      fontSize="7xl"
      fontWeight="bold"
      lineHeight="xs"
    >
      SINGS
    </Heading>
  </>
);

export default function HomeScreen({ navigation }: HomeProps) {
  const user = useStore((store) => store.user);
  const logout = useStore((store) => store.logout);

  return (
    <Column bg={theme.colors.backgroundGradient} flex={1} p="12" safeArea>
      <Logo />

      <IconButton
        icon={<Text fontSize="7xl">▶️</Text>}
        alignSelf="center"
        borderRadius="full"
        mt="16"
        px="16"
        onPress={() => navigation.navigate("GameScreen")}
      />

      {user && (
        <Button mt="2" onPress={() => logout()}>
          Logout
        </Button>
      )}
    </Column>
  );
}
