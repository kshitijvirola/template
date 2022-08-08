import * as actions from "./constant";

const initialState = {
  error: false,
  loading: false,
  message: false,
  requestList: [],
  requestType1: [],
  request: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_REQUEST_TYPE_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_REQUEST_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        requestList: action.payload.data,
      };
    case actions.GET_REQUEST_TYPE_ERROR:
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
