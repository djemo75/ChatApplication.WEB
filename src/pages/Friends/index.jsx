import { Box, Divider } from "@material-ui/core";
import { Chat } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatList from "shared/components/ChatList";
import DebouncedSearch from "shared/components/DebouncedSearch";
import { useAsideStyles } from "shared/components/Layout/styles";

const Friends = () => {
  const classes = useAsideStyles();
  const friends = useSelector((state) => state.users.friends);

  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    setSearchString("");
  }, [friends]);

  const getData = () => {
    return friends
      .sort((userA, userB) => userB.isOnline - userA.isOnline)
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
          <Box className={classes.asideTitle}>Friends</Box>
          <Box fontSize="1rem">Total: {friends.length}</Box>
        </Box>

        <Box mt={4}>
          <DebouncedSearch value={searchString} onChange={handleSearch} />
        </Box>

        <Box my={2}>
          <Divider />
        </Box>
        <ChatList
          data={getData()}
          noRecordsText={searchString ? "Not found" : "No friends"}
          onItemClick={(data) => console.log(data)}
          showUserStatus
        />
      </Box>
      <Box className={classes.previewBox}>
        <Box textAlign="center">
          <Chat style={{ width: "100px", height: "100px", color: "gray" }} />
          <Box>Select people&apos;s names to preview their chat.</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Friends;
