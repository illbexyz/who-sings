import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { format } from "date-fns";
import { Heading, Row, ScrollView, Text } from "native-base";
import React, { useCallback } from "react";
import { RootStackParamList } from "../../App";
import Error from "../components/Error";
import ScreenWithTitle from "../components/ScreenWithTitle";
import { bestScoreOfUser, recentScoresOfUser } from "../models/score";
import { useStore } from "../store/store";

type ProfileProps = NativeStackScreenProps<RootStackParamList, "ProfileScreen">;

export default function ProfileScreen({ navigation }: ProfileProps) {
  const user = useStore((store) => store.user);
  const [bestScore, latestScores] = useStore(
    useCallback(
      ({ scores }) =>
        user
          ? [
              bestScoreOfUser(scores, user),
              recentScoresOfUser(scores, user).slice(0, 10),
            ]
          : [null, null],
      [user]
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

        {latestScores?.length ? (
          latestScores.map((score, idx) => (
            <Row key={idx} alignItems="center">
              <Text fontSize="2xl" fontWeight="bold" w="32">
                {score.points}
              </Text>
              <Text fontSize="sm">
                {format(new Date(score.timestamp), "Pp")}
              </Text>
            </Row>
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
