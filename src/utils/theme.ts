import { extendTheme } from "native-base";

export const theme = extendTheme({
  fontConfig: {
    JosefinSans: {
      500: {
        normal: "JosefinSans_500Medium",
      },
      700: {
        normal: "JosefinSans_700Bold",
      },
    },
  },
  fonts: {
    heading: "JosefinSans",
    body: "JosefinSans",
    mono: "JosefinSans",
  },
  colors: {
    primary: {
      500: "#FBAB7D",
    },
    background: "#000000",
    backgroundGradient: {
      linearGradient: {
        colors: ["#fbab7e", "#f7ce68"],
        start: [0, 0],
        end: [1, 0],
      },
    },
  },
  config: {
    initialColorMode: "dark",
  },
});
