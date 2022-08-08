import { message } from "antd";

import { locationConstant } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const addLocation = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.ADD_LOCATION_INITIATED });
    let response = await axiosAuthPost(locationConstant.ADD_LOCATION, payload);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.ADD_LOCATION_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.ADD_LOCATION_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.ADD_LOCATION_ERROR,
      error: "Network Error",
    });
  }
};
export const getLocation = () => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_LOCATION_INITIATED });
    let response = await axiosAuthGet(locationConstant.GET_LOCATION);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_LOCATION_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_LOCATION_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_LOCATION_ERROR,
      error: "Network Error",
    });
  }
};
export const getLocationDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_LOCATION_DETAIL_INITIATED });
    let response = await axiosAuthGet(
      locationConstant.GET_LOCATION_DETAIL + id
    );
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_LOCATION_DETAIL_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_LOCATION_DETAIL_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_LOCATION_DETAIL_ERROR,
      error: "Network Error",
    });
  }
};
export const deleteLocation = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_LOCATION_INITIATED });
    let response = await axiosAuthGet(locationConstant.DELETE_LOCATION + id);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_LOCATION_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.DELETE_LOCATION_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.DELETE_LOCATION_ERROR,
      error: "Network Error",
    });
  }
};
export const enableLocation = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.ENABLE_LOCATION_INITIATED });
    let response = await axiosAuthGet(
      locationConstant.ENABLE_LOCATION + payload
    );
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.ENABLE_LOCATION_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.ENABLE_LOCATION_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.ENABLE_LOCATION_ERROR,
      error: "Network Error",
    });
  }
};
export const getLocationDrop = () => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_LOCATION_DROP_INITIATED });
    let response = await axiosAuthGet(locationConstant.GET_LOCATION_DROP);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_LOCATION_DROP_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_LOCATION_DROP_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_LOCATION_DROP_ERROR,
      error: "Network Error",
    });
  }
};
