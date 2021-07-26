import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import app from "./app/reducer";
import login from "./login/reducer";
const rootReducer = (history) =>
  combineReducers({
    app,
    login,
    router: connectRouter(history),
  });
export default rootReducer;
