import axios from "axios";
import jwt from "jsonwebtoken";
import moment from "moment";
import { toast } from "react-toastify";
import { logout, refreshAuthToken } from "redux/auth/actions";
import store from "redux/store";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const refreshLogoutMsg = "Your session has run out. You need to login again.";
const refreshErrorMsg = "Something went wrong with refreshing your session.";

const axiosSetup = () => {
  let isRefreshing = false;

  axios.interceptors.request.use(async (request) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    request.baseURL = baseURL;
    request.headers.common["Authorization"] = `Bearer ${accessToken}`;

    if (accessToken && refreshToken) {
      const { exp } = jwt.decode(accessToken);
      const { exp: refreshTokenExp } = jwt.decode(refreshToken);
      // if expires is > less than 15 mins in the future
      const expiresSoon = moment().isAfter(
        moment(exp * 1000).subtract(15, "minutes"),
      );

      const isRefreshTokenActive = moment().isBefore(
        moment(refreshTokenExp * 1000),
      );

      if (expiresSoon && !isRefreshing) {
        if (isRefreshTokenActive) {
          isRefreshing = true;
          await store
            .dispatch(refreshAuthToken({ refreshToken }))
            .then((action) => {
              if (!action.error) {
                const { accessToken, refreshToken } = action.payload;
                // Set new accesToken in header
                request.headers.common[
                  "Authorization"
                ] = `Bearer ${accessToken}`;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
              } else {
                toast.error(refreshErrorMsg);
                setTimeout(() => store.dispatch(logout()), 5000);
              }
            });
          isRefreshing = false;
          return request;
        } else {
          toast.error(refreshLogoutMsg);
          setTimeout(() => store.dispatch(logout()), 5000);
          // Cancel the request if refresh token has expired
          throw new axios.Cancel();
        }
      } else {
        return request;
      }
    } else {
      return request;
    }
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!axios.isCancel(error)) {
        return Promise.reject(extractError(error));
      }
    },
  );
};

const extractError = (da) => {
  const { response } = da;
  if (!navigator.onLine) {
    return "Network problem!";
  } else {
    if (
      response &&
      response.data &&
      typeof response.data === "object" &&
      typeof response.data.message === "string"
    ) {
      return response.data.message;
    } else if (response && response.data && typeof response.data === "string") {
      return response.data;
    } else {
      return "For some reason the request failed!";
    }
  }
};

export default axiosSetup;
