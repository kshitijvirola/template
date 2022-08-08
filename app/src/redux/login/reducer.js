import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isAuthenticated: false,
  userId: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_INITIATED:
      return {
        ...state,
        isAuthenticated: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isAuthenticated: true,
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isAuthenticated: false,
        message: action.error,
      };
    case actions.SET_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload,
      };
    case actions.LOGOUT_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.LOGOUT:
      return {
        ...state,
        error: false,
        loading: false,
        message: false,
      };
    case actions.LOGOUT_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: false,
      };
    case actions.CHECK_SESSION_INITIATED:
      return {
        ...state,
        error: false,
      };
    case actions.CHECK_SESSION_SUCCESS:
      return {
        ...state,
        error: false,
      };
    case actions.CHECK_SESSION_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
