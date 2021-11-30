import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "native-base";
import React from "react";
import { RootStackParamList } from "../../App";
import Error from "../components/Error";
import ScreenWithTitle from "../components/ScreenWithTitle";
import { useStore } from "../store/store";

type ProfileProps = NativeStackScreenProps<RootStackParamList, "ProfileScreen">;

export default function ProfileScreen({ navigation }: ProfileProps) {
  const theme = useTheme();
  const user = useStore((store) => store.user);

  if (!user) {
    return <Error />;
  }

  return <ScreenWithTitle title={user}></ScreenWithTitle>;
}
