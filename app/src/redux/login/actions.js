import { push } from "connected-react-router";
import { message } from "antd";

import { axiosGet, axiosPost } from "modules/Axios";
import { apiConstant } from "modules/config";
import * as actions from "./constant";

export const login = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.LOGIN_INITIATED });
    let response = await axiosPost(apiConstant.AUTH_LOGIN, payload);
    if (response.status || response.code === "200") {
      await dispatch({ type: actions.LOGIN_SUCCESS, payload: response });
      let data = response.data;
      message.success(response.message);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          prj: "kd",
          userId: data.userid,
          userName: data.name,
          role: data.role,
          email: data.email,
          number: data.number,
          sessionId: data.sessionid,
          image: data.profileimage,
          logtime: new Date(),
        })
      );
      dispatch(push("/"));
      window.location.reload();
    } else dispatch({ type: actions.LOGIN_ERROR, error: response.message });
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
    let url =
      JSON.parse(localStorage.auth).sessionId +
      "/" +
      JSON.parse(localStorage.auth).userId;
    dispatch({ type: actions.LOGOUT_INITIATED });
    let response = await axiosGet(apiConstant.AUTH_LOGOUT + url);
    if (response.status || response.code === "200")
      message.success(response.message);
    localStorage.auth && localStorage.removeItem("auth");
    localStorage.abcd && localStorage.removeItem("abcd");
    localStorage.sid && localStorage.removeItem("sid");
    emptyCache();
    dispatch({ type: actions.LOGOUT });
    dispatch(push("/login"));
    window.location.reload();
  } catch (error) {
    console.log(error, "Logout Error");
  }
};
export const checkSession = () => async (dispatch) => {
  try {
    if (localStorage.auth) {
      dispatch({ type: actions.CHECK_SESSION_INITIATED });
      const sessionid = JSON.parse(localStorage.auth).sessionId;
      const userId = JSON.parse(localStorage.auth).userId;
      let response = await axiosGet(
        apiConstant.CHECK_SESSION + sessionid + "/" + userId
      );
      if (response && !response.status) {
        dispatch({ type: actions.CHECK_SESSION_ERROR });
        dispatch(logout());
      } else await dispatch({ type: actions.CHECK_SESSION_SUCCESS });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.CHECK_SESSION_ERROR,
      error: "Network Error",
    });
  }
};
export const emptyCache = () => {
  if ("caches" in window)
    caches.keys().then((a) => {
      a.forEach((b) => {
        caches.delete(b);
      });
    });
};
