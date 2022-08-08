import { message } from "antd";
import { push } from "connected-react-router";
import { employeeConstant } from "modules/config";
import { axiosAuthGet, axiosAuthPost } from "modules/Axios";
import * as actions from "./constant";

export const getProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PROFILE_INITIATED });
    let response = await axiosAuthGet(employeeConstant.GET_PROFILE + id);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_PROFILE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PROFILE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_PROFILE_ERROR,
      error: "Network Error",
    });
  }
};

export const UpdateProfile = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.UPDATE_PROFILE_INITIATED });
    let response = await axiosAuthPost(
      employeeConstant.UPDATE_PROFILE,
      payload
    );
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.UPDATE_PROFILE_SUCCESS,
        payload: response,
      });
      dispatch(push(""));
    } else {
      dispatch({
        type: actions.UPDATE_PROFILE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.UPDATE_PROFILE_ERROR,
      error: "Network Error",
    });
  }
};
