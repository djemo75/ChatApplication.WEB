import { Box, Divider } from "@material-ui/core";
import { Chat } from "@material-ui/icons";
import { MESSAGE_TYPES } from "constants/messages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanUpLastChattedUsers,
  cleanUpMessages,
  fetchLastChattedUsers,
  fetchUserMessages,
  setSelectedChat,
} from "redux/users/actions";
import ChatList from "shared/components/ChatList";
import { useAsideStyles } from "shared/components/Layout/styles";
import MessagesComponent from "shared/components/Messages";

const pageSize = 15;
const messagesPageSize = 10;

const Messages = () => {
  const classes = useAsideStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.users.friends);
  const totalMessages = useSelector((state) => state.users.totalMessages);
  const { lastChattedUsers, totalChattedUsers } = useSelector(
    (state) => state.users,
  );
  const lastChattedUsersLoading = useSelector(
    (state) => state.users.lastChattedUsersLoading,
  );
  const selectedChat = useSelector((state) => state.users.selectedChat);
  const [pageNumber, setPageNumber] = useState(1);
  const [messagePageNumber, setMessagePageNumber] = useState(1);

  useEffect(() => {
    loadData();
  }, []); // eslint-disable-line

  useEffect(() => {
    return () => {
      dispatch(cleanUpMessages());
      dispatch(setSelectedChat(null));
      dispatch(cleanUpLastChattedUsers());
    };
  }, [dispatch]);

  const loadData = () => {
    const params = { pageNumber, pageSize };
    dispatch(fetchLastChattedUsers(params));
    setPageNumber(pageNumber + 1);
  };

  const getData = () => {
    const getLastMessage = (u) => {
      let result = "";

      const isMe = u.lastMessage.requesterId === user.id;
      if (u.lastMessage.messageType === MESSAGE_TYPES.text) {
        result = (isMe ? "You: " : "") + u.lastMessage.content;
      } else if (u.lastMessage.messageType === MESSAGE_TYPES.image) {
        result = isMe ? "You sent a image" : `${u.username} sent a image`;
      } else if (u.lastMessage.messageType === MESSAGE_TYPES.audio) {
        result = isMe
          ? "You sent a voice clip"
          : `${u.username} sent a voice clip`;
      }

      return result;
    };

    // Show last message instead of email
    return lastChattedUsers.map((user) => ({
      ...user,
      email: getLastMessage(user),
      isOnline:
        friends.find((f) => f.username === user.username)?.isOnline || false,
    }));
  };

  const hasMore = totalMessages > (messagePageNumber - 1) * messagesPageSize;

  const loadMore = async () => {
    const params = {
      pageNumber: messagePageNumber,
      pageSize: messagesPageSize,
    };
    await dispatch(fetchUserMessages(selectedChat?.id, params));
    setMessagePageNumber(messagePageNumber + 1);
  };

  return (
    <Box display="flex" width="100%">
      <Box className={classes.aside}>
        <Box className={classes.asideTitle}>Messages</Box>

        <Box my={2}>
          <Divider />
        </Box>
        <ChatList
          data={getData()}
          hasMore={totalChattedUsers > (pageNumber - 1) * pageSize}
          loadMore={loadData}
          loading={lastChattedUsersLoading}
          onItemClick={(data) => {
            if (selectedChat?.id !== data.id) {
              setMessagePageNumber(1);
              dispatch(cleanUpMessages());
              dispatch(setSelectedChat(data));
            }
          }}
          showUserStatus
        />
      </Box>
      {selectedChat ? (
        <Box width="100%" mr="40px">
          <MessagesComponent
            {...selectedChat}
            loadMore={loadMore}
            hasMore={hasMore}
            pageNumber={messagePageNumber}
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

export default Messages;
