import * as actions from "./constant";
import { push } from "connected-react-router";

export const errorHandler = (payload) => (dispatch) => {
  try {
    let message = "";
    // if (payload.ResponseStatus && payload.ResponseStatus === "Unauthorized") {message = payload.message;localStorage.clear();} else
    message = payload && payload.message ? payload.message : "Network error";
    dispatch({
      type: actions.ERROR_HANDLER,
      payload: message,
    });
  } catch (error) {
    console.log(error);
  }
};
export const errorEmpty = () => (dispatch) => {
  dispatch({ type: actions.ERROR_EMPTY });
};
export const redirectLogin = () => async (dispatch) => {
  localStorage.clear();
  sessionStorage.clear();
  await dispatch({ type: actions.REDIRECT_LOGIN });
  dispatch(push("/"));
};
export const loader = (payload) => (dispatch) => {
  try {
    dispatch({
      type: actions.LOADER_STATUS,
      payload,
    });
  } catch (error) {
    console.log("loader:", error);
  }
};
