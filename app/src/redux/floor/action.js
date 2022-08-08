import { message } from "antd";

import { floorConstant } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const addFloor = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.ADD_FLOOR_INITIATED });
    let response = await axiosAuthPost(floorConstant.ADD_FLOOR, payload);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.ADD_FLOOR_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.ADD_FLOOR_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.ADD_FLOOR_ERROR,
      error: "Network Error",
    });
  }
};
export const getFloor = () => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_FLOOR_INITIATED });
    let response = await axiosAuthGet(floorConstant.GET_FLOOR);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_FLOOR_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_FLOOR_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_FLOOR_ERROR,
      error: "Network Error",
    });
  }
};
export const getFloorDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_FLOOR_DETAIL_INITIATED });
    let response = await axiosAuthGet(floorConstant.GET_FLOOR_DETAIL + id);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_FLOOR_DETAIL_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_FLOOR_DETAIL_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_FLOOR_DETAIL_ERROR,
      error: "Network Error",
    });
  }
};
export const deleteFloor = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_FLOOR_INITIATED });
    let response = await axiosAuthGet(floorConstant.DELETE_FLOOR + id);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_FLOOR_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.DELETE_FLOOR_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.DELETE_FLOOR_ERROR,
      error: "Network Error",
    });
  }
};
export const enableFloor = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.ENABLE_FLOOR_INITIATED });
    let response = await axiosAuthGet(floorConstant.ENABLE_FLOOR + payload);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.ENABLE_FLOOR_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.ENABLE_FLOOR_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.ENABLE_FLOOR_ERROR,
      error: "Network Error",
    });
  }
};
export const getFloorDrop = () => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_FLOOR_DROP_INITIATED });
    let response = await axiosAuthGet(floorConstant.GET_FLOOR_DROP);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_FLOOR_DROP_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_FLOOR_DROP_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_FLOOR_DROP_ERROR,
      error: "Network Error",
    });
  }
};
