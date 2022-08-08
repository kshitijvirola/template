import * as actions from "./constant";

const initialState = {
  error: false,
  loading: false,
  message: false,
  isRequested: false,
  isDeleted: false,
  isComplete: false,
  isInitiated: false,
  requestList: [],
  request: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_REQUEST_INITIATED:
      return {
        ...state,
        isRequested: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SAVE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isRequested: true,
      };
    case actions.SAVE_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isRequested: false,
        message: action.error,
      };
    case actions.DELETE_REQUEST_INITIATED:
      return {
        ...state,
        isDeleted: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isDeleted: true,
      };
    case actions.DELETE_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: false,
        isDeleted: false,
        message: action.error,
      };
    case actions.GET_REQUEST_LIST_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        requestList: action.payload.data,
      };
    case actions.GET_REQUEST_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.GET_REQUEST_DETAIL_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_REQUEST_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        request: action.payload.data,
      };
    case actions.GET_REQUEST_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.COMPLETE_REQUEST_INITIATED:
      return {
        ...state,
        isComplete: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.COMPLETE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isComplete: true,
      };
    case actions.COMPLETE_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isComplete: false,
        message: action.error,
      };
    case actions.INITIATED_REQUEST_INITIATED:
      return {
        ...state,
        isInitiated: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.INITIATED_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isInitiated: true,
      };
    case actions.INITIATED_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isInitiated: false,
        message: action.error,
      };
    default:
      return state;
  }
};
