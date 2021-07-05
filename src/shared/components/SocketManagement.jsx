import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
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

      socket.on("connect", (data) => {
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
      });

      //
      socket.on("connecting", (data) => {
        console.log("Connecting", data);
      });
      socket.on("disconnect", (data) => {
        console.log("disconnected", data);
      });
      socket.on("connect_failed", (data) => {
        console.log("Connect_failed", data);
      });
      socket.on("error", (data) => {
        console.log("Error", data);
      });
      socket.on("message", (data) => {
        console.log("Message", data);
      });
      socket.on("reconnect", (data) => {
        console.log("Reconnect", data);
      });
      socket.on("reconnecting", (data) => {
        console.log("reconnecting", data);
      });
      socket.on("reconnect_failed ", (data) => {
        console.log("Reconnect_failed ", data);
      });

      socket.on("notification", (data) => {
        if (data.type && data.message) toast[data.type](data.message);
      });

      return () => socket.disconnect();
    }
  }, [dispatch, user]); // eslint-disable-line

  return children;
};

export default SocketManagement;
