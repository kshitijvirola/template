import { message } from "antd";
import { push } from "connected-react-router";

import { requestTypeConstant } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const getRequestType = () => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_REQUEST_TYPE_INITIATED });
    let response = await axiosAuthGet(requestTypeConstant.GET_REQUEST_TYPE);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_REQUEST_TYPE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_REQUEST_TYPE_ERROR,
        error: "Network Error",
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_REQUEST_TYPE_ERROR,
      error: "Network Error",
    });
  }
};
