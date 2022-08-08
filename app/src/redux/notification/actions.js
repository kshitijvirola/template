import { axiosAuthGet } from "modules/Axios";
import { notificationConstant } from "modules/config";
import * as actions from "./constant";

export const getNotification = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_NOTIFICATION_INITIATED });
    let response = await axiosAuthGet(
      notificationConstant.GET_NOTIFICATION + id
    );
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_NOTIFICATION_SUCCESS,
        payload: response,
      });
    } else
      dispatch({
        type: actions.GET_NOTIFICATION_ERROR,
        error: response.message,
      });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_NOTIFICATION_ERROR,
      error: "Network Error",
    });
  }
};

export const getReadNotification = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_READ_NOTIFICATION_INITIATED });
    let response = await axiosAuthGet(
      notificationConstant.GET_READ_NOTIFICATION + id
    );
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_READ_NOTIFICATION_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_READ_NOTIFICATION_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_READ_NOTIFICATION_ERROR,
      error: "Network Error",
    });
  }
};
