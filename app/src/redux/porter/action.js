import { message } from "antd";
import { push } from "connected-react-router";

import { porterConstant } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const addPorter = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.ADD_PORTER_INITIATED });
    let response = await axiosAuthPost(porterConstant.ADD_PORTER, payload);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.ADD_PORTER_SUCCESS,
        payload: response,
      });
      dispatch(push("/porter-master"));
    } else {
      dispatch({
        type: actions.ADD_PORTER_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.ADD_PORTER_ERROR,
      error: "Network Error",
    });
  }
};
export const getPorter = () => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PORTER_INITIATED });
    let response = await axiosAuthGet(porterConstant.GET_PORTER);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_PORTER_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PORTER_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_PORTER_ERROR,
      error: "Network Error",
    });
  }
};
export const getPorterDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PORTER_DETAIL_INITIATED });
    let response = await axiosAuthGet(porterConstant.GET_PORTER_DETAIL + id);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_PORTER_DETAIL_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PORTER_DETAIL_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_PORTER_DETAIL_ERROR,
      error: "Network Error",
    });
  }
};
export const deletePorter = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_PORTER_INITIATED });
    let response = await axiosAuthGet(porterConstant.DELETE_PORTER + id);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_PORTER_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.DELETE_PORTER_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.DELETE_PORTER_ERROR,
      error: "Network Error",
    });
  }
};
export const enablePorter = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.ENABLE_PORTER_INITIATED });
    let response = await axiosAuthGet(porterConstant.ENABLE_PORTER + payload);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.ENABLE_PORTER_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.ENABLE_PORTER_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.ENABLE_PORTER_ERROR,
      error: "Network Error",
    });
  }
};
