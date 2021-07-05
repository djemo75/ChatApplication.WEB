import {
  CLEAN_UP_USERS,
  FETCH_USERS_ERROR,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  MODIFY_USER_BY_ID,
  SET_FRIEND_REQUESTS,
  SET_FRIENDS,
} from "./actions";

const initialState = {
  users: [],
  totalUsers: 0,
  usersLoading: false,
  friends: [],
  friendRequests: [],
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
    default:
      return state;
  }
};

export default usersReducer;
