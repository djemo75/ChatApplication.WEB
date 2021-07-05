import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7b8ffd",
      main: "#4e69ff",
      dark: "#3a5ce8",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fdc97e",
      main: "#ffb54a",
      dark: "#e29837",
      contrastText: "#fff",
    },
  },
  overrides: {
    // MuiButton: {
    //   root: {
    //     borderRadius: "0px",
    //   },
    // },
  },
});

export { theme };
