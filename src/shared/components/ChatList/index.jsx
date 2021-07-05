import { Box, CircularProgress } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";

import ChatItem from "./ChatItem";
import { useChatListStyles } from "./styles";

const ChatList = ({
  data,
  onItemClick,
  loadMore,
  loading,
  hasMore,
  showRequestActions,
  showUserStatus,
  noRecordsText = "No records",
}) => {
  const classes = useChatListStyles();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const loader = useRef(loadMore);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loader.current();
        }
      },
      { threshold: 1 },
    ),
  );

  const [element, setElement] = useState(null);

  useEffect(() => {
    loader.current = loadMore;
  }, [loadMore]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
    <Box id="scrollArea" className={classes.chatList}>
      {list.map((item, index) => (
        <ChatItem
          data={item}
          onItemClick={onItemClick}
          showRequestActions={showRequestActions}
          showUserStatus={showUserStatus}
          key={index}
        />
      ))}

      {loading && (
        <Box textAlign="center">
          <CircularProgress size={16} />
        </Box>
      )}

      {!loading && !list.length ? (
        <Box
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="gray"
        >
          {noRecordsText}
        </Box>
      ) : null}

      {!loading && hasMore && <div ref={setElement}></div>}
    </Box>
  );
};

export default ChatList;
