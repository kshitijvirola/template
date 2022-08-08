import React, { Component } from "react";
import { Row, Col, Image, Spin, Avatar } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { avatar, edit } from "components/Images";
import {
  Menu,
  Label,
  Input,
  Button,
  Header,
  Switch,
  PhotoEditModal,
} from "components/Form";
import { addPorter, getPorterDetail } from "redux/porter/action";
import {
  ButtonConstant,
  FormValidation,
  PageConst,
  UserMatch,
} from "App/AppConstant";
import { configVar } from "modules/config";
import { getAuthRole } from "modules/helper";
import { AddEditStyle } from "App/app.style";

var userRole = getAuthRole();
const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .nullable()
    .required(FormValidation.nameMin)
    .min(2, FormValidation.nameMin)
    .matches(/^[a-zA-Z0-9]*$/, FormValidation.nameValid),
  lastName: Yup.string()
    .trim()
    .nullable()
    .matches(/^[a-zA-Z0-9]*$/, FormValidation.nameValid),
  username: Yup.string()
    .trim()
    .nullable()
    .min(3, FormValidation.usernameMin)
    .matches(UserMatch, FormValidation.userValid)
    .required(" "),
  password: Yup.string()
    .trim()
    .min(2, FormValidation.passwordMin)
    .required(" "),
  password2: Yup.string().trim().min(2, FormValidation.passwordMin),
  email: Yup.string().trim().nullable().email(FormValidation.emailInvalid),
  number: Yup.string()
    .trim()
    .nullable()
    .min(10, FormValidation.mobileInvalid)
    .max(10, FormValidation.mobileInvalid),
});

