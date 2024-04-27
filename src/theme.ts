import { colorsTuple, createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    purple: colorsTuple(["#F2EBF9", "#E5D5FA", "#9854F6"]),
    gray: colorsTuple(["#F5F5F6"]),
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
  black: "#000000",
});
