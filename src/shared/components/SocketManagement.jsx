import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "redux/settings/actions";
import {
  addMessage,
  modifyUserById,
  setFriendRequests,
  setFriends,
} from "redux/users/actions";
import { io } from "socket.io-client";

export let socket;

const SocketManagement = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      socket = io("http://localhost:5001", {
        query: `userId=${user.id}`,
      });

      socket.on("connect", () => {
        socket.emit("user:setStatusToOnline");

        socket.emit("user:fetchFriends");
        socket.on("user:fetchFriends", (data) => {
          dispatch(setFriends(data));
        });

        socket.emit("user:fetchFriendRequests");
        socket.on("user:fetchFriendRequests", (data) => {
          dispatch(setFriendRequests(data));
        });

        socket.on("user:setFriendshipStatus", (data) => {
          dispatch(
            modifyUserById(Number(data.id), {
              friendship: data.friendship,
            }),
          );
        });

        socket.on("message:receive", (data) => {
          dispatch(addMessage(data));
        });

        socket.on("notification", (data) => {
          dispatch(showNotification(data));
        });
      });

      //

      socket.on("connecting", (data) => {
        console.log("IO ERROR:Connecting", data);
      });
      socket.on("disconnect", (data) => {
        console.log("IO ERROR:disconnected", data);
      });
      socket.on("connect_failed", (data) => {
        console.log("IO ERROR:Connect_failed", data);
      });
      socket.on("error", (data) => {
        console.log("IO ERROR:Error", data);
      });
      socket.on("message", (data) => {
        console.log("IO ERROR:Message", data);
      });
      socket.on("reconnect", (data) => {
        console.log("IO ERROR:Reconnect", data);
      });
      socket.on("reconnecting", (data) => {
        console.log("IO ERROR:reconnecting", data);
      });
      socket.on("reconnect_failed ", (data) => {
        console.log("IO ERROR:Reconnect_failed ", data);
      });

      return () => socket.disconnect();
    }
  }, [dispatch, user]); // eslint-disable-line

  return children;
};

export default SocketManagement;