class Porter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      disable: false,
      selected: true,
      image: null,
      imbase64: null,
      editData: [],
      initState: {
        userid: 0,
        username: "",
        password: "",
        password2: "",
        email: "",
        address: "",
        firstName: "",
        lastName: "",
        number: "",
      },
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      userRole = userRole ? userRole : getAuthRole();
      if (userRole !== "ADMIN") this.props.history.push("/");
      let id = 0;
      if (match.params.id) {
        id = window.atob(match.params.id);
      }
      if (match.path === "/edit-porter/:id") {
        await this.props.getPorterDetail(id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { porter } = this.props;
      if (porter !== prevProps.porter) {
        if (porter.userid) {
          let url = configVar.BASE_URL.slice("/", -1);
          let name = porter.name.split(" ");
          let porterData = {
            firstName: name[0],
            lastName: name[1] ? name[1] : "",
            userid: porter.userid,
            username: porter.code,
            password: "ASqw1212@#",
            email: porter.email,
            number: porter.number,
            address: porter.address,
            password2: "",
          };
          this.setState({
            initState: porterData,
            selected: porter.isdisable === 0,
            image:
              porter.profileimage !== null ? url + porter.profileimage : null,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  switchChange = () => {
    const { selected } = this.state;
    this.setState({ selected: !selected });
  };
  editPhoto = () => {
    try {
      const { visible } = this.state;
      this.setState({ visible: !visible });
    } catch (error) {
      console.log(error);
    }
  };
  uploadImg = (uploadLink, fullpath) => {
    try {
      this.setState({ image: uploadLink, imbase64: fullpath, visible: false });
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 5000);
      const { selected, imbase64 } = this.state;
      let postData = {
        name: values.firstName?.trim() + " " + values.lastName?.trim(),
        code: values.username,
        email: values.email?.trim(),
        number: values.number,
        userid: values.userid,
        address: values.address,
        isdisable: selected ? 0 : 1,
      };
      if (imbase64 !== null) postData.profileimage = imbase64;
      let password = values.userid === 0 ? values.password : values.password2;
      if (password !== "") postData.password = password;
      await this.props.addPorter(postData);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initState, disable, selected, visible, image } = this.state;
    const { loading, loading1 } = this.props;
    return (
      <Spin spinning={loading || loading1} size="large">
        <Row>
          <Col xs={0} sm={0} md={8} lg={6} xl={5} className="menuItems">
            <Menu />
          </Col>
          <Col xs={24} sm={24} md={16} lg={18} xl={19} className="dataItems">
            <AddEditStyle>
              <Header />
              <div className="displayDiv">
                <h2 className="title">
                  {initState.userid === 0
                    ? PageConst.addPort
                    : PageConst.editpor}
                </h2>
                <div className="editImgDiv">
                  <Avatar src={image === null ? avatar : image} size={140} />
                  <Image
                    src={edit}
                    preview={false}
                    className="editImg"
                    onClick={this.editPhoto}
                  />
                </div>
                <Formik
                  initialValues={initState}
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
                      <div className="inputDiv anime">
                        <Row gutter={20}>
                          <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            xl={12}
                            className="anime"
                          >
                            <div className="field">
                              <Label
                                title={PageConst.fnm + PageConst.star}
                                className={
                                  errors.firstName && touched.firstName
                                    ? "empty"
                                    : ""
                                }
                              />
                              <Input
                                name="firstName"
                                onBlur={handleBlur}
                                value={values.firstName}
                                handleChange={handleChange}
                                max={255}
                                tabIndex="1"
                                className={
                                  errors.firstName && touched.firstName
                                    ? "empty"
                                    : ""
                                }
                              />
                              {errors.firstName && touched.firstName && (
                                <div className="form-error">
                                  {errors.firstName}
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            xl={12}
                            className="anime"
                          >
                            <div className="field">
                              <Label
                                title={PageConst.lnm}
                                className={
                                  errors.lastName && touched.lastName
                                    ? "empty"
                                    : ""
                                }
                              />
                              <Input
                                onBlur={handleBlur}
                                name="lastName"
                                value={values.lastName}
                                handleChange={handleChange}
                                max={255}
                                tabIndex="2"
                                className={
                                  errors.lastName && touched.lastName
                                    ? "empty"
                                    : ""
                                }
                              />
                              {errors.lastName && touched.lastName && (
                                <div className="form-error">
                                  {errors.lastName}
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            xl={12}
                            className="anime"
                          >
                            <div className="field">
                              <Label
                                title={PageConst.email}
                                className={
                                  errors.email && touched.email ? "empty" : ""
                                }
                              />
                              <Input
                                className={
                                  errors.email && touched.email ? "empty" : ""
                                }
                                onBlur={handleBlur}
                                name="email"
                                type="email"
                                value={values.email}
                                handleChange={handleChange}
                                tabIndex="3"
                              />
                              {errors.email && touched.email && (
                                <div className="form-error">{errors.email}</div>
                              )}
                            </div>
                          </Col>
                          <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            xl={12}
                            className="anime"
                          >
                            <div className="field">
                              <Label
                                title={PageConst.mobile}
                                className={
                                  errors.number && touched.number ? "empty" : ""
                                }
                              />
                              <Input
                                className={
                                  errors.number && touched.number ? "empty" : ""
                                }
                                onBlur={handleBlur}
                                name="number"
                                type="number"
                                value={values.number}
                                handleChange={handleChange}
                                tabIndex="4"
                              />
                              {errors.number && touched.number && (
                                <div className="form-error">
                                  {errors.number}
                                </div>
                              )}
                            </div>
                          </Col>{" "}
                          <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            xl={12}
                            className="anime highZ"
                          >
                            <div className="field">
                              <Label title={PageConst.address} />
                              <Input
                                row={2}
                                onBlur={handleBlur}
                                name="address"
                                value={values.address}
                                handleChange={handleChange}
                                max={255}
                                tabIndex="5"
                              />
                            </div>
                          </Col>
                          <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            xl={12}
                            className="anime"
                          >
                            <div className="field">
                              <Label title={PageConst.active} />
                              <Switch
                                checked={selected}
                                handleChange={this.switchChange}
                              />
                            </div>
                          </Col>
                          <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            xl={12}
                            className="anime"
                          >
                            <div className="field">
                              <Label
                                title={PageConst.uname + PageConst.star}
                                className={
                                  errors.username && touched.username
                                    ? "empty"
                                    : ""
                                }
                              />
                              <Input
                                className={
                                  errors.username && touched.username
                                    ? "empty"
                                    : ""
                                }
                                onBlur={handleBlur}
                                name="username"
                                value={values.username?.trim()}
                                handleChange={handleChange}
                                tabIndex="6"
                              />
                              {errors.username && touched.username && (
                                <div className="form-error">
                                  {errors.username}
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            xl={12}
                            className="anime"
                          >
                            <div className="field">
                              <Label
                                title={
                                  values.userid === 0
                                    ? PageConst.pwd + PageConst.star
                                    : PageConst.pwd
                                }
                                className={
                                  (errors.password && touched.password) ||
                                  (errors.password2 && touched.password2)
                                    ? "empty"
                                    : ""
                                }
                              />
                              <Input
                                name={
                                  values.userid === 0 ? "password" : "password2"
                                }
                                password={true}
                                onBlur={handleBlur}
                                handleChange={handleChange}
                                tabIndex="7"
                                value={
                                  values.userid === 0
                                    ? values.password?.trim()
                                    : values.password2?.trim()
                                }
                                className={
                                  (errors.password && touched.password) ||
                                  (errors.password2 && touched.password2)
                                    ? "empty"
                                    : ""
                                }
                              />
                              {((errors.password && touched.password) ||
                                (errors.password2 && touched.password2)) && (
                                <div className="form-error">
                                  {errors.password || errors.password2}
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <div className="btnDiv">
                          <div className="nextDiv">
                            <Button
                              onClick={() =>
                                this.props.history.push("/porter-master")
                              }
                            >
                              {ButtonConstant.cancel}
                            </Button>
                            <Button htmlType="submit" disabled={disable}>
                              {ButtonConstant.save}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              {visible && (
                <PhotoEditModal
                  image={image}
                  visible={visible}
                  onCancel={this.editPhoto}
                  onOk={this.editPhoto}
                  uploadImg={this.uploadImg}
                />
              )}
            </AddEditStyle>
          </Col>
        </Row>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.employee.loading,
  error: state.employee.error,
  message: state.employee.message,
  loading1: state.porter.loading,
  porters: state.porter.porters,
  porter: state.porter.porter,
});
const mapDispatchToProps = (dispatch) => ({
  addPorter: (payload) => dispatch(addPorter(payload)),
  getPorterDetail: (payload) => dispatch(getPorterDetail(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Porter));
