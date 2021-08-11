import { Backdrop, Box, CircularProgress } from "@material-ui/core";
import { MESSAGE_TYPES } from "constants/messages";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImage } from "redux/users/actions";

import UserAvatar from "../UserAvatar";
import { useMessagesStyles } from "./styles";

const Message = ({
  avatar,
  alignRight,
  message,
  messagesEndRef,
  isLoadedFirstPage,
}) => {
  const classes = useMessagesStyles({ alignRight });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [resource, setResource] = useState();
  const [isResourceLoaded, setIsResourceLoaded] = useState(false);
  const [isViewingFullSize, setIsViewingFullSize] = useState(false);

  useEffect(() => {
    if (isLoadedFirstPage) {
      if (
        (message.messageType === MESSAGE_TYPES.image ||
          message.messageType === MESSAGE_TYPES.audio) &&
        isResourceLoaded
      ) {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      } else if (message.messageType === MESSAGE_TYPES.text) {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [isResourceLoaded, isLoadedFirstPage, messagesEndRef, message]);

  useEffect(() => {
    if (
      message.messageType === MESSAGE_TYPES.image ||
      message.messageType === MESSAGE_TYPES.audio
    ) {
      dispatch(fetchImage(message.resourceId)).then((action) => {
        if (!action.error) {
          setResource(action.payload);
        }
      });
    }
  }, [dispatch, message]);

  const getAvatarPath = () => {
    let path;
    if (alignRight) {
      if (user.avatar && user.avatar.path) {
        path = `${process.env.REACT_APP_API_DOMAIN}${user.avatar.path}`;
      }
    } else {
      if (avatar) {
        path = `${process.env.REACT_APP_API_DOMAIN}${avatar.path}`;
      }
    }
    return path;
  };

  return (
    <Box className={classes.messageWrapper}>
      <Box className={classes.avatar}>
        <UserAvatar size="40px" src={getAvatarPath()} />
      </Box>
      <Box>
        {message.messageType === MESSAGE_TYPES.text ? (
          <Box className={classes.message}>{message.content}</Box>
        ) : message.messageType === MESSAGE_TYPES.image ? (
          <Box className={classes.imageMessage}>
            {!isResourceLoaded && <CircularProgress size={24} />}
            {resource && (
              <>
                <img
                  src={`${process.env.REACT_APP_API_DOMAIN}${resource.path}`}
                  alt={resource.name}
                  onLoad={() => setIsResourceLoaded(true)}
                  onClick={() => setIsViewingFullSize(true)}
                  style={isResourceLoaded ? {} : { display: "none" }}
                />
                <Backdrop
                  className={classes.backdrop}
                  open={isViewingFullSize}
                  onClick={() => setIsViewingFullSize(false)}
                >
                  <img
                    src={`${process.env.REACT_APP_API_DOMAIN}${resource.path}`}
                    alt={resource.name}
                  />
                </Backdrop>
              </>
            )}
          </Box>
        ) : message.messageType === MESSAGE_TYPES.audio ? (
          <>
            {resource && (
              <audio
                controls
                onCanPlayThrough={() => setIsResourceLoaded(true)}
              >
                <source
                  src={`${process.env.REACT_APP_API_DOMAIN}${resource.path}`}
                  type={resource.type}
                />
                Your browser does not support the audio element.
              </audio>
            )}
          </>
        ) : null}
        <Box className={classes.date}>
          {moment(message.createdAt).format("MMMM Do YYYY, h:mm A")}
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
