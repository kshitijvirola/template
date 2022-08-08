import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Image, Spin, Avatar } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { avatar, edit } from "components/Images";
import {
  ButtonConstant,
  FormValidation,
  PageConst,
  UserMatch,
} from "App/AppConstant";
import {
  Menu,
  Label,
  Input,
  Button,
  Header,
  Select,
  Switch,
  PhotoEditModal,
} from "components/Form";
import {
  getEmployee,
  addEmployee,
  getEmployeeDetail,
} from "redux/employee/action";
import { getFloor } from "redux/floor/action";
import { configVar } from "modules/config";
import { AddEditStyle } from "App/app.style";
import { getAuthRole } from "modules/helper";

var userRole = getAuthRole();

const EmployeeValidation = Yup.object().shape({
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
  floor: Yup.string().trim().nullable().required(" "),
  location: Yup.string().trim().nullable().required(" "),
  username: Yup.string()
    .trim()
    .nullable()
    .min(3, FormValidation.usernameMin)
    .matches(UserMatch, FormValidation.userValid)
    .max(20)
    .required(" "),
  email: Yup.string().trim().nullable().email(FormValidation.emailInvalid),
  mobile: Yup.string()
    .trim()
    .nullable()
    .min(10, FormValidation.mobileInvalid)
    .max(10, FormValidation.mobileInvalid),
  password: Yup.string()
    .trim()
    .min(2, FormValidation.passwordMin)
    .required(" "),
  password2: Yup.string().trim().min(2, FormValidation.passwordMin),
});
class EmployeeAdd extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      disable: false,
      selected: true,
      image: null,
      imbase64: null,
      sdata: [],
      ldata: [],
      initialState: {
        userid: 0,
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: "",
        designation: "",
        floor: "",
        floorid: 0,
        locationid: 0,
        location: "",
        username: "",
        password: "",
        password2: "",
      },
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      userRole = userRole ? userRole : getAuthRole();
      if (userRole !== "ADMIN") this.props.history.push("/");
      await this.props.getFloor();
      if (match.params.id) {
        let id = window.atob(match.params.id);
        if (match.path === "/edit-employee/:id")
          await this.props.getEmployeeDetail(id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { floors, employee } = this.props;
      const { sdata } = this.state;
      if (floors !== prevProps.floors) {
        let sdata = [];
        floors.forEach((a) => {
          a.isdisable === 0 &&
            sdata.push({ id: a.floorid, value: a.floorname });
        });
        this.setState({ sdata });
      }
      if (employee !== prevProps.employee) {
        let name = employee.name.split(" ");
        let url = configVar.BASE_URL.slice("/", -1);
        let ldata = [];
        let floor = sdata.find((x) => x.id === employee.floorid);
        let array = floor && floors.find((x) => x.floorname === floor.value);
        if (array && array.locations) {
          array.locations.forEach((a) => {
            a.isdisable === 0 &&
              ldata.push({ id: a.locationid, value: a.location });
          });
          this.setState({ ldata });
        }
        let location = ldata.find((x) => x.id === employee.locationid);
        let data = {
          firstName: name[0],
          lastName: name[1] ? name[1] : "",
          userid: employee.userid,
          email: employee.email,
          mobile: employee.number,
          address: employee.address,
          designation: employee.designation,
          floorid: employee.floorid,
          locationid: employee.locationid,
          username: employee.code,
          location: location ? location.value : "",
          floor: floor ? floor.value : "",
          password: "ASqw1212@#",
          password2: "",
        };
        this.setState({
          initialState: data,
          selected: employee.isdisable === 0,
          image:
            employee.profileimage !== null ? url + employee.profileimage : null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  switchChange = () => {
    const { selected } = this.state;
    this.setState({ selected: !selected });
  };
  togglePhotoModal = () => {
    try {
      const { visible } = this.state;
      this.setState({ visible: !visible });
    } catch (error) {
      console.log(error);
    }
  };
  uploadImg = (uploadLink, fullpath) =>
    this.setState({ image: uploadLink, imbase64: fullpath, visible: false });
  handleSubmit = async (value, { setSubmitting }) => {
    try {
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 5000);
      const { selected, imbase64 } = this.state;
      let postData = {
        name: value.firstName.trim() + " " + value.lastName.trim(),
        email: value.email.trim(),
        floor: value.floor.trim(),
        location: value.location.trim(),
        code: value.username.trim(),
        address: value.address.trim(),
        designation: value.designation.trim(),
        number: value.mobile,
        userid: value.userid,
        floorid: value.floorid,
        locationid: value.locationid,
        isdisable: selected ? 0 : 1,
      };
      if (imbase64 !== null) postData.profileimage = imbase64;
      let password = value.userid === 0 ? value.password : value.password2;
      if (password !== "") postData.password = password;
      await this.props.addEmployee(postData);
      await this.props.getEmployee();
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  setLocation = (value) => {
    try {
      const { floors } = this.props;
      let array = floors.find((x) => x.floorname === value);
      if (array && array.locations) {
        let ldata = [];
        array.locations.forEach((a) => {
          a.isdisable === 0 &&
            ldata.push({ id: a.locationid, value: a.location });
        });
        this.setState({ ldata });
      }
    } catch (error) {
      console.log(error);
    }
  };
  selectUI = (name, val, setFieldValue, error) => {
    try {
      const { sdata, ldata } = this.state;
      return (
        <Select
          data={name === "floor" ? sdata : ldata}
          value={val}
          withID={true}
          defaultValue={val}
          onChange={(value, data) => {
            setFieldValue(name, value);
            if (name === "floor") {
              setFieldValue("floorid", data.id);
              setFieldValue("location", "");
              this.setLocation(value);
            } else setFieldValue("locationid", data.id);
          }}
          selectClass={error ? "empty" : ""}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initialState, disable, selected, visible, image } = this.state;
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
                  {initialState.userid === 0
                    ? PageConst.addEmp
                    : PageConst.editEmp}
                </h2>
                <div className="editImgDiv">
                  <Avatar src={image === null ? avatar : image} size={140} />
                  <Image
                    src={edit}
                    preview={false}
                    className="editImg"
                    onClick={this.togglePhotoModal}
                  />
                </div>
                <Formik
                  initialValues={initialState}
                  validationSchema={EmployeeValidation}
                  onSubmit={this.handleSubmit}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="inputDiv">
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
                                onBlur={handleBlur}
                                name="firstName"
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
                                max={255}
                                tabIndex="3"
                              />
                            </div>
                            {errors.email && touched.email && (
                              <div className="form-error">{errors.email}</div>
                            )}
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
                                  errors.mobile && touched.mobile ? "empty" : ""
                                }
                              />
                              <Input
                                className={
                                  errors.mobile && touched.mobile ? "empty" : ""
                                }
                                onBlur={handleBlur}
                                name="mobile"
                                type="number"
                                value={values.mobile}
                                handleChange={handleChange}
                                tabIndex="4"
                              />
                            </div>
                            {errors.mobile && touched.mobile && (
                              <div className="form-error">{errors.mobile}</div>
                            )}
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
                              <Label title={PageConst.address} />
                              <Input
                                row={5}
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
                              <Label title={PageConst.desig} />
                              <Input
                                onBlur={handleBlur}
                                name="designation"
                                value={values.designation}
                                handleChange={handleChange}
                                tabIndex="6"
                              />
                            </div>
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
                            className="anime highZ"
                          >
                            <div className="field">
                              <Label
                                title={PageConst.floor + PageConst.star}
                                className={
                                  errors.floor && touched.floor ? "empty" : ""
                                }
                              />
                              {values.floor === "" &&
                                this.selectUI(
                                  "floor",
                                  values.floor,
                                  setFieldValue,
                                  errors.floor && touched.floor
                                )}
                              {values.floor !== "" &&
                                this.selectUI(
                                  "floor",
                                  values.floor,
                                  setFieldValue
                                )}
                            </div>
                          </Col>
                          <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            xl={12}
                            className="anime highZ2"
                          >
                            <div className="field">
                              <Label
                                title={PageConst.loc + PageConst.star}
                                className={
                                  errors.location && touched.location
                                    ? "empty"
                                    : ""
                                }
                              />
                              {values.location === "" &&
                                this.selectUI(
                                  "location",
                                  values.location,
                                  setFieldValue,
                                  errors.location && touched.location
                                )}
                              {values.location !== "" &&
                                this.selectUI(
                                  "location",
                                  values.location,
                                  setFieldValue
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
                                type="username"
                                value={values.username.trim()}
                                handleChange={handleChange}
                                tabIndex="9"
                              />
                            </div>
                            {errors.username && touched.username && (
                              <div className="form-error">
                                {errors.username}
                              </div>
                            )}
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
                                  errors.password && touched.password
                                    ? "empty"
                                    : ""
                                }
                              />
                              <Input
                                password={true}
                                onBlur={handleBlur}
                                handleChange={handleChange}
                                tabIndex="6"
                                name={
                                  values.userid === 0 ? "password" : "password2"
                                }
                                value={
                                  values.userid === 0
                                    ? values.password.trim()
                                    : values.password2.trim()
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
                                this.props.history.push("/employee-master")
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
                  visible={visible}
                  image={image}
                  onOk={this.togglePhotoModal}
                  onCancel={this.togglePhotoModal}
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
  employee: state.employee.employee,
  floors: state.floor.floors,
  loading1: state.floor.loading,
});
const mapDispatchToProps = (dispatch) => ({
  getFloor: (payload) => dispatch(getFloor(payload)),
  getEmployee: (payload) => dispatch(getEmployee(payload)),
  getEmployeeDetail: (payload) => dispatch(getEmployeeDetail(payload)),
  addEmployee: (payload) => dispatch(addEmployee(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeeAdd)
);
