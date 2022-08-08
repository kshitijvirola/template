import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isCheckVisible: false,
  isChanged: false,
  userId: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_CHECK_PASSWORD:
      return {
        ...state,
        isCheckVisible: action.payload,
      };
    case actions.CHANGE_PASSWORD_INITIATED:
      return {
        ...state,
        isChanged: false,
        loading: true,
        error: false,
      };
    case actions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isChanged: true,
        loading: false,
        error: false,
      };
    case actions.CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isChanged: false,
      };
    default:
      return state;
  }
};
