import { reportConstant } from "modules/config";
import { axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const getEmployeeReport = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.EMPLOYEE_REPORT_INITIATED });
    let response = await axiosAuthGet(reportConstant.EMPLOYEE_REPORT + payload);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.EMPLOYEE_REPORT_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.EMPLOYEE_REPORT_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.EMPLOYEE_REPORT_ERROR,
      error: "Network Error",
    });
  }
};
export const getPorterReport = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.PORTER_REPORT_INITIATED });
    let response = await axiosAuthGet(reportConstant.PORTER_REPORT + payload);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.PORTER_REPORT_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.PORTER_REPORT_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.PORTER_REPORT_ERROR,
      error: "Network Error",
    });
  }
};
export const getJobReport = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.JOB_REPORT_INITIATED });
    let response = await axiosAuthGet(reportConstant.JOB_REPORT + payload);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.JOB_REPORT_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.JOB_REPORT_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.JOB_REPORT_ERROR,
      error: "Network Error",
    });
  }
};
export const getFloorReport = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.FLOOR_REPORT_INITIATED });
    let response = await axiosAuthGet(reportConstant.FLOOR_REPORT + payload);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.FLOOR_REPORT_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.FLOOR_REPORT_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.FLOOR_REPORT_ERROR,
      error: "Network Error",
    });
  }
};
export const getLocationReport = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.LOCATION_REPORT_INITIATED });
    let response = await axiosAuthGet(reportConstant.LOCATION_REPORT + payload);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.LOCATION_REPORT_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.LOCATION_REPORT_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.LOCATION_REPORT_ERROR,
      error: "Network Error",
    });
  }
};

export const getDashboardDetail = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_DASHBOARD_DETAIL_INITIATED });
    let response = await axiosAuthGet(
      reportConstant.GET_DASHBOARD_DETAIL + payload
    );
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_DASHBOARD_DETAIL_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_DASHBOARD_DETAIL_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_DASHBOARD_DETAIL_ERROR,
      error: "Network Error",
    });
  }
};

export const getPieChart = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PIE_CHART_INITIATED });
    let response = await axiosAuthGet(reportConstant.GET_PIE_CHART + payload);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_PIE_CHART_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PIE_CHART_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_PIE_CHART_ERROR,
      error: "Network Error",
    });
  }
};
