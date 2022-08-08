import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Image, Spin } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LoginStyle } from "./style";
import { logo } from "components/Images";
import { Input, Button, Checkbox } from "components/Form";
import { ButtonConstant, FormValidation, PageConst } from "App/AppConstant";
import { login } from "redux/login/actions";

const ValidationSchema = Yup.object().shape({
  username: Yup.string().trim().required(" "),
  password: Yup.string()
    .trim()
    .min(2, FormValidation.passwordMin)
    .required(" "),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      checked: false,
      initValues: { username: "", password: "" },
    };
  }
  componentDidMount() {
    const data = localStorage.kd;
    if (data) {
      const kdData = JSON.parse(window.atob(localStorage.kd));
      this.setState({
        initValues: { username: kdData.code, password: kdData.password },
        checked: true,
      });
    }
  }
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 5000);
      const { checked } = this.state;
      let postdata = {
        code: values.username.trim(),
        password: values.password.trim(),
      };
      if (checked)
        localStorage.setItem("kd", window.btoa(JSON.stringify(postdata)));
      else localStorage.removeItem("kd");
      await this.props.login(postdata);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  check = (e) => this.setState({ checked: e.target.checked });
  render() {
    const { loading } = this.props;
    const { disable, checked, initValues } = this.state;
    return (
      <Spin spinning={loading} size="large">
        <LoginStyle>
          <Row justify="space-around" align="middle">
            <Col lg={12} md={12} sm={24} xs={24} className="titleDiv">
              <Image src={logo} className="logo" preview={false} />
              <p className="head">{PageConst.pa}</p>
              {/* <p className="detail">Lorem ipsum dolor</p> */}
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="logDiv">
              <div className="box">
                <h1 className="head log">{PageConst.Login}</h1>
                <span className="headtxt">{PageConst.fill}</span>
                <span className="red">{PageConst.log}</span>
                <Formik
                  initialValues={initValues}
                  validationSchema={ValidationSchema}
                  onSubmit={this.handleSubmit}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    touched,
                    onBlur,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <Form onSubmit={handleSubmit} noValidate>
                      <div className="inputDiv">
                        <div>
                          <Input
                            className={
                              errors.username && touched.username
                                ? "empty"
                                : "bt"
                            }
                            onBlur={handleBlur}
                            placeholder="username"
                            name="username"
                            value={values.username.trim()}
                            handleChange={handleChange}
                            max={255}
                            tabIndex="1"
                          />
                          {errors.username && touched.username && (
                            <div className="form-error">{errors.username}</div>
                          )}
                        </div>
                        <div>
                          <Input
                            password={true}
                            className={
                              errors.password && touched.password ? "empty" : ""
                            }
                            onBlur={handleBlur}
                            placeholder="password"
                            name="password"
                            value={values.password}
                            handleChange={handleChange}
                            max={25}
                            tabIndex="2"
                          />
                        </div>
                        {errors.password && touched.password && (
                          <div className="form-error">{errors.password}</div>
                        )}
                      </div>

                      <div className="submit-box">
                        <Button
                          className="submit"
                          htmlType="submit"
                          disabled={disable}
                        >
                          {ButtonConstant.submit}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
                <div className="bottomDiv">
                  <Checkbox
                    onChange={this.check}
                    checked={checked}
                    className="check"
                    text="Remember me"
                  />
                  <NavLink to="#" className="forgot">
                    {PageConst.FP}
                  </NavLink>
                </div>
                <div className="last-box"></div>
              </div>
            </Col>
          </Row>
        </LoginStyle>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.login.loading,
  error: state.login.error,
  message: state.login.message,
});
const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
