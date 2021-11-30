import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Heading, Row, ScrollView, Text } from "native-base";
import React, { useCallback } from "react";
import { RootStackParamList } from "../../App";
import Error from "../components/Error";
import ScreenWithTitle from "../components/ScreenWithTitle";
import { bestScoreOfUser, recentScores } from "../models/score";
import { useStore } from "../store/store";

type ProfileProps = NativeStackScreenProps<RootStackParamList, "ProfileScreen">;

const IntlFormat = new Intl.DateTimeFormat(undefined, {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export default function ProfileScreen({ navigation }: ProfileProps) {
  const user = useStore((store) => store.user);
  const [bestScore, latestScores] = useStore(
    useCallback(
      ({ scores }) =>
        user
          ? [bestScoreOfUser(scores, user), recentScores(scores, 10)]
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
            <Row alignItems="center">
              <Text key={idx} fontSize="2xl" fontWeight="bold" w="32">
                {score.points}
              </Text>
              <Text fontSize="sm">
                {IntlFormat.format(new Date(score.timestamp))}
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
