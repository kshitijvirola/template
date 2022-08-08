import { message } from "antd";
import { push } from "connected-react-router";

import { employeeConstant } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const addEmployee = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.ADD_EMPLOYEE_INITIATED });
    let response = await axiosAuthPost(employeeConstant.ADD_EMPLOYEE, payload);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.ADD_EMPLOYEE_SUCCESS,
        payload: response,
      });
      dispatch(push("/employee-master"));
    } else {
      dispatch({
        type: actions.ADD_EMPLOYEE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.ADD_EMPLOYEE_ERROR,
      error: "Network Error",
    });
  }
};
export const getEmployee = () => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_EMPLOYEE_INITIATED });
    let response = await axiosAuthGet(employeeConstant.GET_EMPLOYEE);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_EMPLOYEE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_EMPLOYEE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_EMPLOYEE_ERROR,
      error: "Network Error",
    });
  }
};
export const getEmployeeDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_EMPLOYEE_DETAIL_INITIATED });
    let response = await axiosAuthGet(
      employeeConstant.GET_EMPLOYEE_DETAIL + id
    );
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_EMPLOYEE_DETAIL_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_EMPLOYEE_DETAIL_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_EMPLOYEE_DETAIL_ERROR,
      error: "Network Error",
    });
  }
};
export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_EMPLOYEE_INITIATED });
    let response = await axiosAuthGet(employeeConstant.DELETE_EMPLOYEE + id);
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_EMPLOYEE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.DELETE_EMPLOYEE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.DELETE_EMPLOYEE_ERROR,
      error: "Network Error",
    });
  }
};
export const enableEmployee = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.ENABLE_EMPLOYEE_INITIATED });
    let response = await axiosAuthGet(
      employeeConstant.ENABLE_EMPLOYEE + payload
    );
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.ENABLE_EMPLOYEE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.ENABLE_EMPLOYEE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.ENABLE_EMPLOYEE_ERROR,
      error: "Network Error",
    });
  }
};
export const getEmployeeLocation = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_EMPLOYEE_LOCATION_INITIATED });
    let response = await axiosAuthGet(
      employeeConstant.GET_EMPLOYEE_LOCATION + id
    );
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_EMPLOYEE_LOCATION_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_EMPLOYEE_LOCATION_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_EMPLOYEE_LOCATION_ERROR,
      error: "Network Error",
    });
  }
};
