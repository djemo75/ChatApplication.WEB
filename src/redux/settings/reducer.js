import { toast } from "react-toastify";
import { getLocalStorageBooleanItem } from "utils/localStorage";

import {
  SET_IS_ENABLED_FRIENDSHIP_NOTIFICATION,
  SHOW_NOTIFICATION,
} from "./actions";

const initialState = {
  isEnabledFriendshipNotification:
    getLocalStorageBooleanItem("isEnabledFriendshipNotification") !== undefined
      ? getLocalStorageBooleanItem("isEnabledFriendshipNotification")
      : true,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_ENABLED_FRIENDSHIP_NOTIFICATION:
      return { ...state, isEnabledFriendshipNotification: action.payload };
    case SHOW_NOTIFICATION: {
      const { type, message } = action.payload;
      if (state.isEnabledFriendshipNotification && type && message) {
        toast[type](message);
      }
      return { ...state };
    }
    default:
      return state;
  }
};

export default settingsReducer;
