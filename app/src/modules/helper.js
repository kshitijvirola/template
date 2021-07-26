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
export const getAuthUserID = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth && auth.userId) return auth.userId;
    return false;
  }
  return false;
};
