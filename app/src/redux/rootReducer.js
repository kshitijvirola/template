import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import app from "./app/reducer";
import login from "./login/reducer";
import floor from "./floor/reducer";
import employee from "./employee/reducer";
import porter from "./porter/reducer";
import location from "./location/reducer";
import request from "./request/reducer";
import changePassword from "./changePassword/reducer";
import profile from "./profile/reducer";
import transfer from "./transfer/reducer";
import report from "./report/reducer";
import porterData from "./porterData/reducer";
import notification from "./notification/reducer";
import requestType from "./requestType/reducer";

const rootReducer = (history) =>
  combineReducers({
    app,
    employee,
    floor,
    location,
    login,
    porter,
    request,
    changePassword,
    profile,
    transfer,
    report,
    porterData,
    notification,
    requestType,
    router: connectRouter(history),
  });
export default rootReducer;
