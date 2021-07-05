import { asyncAction } from "utils/asyncAction";

export const LOGIN_REQUEST = "login/request";
export const LOGIN_SUCCESS = "login/success";
export const LOGIN_ERROR = "login/error";

export const login = (data) => {
  return asyncAction({
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR],
    method: "post",
    endpoint: "/auth/login",
    data,
  });
};

//-----

export const REGISTER_REQUEST = "register/request";
export const REGISTER_SUCCESS = "register/success";
export const REGISTER_ERROR = "register/error";

export const register = (data) => {
  return asyncAction({
    types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR],
    method: "post",
    endpoint: "/auth/register",
    data,
  });
};

//-----

export const GET_PROFILE_REQUEST = "getProfile/request";
export const GET_PROFILE_SUCCESS = "getProfile/success";
export const GET_PROFILE_ERROR = "getProfile/error";

export const getProfile = () => {
  return asyncAction({
    types: [GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_ERROR],
    endpoint: "/users/profile",
  });
};

//-----

export const REFRESH_TOKEN_REQUEST = "refreshToken/request";
export const REFRESH_TOKEN_SUCCESS = "refreshToken/success";
export const REFRESH_TOKEN_ERROR = "refreshToken/error";

export const refreshAuthToken = (data) => {
  return asyncAction({
    types: [REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_ERROR],
    endpoint: "/auth/refreshToken",
    method: "post",
    data,
    showErrorMessage: false,
  });
};

//-----

export const SET_AUTH_LOADING = "SET_AUTH_LOADING";

export const setAuthLoading = (payload) => {
  return (dispatch) => dispatch({ type: SET_AUTH_LOADING, payload });
};

//-----

export const LOGOUT = "LOGOUT";

export const logout = () => {
  localStorage.clear();

  return (dispatch) => {
    dispatch({ type: LOGOUT });
    window.location = `${window.origin}/login`;
  };
};
