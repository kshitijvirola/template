import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin, notification, message } from "antd";

import Routes from "./routes";
import { withRouter } from "react-router-dom";
import GlobalStyle, { AppContainer } from "./app.style";
import ChangePwdModal from "components/ChangePwdModal";
import { setAuth } from "redux/login/actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  async componentDidMount() {
    try {
      const auth = localStorage.auth;
      if (auth) {
        const userId = JSON.parse(auth).userId;
        await this.props.setAuth(userId);
        if (navigator.serviceWorker) {
          window.addEventListener("load", () => {
            navigator.serviceWorker.register("/serviceWorker.js");
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { error, message } = this.props;
      if (error !== prevProps.error) {
        if (error) {
          if (window.innerWidth > 1000) {
            notification["error"]({
              message: "Error",
              description: message,
            });
          } else this.displaymsg(message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  displaymsg = (msg) => message.error(msg);
  render() {
    const { isAuthenticated, loading, loading1, loading2, isCheckVisible } =
      this.props;
    return (
      <Spin spinning={loading || loading1 || loading2} size="large">
        <GlobalStyle />
        <AppContainer id="App">
          <Routes isAuthenticated={isAuthenticated} />
        </AppContainer>
        {isCheckVisible && <ChangePwdModal />}
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.app.loading,
  error: state.app.error,
  message: state.app.message,
  loading1: state.changePassword.loading,
  isCheckVisible: state.changePassword.isCheckVisible,
  loading2: state.login.loading,
  isAuthenticated: state.login.isAuthenticated,
});
const mapStateToDispatch = (dispatch) => ({
  setAuth: (payload) => dispatch(setAuth(payload)),
});
export default withRouter(connect(mapStateToProps, mapStateToDispatch)(App));
