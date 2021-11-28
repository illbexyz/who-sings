import { Text, ZStack } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import { QUESTION_TIME_MS } from "../store/store";

export interface GameTimerProps {
  isTicking: boolean;
  onTimesUp: () => any;
}

export default function GameTimer({ isTicking, onTimesUp }: GameTimerProps) {
  const [timerSeconds, setTimerSeconds] = useState(QUESTION_TIME_MS / 1000);
  const timerAnim = useRef(new Animated.Value(QUESTION_TIME_MS)).current;

  const animation = Animated.timing(timerAnim, {
    toValue: 0,
    duration: QUESTION_TIME_MS,
    useNativeDriver: false,
    easing: Easing.linear,
  });

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (isTicking) {
      setTimerSeconds(QUESTION_TIME_MS / 1000);

      interval = setInterval(() => {
        setTimerSeconds((timerSeconds) => {
          const nextTimer = timerSeconds - 1;
          if (nextTimer <= 0) clearInterval(interval);
          return nextTimer;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTicking]);

  useEffect(() => {
    if (isTicking) {
      animation.reset();
      animation.start();
    } else {
      animation.stop();
    }

    return () => animation.stop();
  }, [isTicking]);

  useEffect(() => {
    if (timerSeconds <= 0) {
      onTimesUp();
    }
  }, [timerSeconds]);

  return (
    <ZStack
      w="full"
      h="8"
      rounded="2xl"
      bg="#87C1FF"
      borderStyle="solid"
      borderColor="#87C1FF"
      borderWidth="2"
      justifyContent="center"
      overflow="hidden"
    >
      <Animated.View
        style={[
          {
            width: timerAnim.interpolate({
              inputRange: [0, QUESTION_TIME_MS],
              outputRange: ["0%", "100%"],
            }),
            height: "100%",
            backgroundColor: "#0DA8FB",
            borderRadius: 16,
            flex: 1,
          },
        ]}
      ></Animated.View>

      <Text fontSize="xl" fontWeight="bold" alignSelf="center" zIndex={1}>
        {Math.floor(timerSeconds)}
      </Text>
    </ZStack>
  );
}
