import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Heading, ScrollView, Text } from "native-base";
import React, { useCallback } from "react";
import { RootStackParamList } from "../../App";
import Error from "../components/Error";
import ScreenWithTitle from "../components/ScreenWithTitle";
import { useStore } from "../store/store";

type ProfileProps = NativeStackScreenProps<RootStackParamList, "ProfileScreen">;

export default function ProfileScreen({ navigation }: ProfileProps) {
  const user = useStore((store) => store.user);
  const [bestScore, latestScores] = useStore(
    useCallback(
      (store) => [
        store.scores.reduce((acc, curr) => Math.max(acc, curr.points), 0),
        store.scores.reverse().slice(0, 10),
      ],
      []
    )
  );

  if (!user) {
    return <Error />;
  }

  return (
    <ScreenWithTitle title={user}>
      <ScrollView flex={1}>
        <Heading size="sm" fontWeight="normal">
          Best Score
        </Heading>
        <Text fontSize="4xl" fontWeight="bold">
          {bestScore}
        </Text>

        <Heading size="sm" fontWeight="normal" mt="4" mb="1">
          Recent Scores
        </Heading>

        {latestScores.length ? (
          latestScores.map((score, idx) => (
            <Text key={idx} fontSize="2xl" fontWeight="bold">
              {score.points}
            </Text>
          ))
        ) : (
          <Text fontSize="xl">
            Play some games and check your scores here! 😎
          </Text>
        )}
      </ScrollView>
    </ScreenWithTitle>
  );
}
