import { Box, Grid, Paper } from "@material-ui/core";
import authImage from "assets/auth-wallpaper.png";

import { useAuthStyles } from "./styles";

const AuthMain = ({ children }) => {
  const classes = useAuthStyles();

  return (
    <Box className={classes.main}>
      <Box
        component={Paper}
        className={classes.card}
        elevation={2}
        bgcolor="#fff"
      >
        <Grid container spacing={10}>
          <Grid item xs={6}>
            {children}
          </Grid>
          <Grid container item xs={6} justify="center" alignItems="center">
            <img
              src={authImage}
              className={classes.image}
              alt="chat-application"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AuthMain;
