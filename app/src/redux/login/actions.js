import { push } from "connected-react-router";

import { axiosPost, axiosLogout } from "modules/Axios";
import { loader } from "redux/app/actions";
import { apiConstant } from "modules/config";
import * as actions from "./constant";

export const login = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.LOGIN_INITIATED });
    let response = await axiosPost(apiConstant.AUTH_LOGIN, payload);
    if (response.responseCode !== "200") {
      dispatch({
        type: actions.LOGIN_ERROR,
        error: response.message,
      });
    } else {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          email: response.email,
          sessionId: response.sessionId,
          token: response.token,
          userId: response.userId,
          userName: response.userName,
        })
      );
      await dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: response,
      });
      dispatch(push("/home"));
      window.location.reload();
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.LOGIN_ERROR,
      error: "Network Error",
    });
  }
};
export const setAuth = (payload) => (dispatch) => {
  dispatch({
    type: actions.SET_AUTH,
    payload,
  });
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: actions.LOGOUT_INITIATED });
    dispatch(loader(true));
    let session_id = JSON.parse(localStorage.auth).sessionId;
    let user_Id = JSON.parse(localStorage.auth).userId;
    let token = JSON.parse(localStorage.auth).token;
    localStorage.removeItem("auth");
    dispatch({ type: actions.LOGOUT });
    dispatch(loader(false));
    // await axiosLogout(session_id + "/" + user_Id, token);
    window.location.pathname !== "/login" && dispatch(push("/login"));
  } catch (error) {
    dispatch(loader(false));
    console.log(error, "Logout Error");
  }
};
