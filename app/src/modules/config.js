export const configVar = { BASE_URL:process.env.REACT_APP_BASE_URL };

export const apiConstant = {
  AUTH_LOGIN: "api/Account/Login",
  AUTH_LOGOUT: "api/Account/Logout/",
  CHECK_SESSION: "api/Account/CheckSession/",
  CHANGE_PASSWORD: "api/Account/ChangePassword",
};
export const notificationConstant = {
  GET_NOTIFICATION: "api/Account/GetNotificationList/",
  GET_READ_NOTIFICATION: "api/Account/ReadNotification/",
};
export const floorConstant = {
  ADD_FLOOR: "api/Master/SaveFloor",
  DELETE_FLOOR: "api/Master/DeleteFloor/",
  GET_FLOOR: "api/Master/GetFloorList",
  GET_FLOOR_DETAIL: "api/Master/GetFloorDetail/",
  ENABLE_FLOOR: "api/Master/EnableDisableFloor/}",
  GET_FLOOR_DROP: "api/Master/GetFloorDropdown",
};
export const locationConstant = {
  ADD_LOCATION: "api/Master/SaveLocation",
  DELETE_LOCATION: "api/Master/DeleteLocation/",
  GET_LOCATION: "api/Master/GetLocationList",
  GET_LOCATION_DETAIL: "api/Master/GetLocationDetail/",
  ENABLE_LOCATION: "api/Master/EnableDisableLocation/",
  GET_LOCATION_DROP: "api/Master/GetLocationDropdown/",
};
export const employeeConstant = {
  ADD_EMPLOYEE: "api/Master/SaveEmployee",
  DELETE_EMPLOYEE: "api/Master/DeleteEmployee/",
  GET_EMPLOYEE: "api/Master/GetEmployeeList",
  GET_EMPLOYEE_DETAIL: "api/Master/GetEmployeeDetail/",
  ENABLE_EMPLOYEE: "api/Master/EnableDisableEmployee/",
  GET_EMPLOYEE_LOCATION: "api/Master/GetEmployeeLocation/",
  GET_PROFILE: "api/Employee/GetProfileDetail/",
  UPDATE_PROFILE: "api/Employee/UpdateProfile",
};
export const porterConstant = {
  ADD_PORTER: "api/Master/SavePorter",
  DELETE_PORTER: "api/Master/DeletePorter/",
  GET_PORTER: "api/Master/GetPorterList",
  GET_PORTER_DETAIL: "api/Master/GetPorterDetail/",
  ENABLE_PORTER: "api/Master/EnableDisablePorter/",
};
export const requestConstant = {
  SAVE_REQUEST: "api/Employee/SaveRequest",
  DELETE_REQUEST: "api/Employee/DeleteRequest/",
  GET_REQUEST: "api/Employee/GetRequestList/",
  GET_REQUEST_DETAIL: "api/Employee/GetRequestDetail/",
  COMPLETE_REQUEST: "api/Employee/CompleteRequest/",
  INITIATED_REQUEST: "api/Employee/InitiatedRequestDetails/",
};
export const requestTypeConstant = {
  GET_REQUEST_TYPE: "api/Master/GetRequestTypeList",
};
export const transferConstant = {
  EXPORT_EMPLOYEE: "api/Master/ExportEmployee",
  EXPORT_PORTER: "api/Master/ExportPorter",
  IMPORT_EMPLOYEE: "api/Master/ImportEmployee",
  IMPORT_PORTER: "api/Master/ImportPorter",
  IMPORT_EMPLOYEE_TEMPLATE: "api/Master/TemplateImportEmployee",
  IMPORT_PORTER_TEMPLATE: "api/Master/TemplateImportPorter",
};
export const reportConstant = {
  EMPLOYEE_REPORT: "api/Report/EmployeeReport/",
  PORTER_REPORT: "api/Report/PorterReport/",
  JOB_REPORT: "api/Report/JobReport/",
  FLOOR_REPORT: "api/Report/GetFloorReport/",
  LOCATION_REPORT: "api/Report/GetLocationReport/",
  GET_DASHBOARD_DETAIL: "api/Report/GetDashboardDetail/",
  GET_PIE_CHART: "api/Report/GetPieChart/",
};
export const porterDataConstant = {
  GET_REQUEST_LIST: "api/Porter/GetAvailableRequestList/",
  SET_REQUEST_ACCEPTANCE: "api/Porter/RequestAcceptance/",
  GET_ACCEPTED_REQUEST: "api/Porter/GetAcceptedRequestList/",
  GET_REJECTED_REQUEST: "api/Porter/GetRejectedRequestList/",
  SET_START_JOB: "api/Porter/StartJob/",
  SET_FINISH_JOB: "api/Porter/FinishJob/",
  GET_STATUS: "api/Porter/GetStatusList/",
  GET_UPDATE_STATUS: "api/Porter/UpdateStatus/",
  GET_PORTER_PROFILE: "api/Porter/GetProfileDetail/",
  UPDATE_PORTER_PROFILE: "api/Porter/UpdateProfile",
};
