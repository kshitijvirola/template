import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isAdded: false,
  isDeleted: false,
  isEnable: false,
  porters: [],
  porter: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_PORTER_INITIATED:
      return {
        ...state,
        isAdded: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.ADD_PORTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isAdded: true,
      };
    case actions.ADD_PORTER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isAdded: false,
        message: action.error,
      };
    case actions.GET_PORTER_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_PORTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        porters: action.payload.data,
      };
    case actions.GET_PORTER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.GET_PORTER_DETAIL_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_PORTER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        porter: action.payload.data,
      };
    case actions.GET_PORTER_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.DELETE_PORTER_INITIATED:
      return {
        ...state,
        isDeleted: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.DELETE_PORTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isDeleted: true,
      };
    case actions.DELETE_PORTER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isDeleted: false,
        message: action.error,
      };
    case actions.ENABLE_PORTER_INITIATED:
      return {
        ...state,
        isEnable: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.ENABLE_PORTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isEnable: true,
      };
    case actions.ENABLE_PORTER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isEnable: false,
        message: action.error,
      };
    default:
      return state;
  }
};
