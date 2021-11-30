import { Center, Heading, useTheme } from "native-base";
import React from "react";

export default function Error() {
  const theme = useTheme();

  return (
    <Center bg={theme.colors.backgroundGradient} flexGrow={1}>
      <Heading size="2xl">Something went wrong 🙃</Heading>
    </Center>
  );
}
