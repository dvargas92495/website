// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";

import "prismjs/themes/prism.css";
import "./src/styles/global.css";

/*
import React, { useMemo } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const wrapRootElement = ({ element }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#333333",
            contrastText: "#fcfaf9",
          },
          secondary: {
            main: "#48e5c2",
            contrastText: "#5e5e5e",
          },
          // f3d3bd
        },
      }),
    [prefersDarkMode]
  );
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};*/
