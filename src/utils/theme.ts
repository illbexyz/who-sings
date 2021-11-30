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

export const customTheme = extendTheme({
  ...baseTheme,

  sizes: {
    175: 175 * 4,
  },
  colors: {
    backgroundGradient: {
      linearGradient: {
        colors: ["#2F8CE9", "#596FD4"],
        start: [0, 0],
        end: [0, 1],
      },
    },
    black: "#2e2e2e",
    success: "#82ff97",
    error: "#ffa79e",
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
          _text: { color: "black" },
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
        _hover: {
          borderColor: "white",
          bg: null,
        },
        _focus: {
          borderColor: "white",
        },
      },
    },
    FormControl: {},
  },
});

type CustomThemeType = typeof customTheme;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
