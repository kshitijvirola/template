export const getAuthUserID = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth && auth.prj === "kd" && auth.userId) return auth.userId;
    return false;
  }
  return false;
};
export const getAuthToken = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth && auth.token) return auth.token;
    return false;
  }
  return false;
};
export const getAuthUserName = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth && auth.userName) return auth.userName;
    return false;
  }
  return false;
};
export const getAuthRole = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth && auth.prj === "kd" && auth.role) return auth.role;
    return false;
  }
  return false;
};
