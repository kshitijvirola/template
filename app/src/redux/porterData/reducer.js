import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isUpdate: false,
  requestList: [],
  reqAcceptance: [],
  acceptedReq: [],
  rejectedReq: [],
  startJob: [],
  finishJob: [],
  statusList: [],
  updatedStatus: [],
  porterProfile: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_PORTER_PROFILE_INITIATED:
      return {
        ...state,
        isUpdate: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.UPDATE_PORTER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isUpdate: true,
      };
    case actions.UPDATE_PORTER_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isUpdate: false,
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

    case actions.SET_REQUEST_ACCEPTANCE_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SET_REQUEST_ACCEPTANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        reqAcceptance: action.payload.data,
      };
    case actions.SET_REQUEST_ACCEPTANCE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.GET_ACCEPTED_REQUEST_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_ACCEPTED_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        acceptedReq: action.payload.data,
      };
    case actions.GET_ACCEPTED_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.GET_REJECTED_REQUEST_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_REJECTED_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        rejectedReq: action.payload.data,
      };
    case actions.GET_REJECTED_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.SET_START_JOB_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SET_START_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        startJob: action.payload.data,
      };
    case actions.SET_START_JOB_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.SET_FINISH_JOB_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SET_FINISH_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        finishJob: action.payload.data,
      };
    case actions.SET_FINISH_JOB_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.GET_STATUS_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        statusList: action.payload.data,
      };
    case actions.GET_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.GET_UPDATE_STATUS_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        updatedStatus: action.payload.data,
      };
    case actions.GET_UPDATE_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.GET_PORTER_PROFILE_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_PORTER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        porterProfile: action.payload.data,
      };
    case actions.GET_PORTER_PROFILE_ERROR:
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
