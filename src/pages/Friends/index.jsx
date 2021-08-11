import { Box, Divider } from "@material-ui/core";
import { Chat } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanUpMessages,
  fetchUserMessages,
  setSelectedChat,
} from "redux/users/actions";
import ChatList from "shared/components/ChatList";
import DebouncedSearch from "shared/components/DebouncedSearch";
import { useAsideStyles } from "shared/components/Layout/styles";
import Messages from "shared/components/Messages";

const pageSize = 10;

const Friends = () => {
  const dispatch = useDispatch();
  const classes = useAsideStyles();
  const friends = useSelector((state) => state.users.friends);
  const totalMessages = useSelector((state) => state.users.totalMessages);
  const selectedChat = useSelector((state) => state.users.selectedChat);

  const [searchString, setSearchString] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const hasMore = totalMessages > (pageNumber - 1) * pageSize;

  const loadMore = async () => {
    const params = { pageNumber, pageSize };
    await dispatch(fetchUserMessages(selectedChat?.id, params));
    setPageNumber(pageNumber + 1);
  };

  // useEffect(() => {
  //   setSearchString("");

  //   if (selectedChat && selectedChat.id) {
  //     const user = friends.find((f) => f.id === selectedChat.id);
  //     dispatch(setSelectedChat(user));
  //   }
  // }, [friends]); // eslint-disable-line

  useEffect(() => {
    return () => {
      dispatch(cleanUpMessages());
      dispatch(setSelectedChat(null));
    };
  }, [dispatch]);

  const getData = () => {
    return friends
      .sort((userA, userB) => userB.isOnline - userA.isOnline)
      .filter(
        (user) =>
          user.username.search(searchString) !== -1 ||
          user.email.search(searchString) !== -1,
      );
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
          onItemClick={(data) => {
            if (selectedChat?.id !== data.id) {
              setPageNumber(1);
              dispatch(cleanUpMessages());
              dispatch(setSelectedChat(data));
            }
          }}
          showUserStatus
        />
      </Box>
      {selectedChat ? (
        <Box width="100%" mr="40px">
          <Messages
            {...selectedChat}
            loadMore={loadMore}
            hasMore={hasMore}
            pageNumber={pageNumber}
          />
        </Box>
      ) : (
        <Box className={classes.previewBox}>
          <Box textAlign="center">
            <Chat style={{ width: "100px", height: "100px", color: "gray" }} />
            <Box>Select people&apos;s names to preview their chat.</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Friends;
