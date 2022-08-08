import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isAdded: false,
  isDeleted: false,
  isEnable: false,
  locations: [],
  location: {},
  drop: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_LOCATION_INITIATED:
      return {
        ...state,
        isAdded: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.ADD_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isAdded: true,
      };
    case actions.ADD_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isAdded: false,
        message: action.error,
      };
    case actions.GET_LOCATION_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        locations: action.payload.data,
      };
    case actions.GET_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.GET_LOCATION_DETAIL_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_LOCATION_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        location: action.payload.data,
      };
    case actions.GET_LOCATION_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.DELETE_LOCATION_INITIATED:
      return {
        ...state,
        isDeleted: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isDeleted: true,
      };
    case actions.DELETE_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isDeleted: false,
        message: action.error,
      };
    case actions.ENABLE_LOCATION_INITIATED:
      return {
        ...state,
        isEnable: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.ENABLE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isEnable: true,
      };
    case actions.ENABLE_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isEnable: false,
        message: action.error,
      };
    case actions.GET_LOCATION_DROP_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_LOCATION_DROP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        drop: action.payload.data,
      };
    case actions.GET_LOCATION_DROP_ERROR:
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
