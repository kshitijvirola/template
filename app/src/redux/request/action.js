import { message } from "antd";
import { push } from "connected-react-router";

import { requestConstant } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const saveRequest = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_REQUEST_INITIATED });
    let response = await axiosAuthPost(requestConstant.SAVE_REQUEST, payload);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_REQUEST_SUCCESS,
        payload: response,
      });
      dispatch(push("/"));
    } else {
      dispatch({
        type: actions.SAVE_REQUEST_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_REQUEST_ERROR,
      error: error,
    });
  }
};
export const deleteRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_REQUEST_INITIATED });
    let response = await axiosAuthGet(requestConstant.DELETE_REQUEST + id);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_REQUEST_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.DELETE_REQUEST_ERROR,
        error: "Network Error",
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.DELETE_REQUEST_ERROR,
      error: "Network Error",
    });
  }
};
export const getRequestList = (req) => async (dispatch) => {
  try {
    let id = req?.id ? req.id : req;
    req?.show && dispatch({ type: actions.GET_REQUEST_LIST_INITIATED });
    let response = await axiosAuthGet(requestConstant.GET_REQUEST + id);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_REQUEST_LIST_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_REQUEST_LIST_ERROR,
        error: "Network Error",
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_REQUEST_LIST_ERROR,
      error: "Network Error",
    });
  }
};
export const getRequestDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_REQUEST_DETAIL_INITIATED });
    let response = await axiosAuthGet(requestConstant.GET_REQUEST_DETAIL + id);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_REQUEST_DETAIL_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_REQUEST_DETAIL_ERROR,
        error: "Network Error",
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_REQUEST_DETAIL_ERROR,
      error: "Network Error",
    });
  }
};
export const setCompleteRequest = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.COMPLETE_REQUEST_INITIATED });
    let response = await axiosAuthGet(
      requestConstant.COMPLETE_REQUEST + payload
    );
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.COMPLETE_REQUEST_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.COMPLETE_REQUEST_ERROR,
        error: "Network Error",
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.COMPLETE_REQUEST_ERROR,
      error: "Network Error",
    });
  }
};
export const initiatedRequest = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.INITIATED_REQUEST_INITIATED });
    let response = await axiosAuthGet(
      requestConstant.INITIATED_REQUEST + payload
    );
    if (response.message || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.INITIATED_REQUEST_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.INITIATED_REQUEST_ERROR,
        error: "Network Error",
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.INITIATED_REQUEST_ERROR,
      error: "Network Error",
    });
  }
};
