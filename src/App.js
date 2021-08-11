import { Box, makeStyles, ThemeProvider } from "@material-ui/core";
import { Routes } from "Routes";
import SocketManagement from "shared/components/SocketManagement";
import { getTheme } from "theme";

export const useStyles = makeStyles({
  "@keyframes fadeInAnimation": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  root: {
    animation: "$fadeInAnimation ease-out 0.75s",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={getTheme()}>
      <Box className={classes.root}>
        <SocketManagement>
          <Routes />
        </SocketManagement>
      </Box>
    </ThemeProvider>
  );
};

export default App;
