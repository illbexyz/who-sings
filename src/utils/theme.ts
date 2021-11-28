import { extendTheme } from "native-base";

const baseTheme = {
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
  initialColorMode: "dark",
};

export const theme = extendTheme({
  ...baseTheme,
  colors: {
    backgroundGradient: {
      linearGradient: {
        colors: ["#2F8CE9", "#596FD4"],
        start: [0, 0],
        end: [0, 1],
      },
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: "#ffffff",
        letterSpacing: "xs",
      },
    },
    Heading: {
      baseStyle: {
        color: "white",
      },
    },
    Button: {
      defaultProps: {
        bg: "white",
        rounded: "2xl",
        px: "4",
        py: "4",
        shadow: "2",
        _text: { fontSize: "lg", fontWeight: "bold", color: "#5566C9" },
        _hover: {
          bg: "#e5e5e5",
        },
        _pressed: {
          bg: "white",
        },
        _focus: {
          bg: "white",
        },
        _disabled: {
          bg: "#e5e5e5",
        },
      },
    },
    Input: {
      defaultProps: {
        p: "4",
        fontSize: "xl",
        color: "white",
        borderColor: "white",
        selectionColor: "#ffffff",
        rounded: "lg",
        _focus: {
          borderColor: "white",
        },
      },
    },
    FormControl: {},
  },
});
