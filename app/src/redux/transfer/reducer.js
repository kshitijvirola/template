import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isImported: false,
  isEmpImported: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.IMPORT_EMPLOYEE_INITIATED:
      return {
        ...state,
        isEmpImported: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.IMPORT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isEmpImported: true,
      };
    case actions.IMPORT_EMPLOYEE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isEmpImported: false,
        message: action.error,
      };
    case actions.IMPORT_PORTER_INITIATED:
      return {
        ...state,
        isImported: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.IMPORT_PORTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isImported: true,
      };
    case actions.IMPORT_PORTER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isImported: false,
        message: action.error,
      };
    default:
      return state;
  }
};
