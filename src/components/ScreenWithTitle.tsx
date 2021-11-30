import { Box, Column, Heading, useTheme } from "native-base";
import React from "react";

export type ScreenWithTitleProps = React.PropsWithChildren<{
  title: string;
}>;

export default function ScreenWithTitle({
  title,
  children,
}: ScreenWithTitleProps) {
  const theme = useTheme();

  return (
    <Column
      safeArea
      flex={1}
      alignItems={{ base: "stretch", sm: "center" }}
      bg={theme.colors.backgroundGradient}
      p={8}
    >
      <Column flex={1} maxW="96">
        <Heading mb="8" size="2xl" flexShrink={0} flexGrow={0} noOfLines={2}>
          {title}
        </Heading>

        <Box flexGrow={1}>{children}</Box>
      </Column>
    </Column>
  );
}
