import { colorsTuple, createTheme, DEFAULT_THEME } from "@mantine/core";

export const theme = createTheme({
  ...DEFAULT_THEME,
  colors: {
    ...DEFAULT_THEME.colors,
    purple: colorsTuple(["#F2EBF9", "#E5D5FA", "#9854F6"]),
    slate: colorsTuple(["#F5F5F6", "#7B7C88", "#D5D6DC", "#F1F1F1"]),
    notFound: colorsTuple([
      "#FFFFFF",
      "#FBE54D",
      "#74FADB",
      "#68DC42",
      "#E83CF2",
      "#D52D25",
      "#0732B3",
    ]),
  },
});
