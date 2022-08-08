import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  averagetime: 0,
  totaljobs: 0,
  empReport: [],
  portReport: [],
  jobReport: [],
  floorReport: [],
  locationReport: [],
  dashData: [],
  pieData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.EMPLOYEE_REPORT_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.EMPLOYEE_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        empReport: action.payload.data,
      };
    case actions.EMPLOYEE_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.PORTER_REPORT_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.PORTER_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        portReport: action.payload.data,
      };
    case actions.PORTER_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.JOB_REPORT_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.JOB_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        jobReport: action.payload.data,
      };
    case actions.JOB_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.FLOOR_REPORT_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.FLOOR_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        floorReport: action.payload.data,
        averagetime: action.payload.averagetime,
        totaljobs: action.payload.totaljobs,
      };
    case actions.FLOOR_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.LOCATION_REPORT_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.LOCATION_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        locationReport: action.payload.data,
      };
    case actions.LOCATION_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.GET_DASHBOARD_DETAIL_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_DASHBOARD_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        dashData: action.payload.data,
      };
    case actions.GET_DASHBOARD_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.GET_PIE_CHART_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_PIE_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        pieData: action.payload.data,
      };
    case actions.GET_PIE_CHART_ERROR:
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
