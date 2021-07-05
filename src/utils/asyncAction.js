import axios from "axios";
import { toast } from "react-toastify";

export const asyncAction = (props) => {
  const {
    types,
    endpoint,
    method,
    data,
    params,
    responseType,
    successMessage,
    errorMessage,
    showErrorMessage = true,
  } = props;

  const [requestType, successType, errorType] = types;

  return async (dispatch) => {
    dispatch({ type: requestType });

    return axios({
      url: endpoint,
      method: method || "get",
      params,
      data,
      responseType,
    })
      .then((response) => {
        if (successMessage) {
          toast.success(successMessage);
        } else if (response.data && response.data.message) {
          toast.success(response.data.message);
        }

        dispatch({ type: successType, payload: response.data });
        return { payload: response.data };
      })
      .catch((error) => {
        if (showErrorMessage) {
          if (error && !errorMessage) {
            toast.error(error);
          } else if (errorMessage) {
            toast.error(errorMessage);
          }
        }

        dispatch({ type: errorType });
        return { error };
      });
  };
};
