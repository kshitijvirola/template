import { message } from "antd";

import { configVar, transferConstant } from "modules/config";
import { axiosAuthPost } from "modules/Axios";
import * as actions from "./constant";

export const importEmployee = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.IMPORT_EMPLOYEE_INITIATED });
    let response = await axiosAuthPost(
      transferConstant.IMPORT_EMPLOYEE,
      payload
    );
    if (response.status || response.code === "200") {
      window.open(configVar.BASE_URL + response.data.file, "_blank");
      message.success(response.message);
      await dispatch({
        type: actions.IMPORT_EMPLOYEE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.IMPORT_EMPLOYEE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.IMPORT_EMPLOYEE_ERROR,
      error: "Network Error",
    });
  }
};

export const importPorter = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.IMPORT_PORTER_INITIATED });
    let response = await axiosAuthPost(transferConstant.IMPORT_PORTER, payload);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.IMPORT_PORTER_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.IMPORT_PORTER_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.IMPORT_PORTER_ERROR,
      error: "Network Error",
    });
  }
};
