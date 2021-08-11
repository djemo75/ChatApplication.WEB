import { Box, Button, Grid } from "@material-ui/core";
import profileVector from "assets/profile-vector.png";
import togetherVector from "assets/together-vector.png";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { STATIC_ROUTES } from "Routes";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  return (
    <Box width="100%" pt={4} px={8}>
      <Box display="flex" alignItems="flex-end" mb={4}>
        <Box>
          <Box component="span" fontSize="2rem">
            Welcome
          </Box>
          <Box component="span" fontSize="2rem" ml={1} fontWeight="bold">
            {user.username}
          </Box>
        </Box>

        <Box ml={2}>
          <Button variant="outlined" color="secondary" size="small">
            Share profile
          </Button>
        </Box>
      </Box>

      <Box component={Grid} container spacing={4}>
        <Grid item xs={4}>
          <Box
            display="flex"
            flexDirection="column"
            border="1px solid #d8d8d8"
            borderRadius="10px"
            height="100%"
            boxSizing="border-box"
            bgcolor="#fff"
            p={2}
          >
            <Box fontSize="1.25rem" fontWeight="bold" textAlign="center" mb={2}>
              Easy gatherings with everyone
            </Box>
            <Box textAlign="center">
              <img
                src={togetherVector}
                alt="Easy gatherings with everyone"
                style={{ maxHeight: "250px", maxWidth: "100%" }}
              />
            </Box>
            <Box color="#4c4c4c">
              Send an invitation to your friends so you can send a message
              online. You can find new users from the menu or by clicking this
              button
            </Box>
            <Box textAlign="center" pt={2} marginTop="auto">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => history.push(STATIC_ROUTES.users)}
              >
                Search for users
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box
            display="flex"
            flexDirection="column"
            border="1px solid #d8d8d8"
            borderRadius="10px"
            height="100%"
            boxSizing="border-box"
            bgcolor="#fff"
            p={2}
          >
            <Box fontSize="1.25rem" fontWeight="bold" textAlign="center" mb={2}>
              Keep your profile updated
            </Box>
            <Box textAlign="center">
              <img
                src={profileVector}
                alt="Keep your profile updated"
                style={{ maxHeight: "250px", maxWidth: "100%" }}
              />
            </Box>
            <Box color="#4c4c4c">
              Update your profile regularly so that you can attract the
              attention of others on the platform.
            </Box>
            <Box textAlign="center" pt={2} marginTop="auto">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => history.push(STATIC_ROUTES.settings)}
              >
                Modify profile
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
