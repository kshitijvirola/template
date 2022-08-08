import { message } from "antd";
import { push } from "connected-react-router";

import { porterDataConstant } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const updatePorterProfile = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.UPDATE_PORTER_PROFILE_INITIATED });
    let response = await axiosAuthPost(
      porterDataConstant.UPDATE_PORTER_PROFILE,
      payload
    );
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.UPDATE_PORTER_PROFILE_SUCCESS,
        payload: response,
      });
      dispatch(push("/porter-master"));
    } else {
      dispatch({
        type: actions.UPDATE_PORTER_PROFILE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.UPDATE_PORTER_PROFILE_ERROR,
      error: "Network Error",
    });
  }
};
export const getPorterRequestList = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_REQUEST_LIST_INITIATED });
    let response = await axiosAuthGet(porterDataConstant.GET_REQUEST_LIST + id);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_REQUEST_LIST_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_REQUEST_LIST_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_REQUEST_LIST_ERROR,
      error: "Network Error",
    });
  }
};

export const setRequestAcceptance = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SET_REQUEST_ACCEPTANCE_INITIATED });
    let response = await axiosAuthGet(
      porterDataConstant.SET_REQUEST_ACCEPTANCE + payload
    );
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.SET_REQUEST_ACCEPTANCE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.SET_REQUEST_ACCEPTANCE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.SET_REQUEST_ACCEPTANCE_ERROR,
      error: "Network Error",
    });
  }
};

export const getAcceptedRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_ACCEPTED_REQUEST_INITIATED });
    let response = await axiosAuthGet(
      porterDataConstant.GET_ACCEPTED_REQUEST + id
    );
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_ACCEPTED_REQUEST_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_ACCEPTED_REQUEST_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_ACCEPTED_REQUEST_ERROR,
      error: "Network Error",
    });
  }
};
export const getRejectedRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_REJECTED_REQUEST_INITIATED });
    let response = await axiosAuthGet(
      porterDataConstant.GET_REJECTED_REQUEST + id
    );
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_REJECTED_REQUEST_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_REJECTED_REQUEST_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_REJECTED_REQUEST_ERROR,
      error: "Network Error",
    });
  }
};
export const setStartJob = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SET_START_JOB_INITIATED });
    let response = await axiosAuthGet(
      porterDataConstant.SET_START_JOB + payload
    );
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.SET_START_JOB_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.SET_START_JOB_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.SET_START_JOB_ERROR,
      error: "Network Error",
    });
  }
};
export const setFinishJob = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SET_FINISH_JOB_INITIATED });
    let response = await axiosAuthGet(
      porterDataConstant.SET_FINISH_JOB + payload
    );
    if (response.status || response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.SET_FINISH_JOB_SUCCESS,
        payload: response,
      });
      dispatch(push("/job-finished"));
    } else {
      dispatch({
        type: actions.SET_FINISH_JOB_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.SET_FINISH_JOB_ERROR,
      error: "Network Error",
    });
  }
};
export const getStatus = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_STATUS_INITIATED });
    let response = await axiosAuthGet(porterDataConstant.GET_STATUS + id);
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_STATUS_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_STATUS_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_STATUS_ERROR,
      error: "Network Error",
    });
  }
};

export const getUpdateStatus = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_UPDATE_STATUS_INITIATED });
    let response = await axiosAuthGet(
      porterDataConstant.GET_UPDATE_STATUS + payload
    );
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_UPDATE_STATUS_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_UPDATE_STATUS_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_UPDATE_STATUS_ERROR,
      error: "Network Error",
    });
  }
};

export const getPorterProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PORTER_PROFILE_INITIATED });
    let response = await axiosAuthGet(
      porterDataConstant.GET_PORTER_PROFILE + id
    );
    if (response.status || response.code === "200") {
      await dispatch({
        type: actions.GET_PORTER_PROFILE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PORTER_PROFILE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_PORTER_PROFILE_ERROR,
      error: "Network Error",
    });
  }
};
