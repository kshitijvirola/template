import axios from "axios";
import store from "redux/store";
import { configVar } from "modules/config";
import { errorHandler, errorEmpty } from "redux/app/actions";
import { checkSession } from "redux/login/actions";

export const axiosPost = async (url, data) => {
  try {
    let { data: response } = await axios.post(configVar.BASE_URL + url, data);
    if (!response || !response.status || response.code !== "200") {
      store.dispatch(errorHandler(response));
    }
    store.dispatch(errorEmpty());
    return response;
  } catch (error) {
    store.dispatch(errorHandler("Network Error"));
    console.log(error);
  }
};
export const axiosGet = async (url) => {
  try {
    let { data: response } = await axios.get(configVar.BASE_URL + url);
    if (!response || response.code !== "200")
      store.dispatch(errorHandler(response));
    store.dispatch(errorEmpty());
    return response;
  } catch (error) {
    store.dispatch(errorHandler("Network Error"));
    console.log(error);
  }
};
export const axiosAuthGet = async (url) => {
  try {
    store.dispatch(checkSession());
    let { data: response } = await axios.get(configVar.BASE_URL + url);
    if (!response || !response.status || response.code !== "200") {
      store.dispatch(errorHandler(response));
    }
    store.dispatch(errorEmpty());
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const axiosAuthPost = async (url, payload) => {
  try {
    store.dispatch(checkSession());
    let { data: response } = await axios.post(
      configVar.BASE_URL + url,
      payload
    );
    if (!response || !response.status || response.code !== "200") {
      store.dispatch(errorHandler(response));
    }
    store.dispatch(errorEmpty());
    return response;
  } catch (error) {
    console.log(error);
  }
};
