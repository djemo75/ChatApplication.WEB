import {
  GET_PROFILE_ERROR,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGOUT,
  SET_AUTH_LOADING,
} from "./actions";

const initialState = {
  user: null,
  userLoading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
    case GET_PROFILE_ERROR:
      return { ...state, userLoading: true };
    case SET_AUTH_LOADING:
      return { ...state, userLoading: action.payload };
    case GET_PROFILE_SUCCESS:
      return { ...state, user: action.payload, userLoading: false };
    case LOGOUT:
      return { ...state, user: null, userLoading: false };
    default:
      return state;
  }
};

export default authReducer;
