import { uniqBy } from "lodash";

import {
  ADD_MESSAGE,
  CLEAN_UP_LAST_CHATTED_USERS,
  CLEAN_UP_MESSAGES,
  CLEAN_UP_USERS,
  FETCH_LAST_CHATTED_USERS_ERROR,
  FETCH_LAST_CHATTED_USERS_REQUEST,
  FETCH_LAST_CHATTED_USERS_SUCCESS,
  FETCH_USER_MESSAGES_ERROR,
  FETCH_USER_MESSAGES_REQUEST,
  FETCH_USER_MESSAGES_SUCCESS,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  MODIFY_USER_BY_ID,
  SET_FRIEND_REQUESTS,
  SET_FRIENDS,
  SET_SELECTED_CHAT,
} from "./actions";

const initialState = {
  users: [],
  totalUsers: 0,
  usersLoading: false,
  friends: [],
  friendRequests: [],
  userProfile: null,
  messages: [],
  totalMessages: 0,
  messagesLoading: false,
  selectedChat: null,
  lastChattedUsers: [],
  totalChattedUsers: 0,
  lastChattedUsersLoading: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
    case FETCH_USERS_ERROR:
      return { ...state, usersLoading: true };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: [...state.users, ...action.payload.rows],
        totalUsers: action.payload.count,
        usersLoading: false,
      };
    case CLEAN_UP_USERS: {
      return { ...state, users: [], totalUsers: 0 };
    }
    case SET_FRIENDS: {
      return { ...state, friends: action.payload };
    }
    case SET_FRIEND_REQUESTS: {
      return { ...state, friendRequests: action.payload };
    }
    case MODIFY_USER_BY_ID: {
      const newUsers = [...state.users];
      const index = newUsers.findIndex((u) => u.id === action.id);
      if (index !== -1) {
        newUsers[index] = { ...newUsers[index], ...action.payload };
      }
      return { ...state, users: newUsers };
    }
    case FETCH_USER_PROFILE_SUCCESS: {
      return { ...state, userProfile: action.payload };
    }
    case FETCH_USER_MESSAGES_REQUEST:
    case FETCH_USER_MESSAGES_ERROR:
      return { ...state, messagesLoading: true };
    case FETCH_USER_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: uniqBy([...state.messages, ...action.payload.rows], "id"),
        totalMessages: action.payload.count,
        messagesLoading: false,
      };
    case ADD_MESSAGE: {
      const { message, user } = action.payload;
      let newLastChattedUsers = [...state.lastChattedUsers];
      const index = newLastChattedUsers.findIndex(
        (u) => u.id === message.requesterId || u.id === message.addresseeId,
      );

      if (index !== -1) {
        // Change ordering with new message if exist
        const copyUser = { ...newLastChattedUsers[index] };
        copyUser.lastMessage = message;

        newLastChattedUsers.splice(index, 1);
        newLastChattedUsers.unshift(copyUser);
      } else if (user) {
        newLastChattedUsers.unshift({ ...user, lastMessage: message });
      }

      // Add message if chat is open
      let newMessages = [...state.messages];
      if (
        state.selectedChat &&
        (state.selectedChat.id === message.requesterId ||
          state.selectedChat.id === message.addresseeId)
      ) {
        newMessages = [message, ...state.messages];
      }

      return {
        ...state,
        messages: newMessages,
        totalMessages: state.totalMessages + 1,
        lastChattedUsers: newLastChattedUsers,
      };
    }
    case CLEAN_UP_MESSAGES: {
      return { ...state, messages: [], totalMessages: 0 };
    }
    case SET_SELECTED_CHAT: {
      return { ...state, selectedChat: action.payload };
    }
    case FETCH_LAST_CHATTED_USERS_REQUEST:
    case FETCH_LAST_CHATTED_USERS_ERROR:
      return { ...state, lastChattedUsersLoading: true };
    case FETCH_LAST_CHATTED_USERS_SUCCESS:
      return {
        ...state,
        lastChattedUsers: [...state.users, ...action.payload.rows],
        totalChattedUsers: action.payload.count,
        lastChattedUsersLoading: false,
      };
    case CLEAN_UP_LAST_CHATTED_USERS: {
      return { ...state, lastChattedUsers: [], totalChattedUsers: 0 };
    }
    default:
      return state;
  }
};

export default usersReducer;
