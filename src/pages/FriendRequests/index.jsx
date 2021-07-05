import { Box, Divider } from "@material-ui/core";
import { PermIdentity } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatList from "shared/components/ChatList";
import DebouncedSearch from "shared/components/DebouncedSearch";
import { useAsideStyles } from "shared/components/Layout/styles";

const FriendRequests = () => {
  const classes = useAsideStyles();
  const requests = useSelector((state) => state.users.friendRequests);

  const [searchString, setSearchString] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setSearchString("");
  }, [requests]);

  const getData = () => {
    return requests
      .filter(
        (user) =>
          user.username.search(searchString) !== -1 ||
          user.email.search(searchString) !== -1,
      )
      .map((user) => ({
        id: user.id,
        primaryText: user.username,
        secondaryText: user.email,
        isOnline: user.isOnline,
        friendship: user.friendship,
      }));
  };

  const handleSearch = (value) => {
    setSearchString(value);
  };

  return (
    <Box display="flex" width="100%">
      <Box className={classes.aside}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box className={classes.asideTitle}>Friend Requests</Box>
          <Box fontSize="1rem">Total: {requests.length}</Box>
        </Box>

        <Box mt={4}>
          <DebouncedSearch value={searchString} onChange={handleSearch} />
        </Box>

        <Box my={2}>
          <Divider />
        </Box>
        <ChatList
          data={getData()}
          noRecordsText={searchString ? "Not found" : "No friend requests"}
          onItemClick={setSelectedUser}
          showRequestActions
        />
      </Box>
      {selectedUser ? (
        <Box width="100%" height="100%">
          <Box border="5px" width="90%" height="150px" bgcolor="gray"></Box>
          User {selectedUser.username}
        </Box>
      ) : (
        <Box className={classes.previewBox}>
          <Box textAlign="center">
            <PermIdentity
              style={{ width: "100px", height: "100px", color: "gray" }}
            />
            <Box>Select people&apos;s names to preview their profile.</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FriendRequests;
