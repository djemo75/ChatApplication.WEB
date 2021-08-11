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

export const FETCH_USER_PROFILE_REQUEST = "fetchUserProfile/request";
export const FETCH_USER_PROFILE_SUCCESS = "fetchUserProfile/success";
export const FETCH_USER_PROFILE_ERROR = "fetchUserProfile/error";

export const fetchUserProfile = (userId) => {
  return asyncAction({
    types: [
      FETCH_USER_PROFILE_REQUEST,
      FETCH_USER_PROFILE_SUCCESS,
      FETCH_USER_PROFILE_ERROR,
    ],
    endpoint: `/users/${userId}/profile`,
  });
};

//-----

export const EDIT_PROFILE_REQUEST = "editProfile/request";
export const EDIT_PROFILE_SUCCESS = "editProfile/success";
export const EDIT_PROFILE_ERROR = "editProfile/error";

export const editProfile = (data) => {
  return asyncAction({
    types: [EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_ERROR],
    endpoint: "/users/profile",
    method: "put",
    data,
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

export const UPLOAD_IMAGE_REQUEST = "uploadImage/request";
export const UPLOAD_IMAGE_SUCCESS = "uploadImage/success";
export const UPLOAD_IMAGE_ERROR = "uploadImage/error";

export const uploadImage = (file) => {
  const data = new FormData();
  data.append("file", file);

  return asyncAction({
    types: [UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_ERROR],
    endpoint: "/resources/images/upload",
    method: "post",
    data,
  });
};

//-----

export const UPLOAD_AUDIO_REQUEST = "uploadAudio/request";
export const UPLOAD_AUDIO_SUCCESS = "uploadAudio/success";
export const UPLOAD_AUDIO_ERROR = "uploadAudio/error";

export const uploadAudio = (file) => {
  const data = new FormData();
  data.append("file", file);

  return asyncAction({
    types: [UPLOAD_AUDIO_REQUEST, UPLOAD_AUDIO_SUCCESS, UPLOAD_AUDIO_ERROR],
    endpoint: "/resources/audios/upload",
    method: "post",
    data,
  });
};

//-----

export const FETCH_IMAGE_REQUEST = "fetchImage/request";
export const FETCH_IMAGE_SUCCESS = "fetchImage/success";
export const FETCH_IMAGE_ERROR = "fetchImage/error";

export const fetchImage = (id) => {
  return asyncAction({
    types: [FETCH_IMAGE_REQUEST, FETCH_IMAGE_SUCCESS, FETCH_IMAGE_ERROR],
    endpoint: `/resources/${id}`,
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

//-----

export const FETCH_USER_MESSAGES_REQUEST = "fetchUserMessages/request";
export const FETCH_USER_MESSAGES_SUCCESS = "fetchUserMessages/success";
export const FETCH_USER_MESSAGES_ERROR = "fetchUserMessages/error";

export const fetchUserMessages = (userId, params) => {
  return asyncAction({
    types: [
      FETCH_USER_MESSAGES_REQUEST,
      FETCH_USER_MESSAGES_SUCCESS,
      FETCH_USER_MESSAGES_ERROR,
    ],
    endpoint: `/users/${userId}/messages`,
    params,
  });
};

//-----

export const CLEAN_UP_MESSAGES = "cleanUpMessages";

export const cleanUpMessages = () => {
  return (dispatch) => dispatch({ type: CLEAN_UP_MESSAGES });
};

//-----

export const ADD_MESSAGE = "addMessage";

export const addMessage = (payload) => {
  return (dispatch) => dispatch({ type: ADD_MESSAGE, payload });
};

//-----

export const SET_SELECTED_CHAT = "setSelectedChat";

export const setSelectedChat = (payload) => {
  return (dispatch) => dispatch({ type: SET_SELECTED_CHAT, payload });
};

//-----

export const FETCH_LAST_CHATTED_USERS_REQUEST = "fetchLastChattedUsers/request";
export const FETCH_LAST_CHATTED_USERS_SUCCESS = "fetchLastChattedUsers/success";
export const FETCH_LAST_CHATTED_USERS_ERROR = "fetchLastChattedUsers/error";

export const fetchLastChattedUsers = (params) => {
  return asyncAction({
    types: [
      FETCH_LAST_CHATTED_USERS_REQUEST,
      FETCH_LAST_CHATTED_USERS_SUCCESS,
      FETCH_LAST_CHATTED_USERS_ERROR,
    ],
    endpoint: "/users/lastChattedUsers",
    params,
  });
};

//-----

export const CLEAN_UP_LAST_CHATTED_USERS = "cleanUpLastChattedUsers";

export const cleanUpLastChattedUsers = () => {
  return (dispatch) => dispatch({ type: CLEAN_UP_LAST_CHATTED_USERS });
};
