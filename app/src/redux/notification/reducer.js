import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  notification: [],
  Readnotify: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_NOTIFICATION_INITIATED:
      return {
        ...state,
        error: false,
        loading: true,
        message: false,
      };
    case actions.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        message: false,
        notification: action.payload.data,
      };
    case actions.GET_NOTIFICATION_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.payload,
      };
    case actions.GET_READ_NOTIFICATION_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_READ_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        Readnotify: action.payload.data,
      };
    case actions.GET_READ_NOTIFICATION_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    default:
      return state;
  }
};
