import { message } from "antd";

import { axiosAuthPost } from "modules/Axios";
import { apiConstant } from "modules/config";
import { logout } from "redux/login/actions";
import * as actions from "./constant";

export const toggleCheckPwd = (payload) => (dispatch) => {
  dispatch({
    type: actions.TOGGLE_CHECK_PASSWORD,
    payload,
  });
};
export const changePassword = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.CHANGE_PASSWORD_INITIATED });
    let response = await axiosAuthPost(apiConstant.CHANGE_PASSWORD, payload);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({ type: actions.CHANGE_PASSWORD_SUCCESS });
      setTimeout(() => {
        dispatch(logout());
      }, 500);
    } else {
      dispatch({ type: actions.CHANGE_PASSWORD_ERROR });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.CHANGE_PASSWORD_ERROR,
      error: "Network Error",
    });
  }
};
