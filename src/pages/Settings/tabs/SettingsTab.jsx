import { Box, makeStyles, Switch } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setIsEnabledFriendshipNotification } from "redux/settings/actions";

const useStyles = makeStyles({
  item: {
    display: "flex",
    justifyContent: "space-between",
    background: "#fff",
    padding: "24px 20px",
    boxShadow: "rgb(0 0 0 / 20%) 0px 2px 4px 0px",
  },
  itemTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  itemDescription: {
    fontSize: "0.875rem",
  },
});

const SettingsTab = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isEnabledFriendshipNotification = useSelector(
    (state) => state.settings.isEnabledFriendshipNotification,
  );

  return (
    <Box mr="40px" mt="80px">
      <Box className={classes.item}>
        <Box>
          <Box className={classes.itemTitle}>
            Enable friendship notification
          </Box>
          <Box className={classes.itemDescription}>
            When ON, you will receive a notification when someone sends a <br />
            friendship request to you or accept your friendship request.
          </Box>
        </Box>

        <Switch
          checked={isEnabledFriendshipNotification}
          onChange={() =>
            dispatch(
              setIsEnabledFriendshipNotification(
                !isEnabledFriendshipNotification,
              ),
            )
          }
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default SettingsTab;
