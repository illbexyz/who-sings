import { Box, Heading } from "native-base";
import React from "react";

export default function Logo() {
  return (
    <Box rounded="2xl" p="8" justifyContent="center" alignItems="center">
      <Heading
        fontFamily="heading"
        textAlign="center"
        fontSize="6xl"
        fontWeight="bold"
        lineHeight="xs"
      >
        WHO
      </Heading>
      <Heading
        fontFamily="heading"
        textAlign="center"
        fontSize="6xl"
        fontWeight="bold"
        lineHeight="xs"
      >
        SINGS
      </Heading>
    </Box>
  );
}
