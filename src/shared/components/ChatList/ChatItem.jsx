import { Avatar, Badge, Box, IconButton, Tooltip } from "@material-ui/core";
import {
  AccountCircle,
  HowToReg,
  PersonAdd,
  PersonAddDisabled,
} from "@material-ui/icons";
import { formatDistanceStrict } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { modifyUserById } from "redux/users/actions";
import { socket } from "shared/components/SocketManagement";

import { useChatListItemStyles } from "./styles";

const ChatItem = (props) => {
  const { data, onItemClick, showRequestActions, showUserStatus } = props;
  const classes = useChatListItemStyles({
    onItemClick,
    isOnline: data.isOnline,
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [friendshipStatus, setFriendshipStatus] = useState(
    data.friendship?.isRequestAccepted,
  );
  const [isTargetUser, setIsTargetUser] = useState(
    data.friendship?.addresseeId === user.id,
  );

  useEffect(() => {
    setFriendshipStatus(data.friendship?.isRequestAccepted);
    setIsTargetUser(data.friendship?.addresseeId === user.id);
  }, [data, user]);

  const sendRequest = () => {
    if (socket.connected) {
      socket.emit("sendFriendRequest", { id: data.id }, (response) => {
        if (response.statusCode === "ok") {
          toast.success("A friend request has been sent");
          dispatch(
            modifyUserById(Number(data.id), {
              friendship: { ...data.friendship, isRequestAccepted: false },
            }),
          );
        } else {
          toast.error(response.message);
        }
      });
    } else {
      toast.error("There is a connection problem");
    }
  };

  const acceptRequest = () => {
    if (socket.connected) {
      socket.emit("acceptFriendRequest", { id: data.id }, (response) => {
        if (response.statusCode === "ok") {
          toast.success("A friend request has been accepted");
          dispatch(
            modifyUserById(Number(data.id), {
              friendship: { ...data.friendship, isRequestAccepted: true },
            }),
          );
        } else {
          toast.error(response.message);
        }
      });
    } else {
      toast.error("There is a connection problem");
    }
  };

  // const acceptRequest = () => {
  //   dispatch(acceptFriendRequest(data.id)).then((action) => {
  //     if (!action.error) setFriendshipStatus(true);
  //   });
  // };

  const cancelRequest = () => {
    if (socket.connected) {
      socket.emit("cancelFriendRequest", { id: data.id }, (response) => {
        if (response.statusCode === "ok") {
          if (friendshipStatus) {
            toast.success("You have removed the user from your friends list.");
          } else if (isTargetUser) {
            toast.success("A friend request has been declined");
          } else {
            toast.success("A friend request has been cancelled");
          }
          dispatch(modifyUserById(Number(data.id), { friendship: null }));
        } else {
          toast.error(response.message);
        }
      });
    } else {
      toast.error("There is a connection problem");
    }

    // dispatch(cancelFriendRequest(data.id)).then((action) => {
    //   if (!action.error) {
    //     setFriendshipStatus(null);
    //     setIsTargetUser(false);
    //   }
    // });
  };

  const avatar = (
    <Avatar style={{ background: "#4343a7" }}>
      {data.primaryText.length && data.primaryText[0].toUpperCase()}
    </Avatar>
  );

  return (
    <Box
      className={classes.item}
      onClick={() => onItemClick && onItemClick(data)}
    >
      {showUserStatus ? (
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
          classes={{ badge: classes.avatarBadge }}
        >
          {avatar}
        </Badge>
      ) : (
        avatar
      )}

      <Box ml={0.75} width="60%">
        <Box className={classes.username}>{data.primaryText}</Box>
        <Box className={classes.lastMessage}>{data.secondaryText}</Box>
      </Box>
      <Box className={classes.date}>
        {data.date && formatDistanceStrict(data.date, new Date())}
      </Box>

      {data.hasNewMessage && (
        <Box className={classes.newMessageIndicator}></Box>
      )}
      {showRequestActions && (
        <>
          {friendshipStatus ? (
            <Tooltip
              placement="top"
              title={
                <Box textAlign="center">
                  You are friends.
                  <br /> Click to remove.
                </Box>
              }
            >
              <IconButton size="small" onClick={cancelRequest}>
                <AccountCircle style={{ color: "black" }} />
              </IconButton>
            </Tooltip>
          ) : friendshipStatus === false ? (
            <>
              <Tooltip
                placement="top"
                title={
                  isTargetUser
                    ? "Click to decline the friend request."
                    : "Click to cancel the friend request."
                }
              >
                <IconButton size="small" onClick={cancelRequest}>
                  <PersonAddDisabled style={{ color: "red" }} />
                </IconButton>
              </Tooltip>
              {isTargetUser && (
                <Tooltip
                  placement="top"
                  title="Click to accept the friend request."
                >
                  <IconButton size="small" onClick={acceptRequest}>
                    <HowToReg style={{ color: "lime" }} />
                  </IconButton>
                </Tooltip>
              )}
            </>
          ) : (
            <Tooltip placement="top" title="Click to send friend request.">
              <IconButton size="small" onClick={sendRequest}>
                <PersonAdd style={{ color: "gray" }} />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
    </Box>
  );
};

export default ChatItem;
