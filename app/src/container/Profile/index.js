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
  Select,
  PhotoEditModal,
} from "components/Form";
import { configVar } from "modules/config";
import { AddEditStyle } from "App/app.style";
import { getProfile, UpdateProfile } from "redux/profile/action";
import {
  getPorterProfile,
  updatePorterProfile,
  getStatus,
  getUpdateStatus,
} from "redux/porterData/actions";
import { ButtonConstant, FormValidation, PageConst } from "App/AppConstant";
import { getAuthUserID, getAuthRole, getAuthUserName } from "modules/helper";

var userid = getAuthUserID();
var userRole = getAuthRole();
var userName = getAuthUserName();
const ProfileValidation = Yup.object().shape({
  email: Yup.string().trim().nullable().email(FormValidation.emailInvalid),
  mobile: Yup.string()
    .nullable()
    .max(10, FormValidation.mobileInvalid)
    .min(10, FormValidation.mobileInvalid),
});

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      disable: false,
      image: null,
      imbase64: null,
      imgName: null,
      removeImg: false,
      profileData: [],
      statusData: [],
      status: "",
      initialState: {
        name: "",
        address: "",
        email: "",
        mobile: "",
        designation: "",
      },
    };
  }
  async componentDidMount() {
    try {
      userRole = userRole ? userRole : getAuthRole();
      userid = userid ? userid : getAuthUserID();
      userName = userName ? userName : getAuthUserName();
      if (userRole === "ADMIN") this.props.history.push("/");
      else if (userRole === "EMPLOYEE") await this.props.getProfile(userid);
      else if (userRole === "PORTER") {
        await this.props.getPorterProfile(userid);
        await this.props.getStatus(userid);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { profile, porterProfile, statusList } = this.props;
      if (profile !== prevProps.profile) {
        this.setProfile(profile);
      } else if (porterProfile !== prevProps.porterProfile) {
        this.setProfile(porterProfile);
      }
      if (statusList !== prevProps.statusList) {
        let statusData = [];
        statusList.forEach((a) => {
          a.status !== "On Job" &&
            statusData.push({ id: a.statusid, value: a.status });
        });
        let selected = statusList.find((x) => x.selected === 1);
        this.setState({
          statusData,
          status: selected ? selected.status : "Available",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  setProfile = (profile) => {
    try {
      let url = configVar.BASE_URL.slice("/", -1);
      let proData = {
        name: profile.name,
        address: profile.address,
        email: profile.email,
        designation: profile.designation,
        mobile: profile.number,
      };
      this.setState({
        initialState: proData,
        image:
          profile.profileimage !== null ? url + profile.profileimage : null,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (value, { setSubmitting }) => {
    try {
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 5000);
      const { profile, porterProfile } = this.props;
      const { imbase64, imgName, removeImg } = this.state;
      if (userRole === "EMPLOYEE") {
        let postData = {
          userid: userid,
          name: value.name.trim(),
          address: value.address ? value.address.trim() : null,
          email: value.email ? value.email.trim() : null,
          designation: value.designation ? value.designation.trim() : null,
          number: value.mobile,
          code: profile.code,
          floorid: profile.floorid,
          isdisable: profile.isdisable,
          locationid: profile.locationid,
          profileimage: profile.profileimage,
        };
        if (imbase64 !== null) postData.profileimage = imbase64;
        await this.props.UpdateProfile(postData);
      } else if (userRole === "PORTER") {
        let post = {
          userid: userid,
          name: value.name.trim(),
          address: value.address ? value.address.trim() : null,
          email: value.email ? value.email.trim() : null,
          number: value.mobile,
          code: porterProfile.code,
          isdisable: porterProfile.isdisable,
          profileimage: porterProfile.profileimage,
        };
        if (imbase64 !== null) post.profileimage = imbase64;
        await this.props.updatePorterProfile(post);
      }
      if (userName !== value.name.trim()) {
        let auth = JSON.parse(localStorage.auth);
        auth.userName = value.name.trim();
        localStorage.setItem("auth", JSON.stringify(auth));
      }
      let profileimg = JSON.parse(localStorage.auth).image;
      if ((imgName && profileimg !== imgName) || removeImg) {
        let auth = JSON.parse(localStorage.auth);
        auth.image = imgName ? "/ProfileImage/" + imgName : imgName;
        localStorage.setItem("auth", JSON.stringify(auth));
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  editPhoto = () => {
    try {
      const { visible } = this.state;
      this.setState({ visible: !visible });
    } catch (error) {
      console.log(error);
    }
  };
  uploadImg = (uploadLink, fullpath, name, remove) => {
    try {
      this.setState({
        image: uploadLink,
        imbase64: fullpath,
        imgName: name,
        removeImg: remove,
        visible: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  selectUI = (val) => {
    try {
      const { statusData, status } = this.state;
      return (
        <Select
          data={status !== "On Job" ? statusData : []}
          value={val ? val : ""}
          defaultValue={status}
          withID={true}
          onChange={(value, data) => {
            this.stausUpdate(value, data.id);
          }}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  stausUpdate = async (value, id) => {
    try {
      let staUp = userid + "/" + id;
      this.setState({ status: value });
      await this.props.getUpdateStatus(staUp);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initialState, disable, visible, image, status } = this.state;
    const { loading, loading1, loading2 } = this.props;
    let count = userRole === "PORTER" ? 12 : 24;
    return (
      <Spin spinning={loading || loading1 || loading2} size="large">
        <Row>
          <Col xs={0} sm={0} md={8} lg={6} xl={5} className="menuItems">
            <Menu />
          </Col>
          <Col xs={24} sm={24} md={16} lg={18} xl={19} className="dataItems">
            <AddEditStyle>
              <Header />
              <div className="displayDiv">
                <h2 className="title">{PageConst.profile}</h2>
                <div className="editImgDiv">
                  <Avatar src={image === null ? avatar : image} size={140} />
                  <Image
                    src={edit}
                    preview={false}
                    className="editImg"
                    onClick={this.editPhoto}
                  />
                </div>
                {userRole === "PORTER" && (
                  <Label title={status} className="status" />
                )}
                <Formik
                  initialValues={initialState}
                  validationSchema={ProfileValidation}
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
                  }) => (
                    <Form onSubmit={handleSubmit} noValidate>
                      <div className="inputDiv">
                        <div className="field anime">
                          <Label title={PageConst.name} />
                          {userRole !== "PORTER" ? (
                            <Input
                              onBlur={handleBlur}
                              name="name"
                              value={values.name}
                              handleChange={handleChange}
                              max={255}
                              tabIndex="1"
                            />
                          ) : (
                            <Label title={values.name} />
                          )}
                        </div>
                        {userRole !== "PORTER" && (
                          <div className="field anime">
                            <Label title={PageConst.desig} />
                            <Input
                              onBlur={handleBlur}
                              name="designation"
                              value={values.designation}
                              handleChange={handleChange}
                              max={25}
                              tabIndex="4"
                            />
                          </div>
                        )}
                        <Row gutter={20}>
                          <Col
                            xs={24}
                            sm={24}
                            md={count}
                            lg={count}
                            xl={count}
                            className="anime highZ"
                          >
                            <div className="field">
                              <Label title={PageConst.address} />
                              {userRole !== "PORTER" ? (
                                <Input
                                  onBlur={handleBlur}
                                  name="address"
                                  value={values.address}
                                  handleChange={handleChange}
                                  max={255}
                                  tabIndex="2"
                                />
                              ) : (
                                <Label title={values.address} />
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
                              {userRole !== "PORTER" ? (
                                <Input
                                  className={
                                    errors.email && touched.email ? "empty" : ""
                                  }
                                  onBlur={handleBlur}
                                  name="email"
                                  type="email"
                                  value={values.email}
                                  handleChange={handleChange}
                                  max={25}
                                  tabIndex="3"
                                />
                              ) : (
                                <Label title={values.email} />
                              )}
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
                              {userRole !== "PORTER" ? (
                                <Input
                                  className={
                                    errors.mobile && touched.mobile
                                      ? "empty"
                                      : ""
                                  }
                                  onBlur={handleBlur}
                                  name="mobile"
                                  type="number"
                                  value={values.mobile}
                                  handleChange={handleChange}
                                  max={10}
                                  tabIndex="5"
                                />
                              ) : (
                                <Label title={values.mobile} />
                              )}
                            </div>
                            {errors.mobile && touched.mobile && (
                              <div className="form-error">{errors.mobile}</div>
                            )}
                          </Col>
                          {userRole === "PORTER" && (
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                              <div className="field">
                                <Label title={PageConst.status} />
                                {status === "" && this.selectUI()}
                                {status !== "" && this.selectUI(status)}
                              </div>
                            </Col>
                          )}
                        </Row>
                        <div className="btnDiv anime">
                          <div className="nextDiv">
                            <Button
                              onClick={() => this.props.history.push("/")}
                            >
                              {ButtonConstant.cancel}
                            </Button>
                            <Button htmlType="submit" disabled={disable}>
                              {ButtonConstant.submit}
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
  profile: state.profile.profile,
  loading1: state.profile.loading,
  loading2: state.porterData.loading,
  porterProfile: state.porterData.porterProfile,
  statusList: state.porterData.statusList,
});
const mapDispatchToProps = (dispatch) => ({
  getProfile: (payload) => dispatch(getProfile(payload)),
  getPorterProfile: (payload) => dispatch(getPorterProfile(payload)),
  getStatus: (payload) => dispatch(getStatus(payload)),
  UpdateProfile: (payload) => dispatch(UpdateProfile(payload)),
  updatePorterProfile: (payload) => dispatch(updatePorterProfile(payload)),
  getUpdateStatus: (payload) => dispatch(getUpdateStatus(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
