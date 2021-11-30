import { Center, Spinner, useTheme } from "native-base";
import React from "react";

export default function ScreenWithLoader() {
  const theme = useTheme();

  return (
    <Center bg={theme.colors.backgroundGradient} flexGrow={1} safeArea>
      <Spinner size="lg" accessibilityLabel="Loading" />
    </Center>
  );
}
