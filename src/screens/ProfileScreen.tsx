import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Center, Text } from "native-base";
import React from "react";
import { RootStackParamList } from "../../App";

type ProfileProps = NativeStackScreenProps<RootStackParamList, "ProfileScreen">;

export default function ProfileScreen({ navigation }: ProfileProps) {
  return (
    <Center>
      <Text>Profile</Text>
    </Center>
  );
}
