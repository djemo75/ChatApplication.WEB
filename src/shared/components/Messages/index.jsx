import { Box } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Message from "./Message";
import MessageInput from "./MessageInput";
import MessagesHeader from "./MessagesHeader";
import { useMessagesStyles } from "./styles";

const Messages = (props) => {
  const { id, loadMore, hasMore, pageNumber } = props;
  const classes = useMessagesStyles();
  const user = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.users.messages);
  const loading = useSelector((state) => state.users.messagesLoading);
  const messagesEndRef = useRef(null);

  const [element, setElement] = useState(null);

  const loader = useRef(loadMore);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          first.target.parentElement.scrollBy(0, 10);
          loader.current();
        }
      },
      { threshold: 1 },
    ),
  );

  useEffect(() => {
    loader.current = loadMore;
  }, [loadMore]); // eslint-disable-line

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

  useEffect(() => {
    (async () => {
      await loadMore();
      messagesEndRef.current?.scrollIntoView();
    })();
  }, [id]); // eslint-disable-line

  return (
    <>
      <Box
        height="100%"
        maxHeight="100vh"
        display="flex"
        flexDirection="column"
      >
        <MessagesHeader {...props} messagesEndRef={messagesEndRef} />
        <Box mt={4} className={classes.messagesList}>
          {loading && (
            <Box textAlign="center" color="gray">
              Loading...
            </Box>
          )}
          {!loading && hasMore && <div ref={setElement}></div>}
          {!loading && messages.length === 0 && (
            <Box className={classes.helloText}>Say hello to your friend</Box>
          )}
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <Message
                key={message.id}
                {...props}
                message={message}
                alignRight={message.requesterId === user.id}
                messagesEndRef={messagesEndRef}
                isLoadedFirstPage={pageNumber === 2}
              />
            ))}
          <div ref={messagesEndRef} />
        </Box>
        <MessageInput {...props} messagesEndRef={messagesEndRef} />
      </Box>
    </>
  );
};

export default Messages;
