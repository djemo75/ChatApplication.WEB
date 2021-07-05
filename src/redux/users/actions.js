import { asyncAction } from "utils/asyncAction";

export const FETCH_USERS_REQUEST = "fetchUsers/request";
export const FETCH_USERS_SUCCESS = "fetchUsers/success";
export const FETCH_USERS_ERROR = "fetchUsers/error";

export const fetchUsers = (params) => {
  return asyncAction({
    types: [FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR],
    endpoint: "/users",
    params,
  });
};

//-----

export const FETCH_FRIEND_REQUEST_REQUEST = "fetchFriendRequest/request";
export const FETCH_FRIEND_REQUEST_SUCCESS = "fetchFriendRequest/success";
export const FETCH_FRIEND_REQUEST_ERROR = "fetchFriendRequest/error";

export const fetchFriendRequest = (userId, friendId) => {
  return asyncAction({
    types: [
      FETCH_FRIEND_REQUEST_REQUEST,
      FETCH_FRIEND_REQUEST_SUCCESS,
      FETCH_FRIEND_REQUEST_ERROR,
    ],
    endpoint: `/users/${userId}/friends/${friendId}`,
  });
};

//-----

export const SEND_FRIEND_REQUEST_REQUEST = "sendFriendRequest/request";
export const SEND_FRIEND_REQUEST_SUCCESS = "sendFriendRequest/success";
export const SEND_FRIEND_REQUEST_ERROR = "sendFriendRequest/error";

export const sendFriendRequest = (userId) => {
  return asyncAction({
    types: [
      SEND_FRIEND_REQUEST_REQUEST,
      SEND_FRIEND_REQUEST_SUCCESS,
      SEND_FRIEND_REQUEST_ERROR,
    ],
    endpoint: `/users/${userId}/friends`,
    method: "post",
    successMessage: "A friend request has been sent",
    errorMessage: "There was an error sending the friend request",
  });
};

//-----

export const ACCEPT_FRIEND_REQUEST_REQUEST = "acceptFriendRequest/request";
export const ACCEPT_FRIEND_REQUEST_SUCCESS = "acceptFriendRequest/success";
export const ACCEPT_FRIEND_REQUEST_ERROR = "acceptFriendRequest/error";

export const acceptFriendRequest = (userId) => {
  return asyncAction({
    types: [
      ACCEPT_FRIEND_REQUEST_REQUEST,
      ACCEPT_FRIEND_REQUEST_SUCCESS,
      ACCEPT_FRIEND_REQUEST_ERROR,
    ],
    endpoint: `/users/${userId}/friends`,
    method: "put",
    successMessage: "The friend request has been accepted",
    errorMessage: "There was an error accepting the friend request",
  });
};

//-----

export const CANCEL_FRIEND_REQUEST_REQUEST = "cancelFriendRequest/request";
export const CANCEL_FRIEND_REQUEST_SUCCESS = "cancelFriendRequest/success";
export const CANCEL_FRIEND_REQUEST_ERROR = "cancelFriendRequest/error";

export const cancelFriendRequest = (userId) => {
  return asyncAction({
    types: [
      CANCEL_FRIEND_REQUEST_REQUEST,
      CANCEL_FRIEND_REQUEST_SUCCESS,
      CANCEL_FRIEND_REQUEST_ERROR,
    ],
    endpoint: `/users/${userId}/friends`,
    method: "delete",
  });
};

//-----

export const CLEAN_UP_USERS = "cleanUpUsers";

export const cleanUpUsers = () => {
  return (dispatch) => dispatch({ type: CLEAN_UP_USERS });
};

//-----

export const SET_FRIENDS = "setFriends";

export const setFriends = (payload) => {
  return (dispatch) => dispatch({ type: SET_FRIENDS, payload });
};

//-----

export const SET_FRIEND_REQUESTS = "setFriendRequests";

export const setFriendRequests = (payload) => {
  return (dispatch) => dispatch({ type: SET_FRIEND_REQUESTS, payload });
};

//-----

export const MODIFY_USER_BY_ID = "modifyUserById";

export const modifyUserById = (id, payload) => {
  return (dispatch) => dispatch({ type: MODIFY_USER_BY_ID, id, payload });
};
