import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin, notification, message } from "antd";

import { withRouter } from "react-router-dom";
import { setAuth } from "redux/login/actions";
import Routes from "./routes";
import { AppContainer } from "./app.style";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  async componentDidMount() {
    const auth = localStorage.auth;
    if (auth) {
      const userId = JSON.parse(auth).userId;
      await this.props.setAuth(userId);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { error,message } = this.props;
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
    const { isAuthenticated, loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <AppContainer>
          <Routes isAuthenticated={isAuthenticated} />        
        </AppContainer>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  loading: state.app.loading,
  error: state.app.error,
  message: state.app.message,
});
const mapStateToDispatch = (dispatch) => ({
  setAuth: (payload) => dispatch(setAuth(payload)),
});
export default withRouter(connect(mapStateToProps, mapStateToDispatch)(App));
