import React, { Component } from "react";
import { Row, Col, Spin, message, Image } from "antd";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as Yup from "yup";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import RequestStyle from "./style";
import { refresh } from "components/Images";
import { PageConst, ButtonConstant, FormValidation } from "App/AppConstant";
import { getFloor } from "redux/floor/action";
import { getEmployee } from "redux/employee/action";
import { getAuthUserID, getAuthRole } from "modules/helper";
import { saveRequest, getRequestDetail } from "redux/request/action";
import { getEmployeeLocation } from "redux/employee/action";
import { Menu, Input, Button, Checkbox, Header, Select } from "components/Form";

var userId = getAuthUserID();
var userRole = getAuthRole();

const RequestValidation = Yup.object().shape({
  floor: Yup.string().nullable().required(" "),
  location: Yup.string().nullable().required(" "),
  floor2: Yup.string().nullable().required(" "),
  location2: Yup.string().nullable().required(" "),
  remark: Yup.string().trim().required(" "),
});
class Request extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      sdata: [],
      ldata: [],
      ldata2: [],
      edata: [],
      count: 1,
      locId: 0,
      locId2: 0,
      checked: false,
      initialState: {
        requestid: 0,
        floor: "",
        floorid: 0,
        location: "",
        locationid: 0,
        to: "",
        employeeid: 0,
        floor2: "",
        floorid2: 0,
        location2: "",
        locationid2: 0,
        remark: "",
      },
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      userRole = userRole ? userRole : getAuthRole();
      if (userRole !== "EMPLOYEE") this.props.history.push("/");
      await this.props.getFloor();
      await this.props.getEmployee();
      if (match.params.id) {
        let id = window.atob(match.params.id);
        if (match.path === "/edit-request/:id")
          await this.props.getRequestDetail(id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { floors, employees, request } = this.props;
      const { sdata } = this.state;
      if (floors !== prevProps.floors) {
        let sdata = [];
        floors.forEach((a) => {
          a.isdisable === 0 &&
            sdata.push({ id: a.floorid, value: a.floorname });
        });
        this.setState({ sdata });
      }
      if (employees !== prevProps.employees) {
        let edata = [];
        employees.forEach((a) => {
          a.isdisable === 0 && edata.push({ id: a.userid, value: a.name });
        });
        this.setState({ edata });
      }
      if (request !== prevProps.request) {
        const { edata } = this.state;
        let ldata = [];
        let ldata2 = [];
        let floor = sdata.find((x) => x.id === request.pickupfloor);
        let array = floor && floors.find((x) => x.floorid === floor.id);
        if (array && array.locations) {
          array.locations.forEach((a) => {
            a.isdisable === 0 &&
              ldata.push({ id: a.locationid, value: a.location });
          });
          this.setState({ ldata });
        }
        let location = ldata.find((x) => x.id === request.pickuplocation);
        let eto = edata && edata.find((x) => x.id === request.toempid);
        let floor2 = sdata.find((x) => x.id === request.destinationfloor);
        let array2 = floor2 && floors.find((x) => x.floorid === floor2.id);
        if (array2 && array2.locations) {
          array2.locations.forEach((a) => {
            a.isdisable === 0 &&
              ldata2.push({ id: a.locationid, value: a.location });
          });
          this.setState({ ldata2 });
        }
        let location2 = ldata2.find(
          (x) => x.id === request.destinationlocation
        );
        let data = {
          floor: floor ? floor.value : "",
          floorid: floor ? floor.id : 0,
          location: location ? location.value : "",
          locationid: location ? location.id : 0,
          to: eto ? eto.value : "",
          employeeid: eto ? eto.id : 0,
          floor2: floor2 ? floor2.value : "",
          floorid2: floor2 ? floor2.id : 0,
          location2: location2 ? location2.value : "",
          locationid2: location2 ? location2.id : 0,
          requestid: request.requestid,
          remark: request.description,
        };
        this.setState({
          initialState: data,
          count: request.noofporterneeded,
          checked: request.priority === 1 ? true : false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  check = (e) => this.setState({ checked: e.target.checked });
  handleSubmit = async (value, { setSubmitting }) => {
    try {
      const { count, checked } = this.state;
      userId = userId ? userId : getAuthUserID();
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 5000);
      if (value.locationid === value.locationid2) {
        message.error(FormValidation.sameLoc);
        return;
      } else {
        let postdata = {
          description: value.remark.trim(),
          destinationfloor: value.floorid2,
          destinationlocation: value.locationid2,
          empid: userId,
          noofporterneeded: count,
          pickupfloor: value.floorid,
          pickuplocation: value.locationid,
          priority: checked ? 1 : 0,
          requestid: value.requestid,
          toempid: value.employeeid,
        };
        await this.props.saveRequest(postdata);
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  setLocation = (value, name) => {
    try {
      const { floors } = this.props;
      let array = floors.find((x) => x.floorname === value);
      if (array && array.locations) {
        let ldata = [];
        array.locations.forEach((a) => {
          a.isdisable === 0 &&
            ldata.push({ id: a.locationid, value: a.location });
        });
        name === "floor" && this.setState({ ldata: ldata });
        name === "floor2" && this.setState({ ldata2: ldata });
      }
    } catch (error) {
      console.log(error);
    }
  };
  selectUI = (name, val, setFieldValue, error, disabl) => {
    try {
      const { sdata, ldata, ldata2, edata, locId, locId2 } = this.state;
      return (
        <Select
          data={
            name === "floor" || name === "floor2"
              ? sdata
              : name === "to"
              ? edata
              : name === "location"
              ? ldata
              : ldata2
          }
          value={val}
          placeholder={
            name === "floor" || name === "floor2"
              ? PageConst.floor + PageConst.star
              : name === "to"
              ? PageConst.to
              : PageConst.loc + PageConst.star
          }
          withID={true}
          defaultValue={val}
          disabled={disabl}
          onChange={(value, data) => {
            if (name === "floor" || name === "floor2") {
              setFieldValue(name === "floor" ? "floorid" : "floorid2", data.id);
              setFieldValue(name === "floor" ? "location" : "location2", "");
              this.setState({
                locId: name === "floor" ? 0 : locId,
                locId2: name === "floor2" ? 0 : locId2,
              });
              this.setLocation(value, name);
            } else if (
              (name === "location" && data.id === locId2) ||
              (name === "location2" && data.id === locId)
            ) {
              message.error(FormValidation.sameLoc);
              setFieldValue(name, "");
              return;
            } else {
              setFieldValue(
                name === "location" ? "locationid" : "locationid2",
                data.id
              );
              this.setState({
                locId: name === "location" ? data.id : locId,
                locId2: name === "location2" ? data.id : locId2,
              });
            }
            if (name === "to") {
              setFieldValue("employeeid", data.id);
              this.getEmpData(data.id, setFieldValue);
            }
            setFieldValue(name, value);
          }}
          selectClass={error ? "empty" : ""}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  getEmpData = async (val, setFieldValue) => {
    try {
      setFieldValue("floor2", "");
      setFieldValue("floorid2", 0);
      setFieldValue("location2", "");
      setFieldValue("locationid2", 0);
      await this.props.getEmployeeLocation(val);
      const { location, floors } = this.props;
      location.floor && setFieldValue("floor2", location.floor);
      location.floorid && setFieldValue("floorid2", location.floorid);
      let array3 = floors.find((x) => x.floorid === location.floorid);
      if (array3 && array3.locations) {
        let larray = [];
        array3.locations.forEach((a) => {
          a.isdisable === 0 &&
            larray.push({ id: a.locationid, value: a.location });
        });
        this.setState({ ldata2: larray });
        let locMatch = array3.locations.find(
          (x) => x.locationid === location.locationid
        );
        if (locMatch) {
          setFieldValue("location2", locMatch.location);
          setFieldValue("locationid2", locMatch.locationid);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  onChange = (val) => {
    const { count } = this.state;
    this.setState({ count: val ? count + 1 : count !== 1 ? count - 1 : count });
  };
  render() {
    const { count, initialState, checked, disable } = this.state;
    const { loading, loading1, loading2 } = this.props;
    return (
      <Spin spinning={loading || loading1 || loading2} size="large">
        <Row>
          <Col xs={0} sm={0} md={8} lg={6} xl={5} className="menuItems">
            <Menu />
          </Col>
          <Col xs={24} sm={24} md={16} lg={18} xl={19} className="dataItems">
            <RequestStyle>
              <Header />
              <div className="displayDiv">
                <div className="flex">
                  <h2 className="title">
                    {initialState.requestid === 0
                      ? PageConst.addReq
                      : PageConst.editReq}
                  </h2>
                  <div className="icon_box">
                    <div className="set_icon_box">
                      <Image
                        src={refresh}
                        preview={false}
                        className="pointer"
                        onClick={() => window.location.reload()}
                      />
                    </div>
                  </div>
                </div>
                <Formik
                  initialValues={initialState}
                  validationSchema={RequestValidation}
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
                        <h2 className="title anime">{PageConst.pick}</h2>
                        <div className="field anime highZ">
                          {values.floor === "" &&
                            this.selectUI(
                              "floor",
                              values.floor,
                              setFieldValue,
                              errors.floor && touched.floor
                            )}
                          {values.floor !== "" &&
                            this.selectUI("floor", values.floor, setFieldValue)}
                        </div>
                        <div className="field anime">
                          {values.location === "" &&
                            this.selectUI(
                              "location",
                              values.location,
                              setFieldValue,
                              errors.location && touched.location,
                              values.floor === ""
                            )}
                          {values.location !== "" &&
                            this.selectUI(
                              "location",
                              values.location,
                              setFieldValue,
                              values.floor === ""
                            )}
                        </div>
                        <div className="topmar anime highZ2">
                          <h2 className="title">{PageConst.dest}</h2>
                          <div className="field">
                            {values.to === "" &&
                              this.selectUI(
                                "to",
                                values.to,
                                setFieldValue,
                                errors.to && touched.to
                              )}
                            {values.to !== "" &&
                              this.selectUI("to", values.to, setFieldValue)}
                          </div>
                          <div className="field">
                            {values.floor2 === "" &&
                              this.selectUI(
                                "floor2",
                                values.floor2,
                                setFieldValue,
                                errors.floor2 && touched.floor2
                              )}
                            {values.floor2 !== "" &&
                              this.selectUI(
                                "floor2",
                                values.floor2,
                                setFieldValue
                              )}
                          </div>
                          <div className="field">
                            {values.location2 === "" &&
                              this.selectUI(
                                "location2",
                                values.location2,
                                setFieldValue,
                                errors.location2 && touched.location2,
                                values.floor2 === ""
                              )}
                            {values.location2 !== "" &&
                              this.selectUI(
                                "location2",
                                values.location2,
                                setFieldValue,
                                values.floor2 === ""
                              )}
                          </div>
                        </div>
                        <div className="topmar join anime">
                          <div>
                            <h2 className="title">{PageConst.port}</h2>
                            <div className="countDiv">
                              <span>
                                <PlusCircleOutlined
                                  onClick={() => this.onChange(true)}
                                />
                              </span>
                              <span className="count">{count}</span>
                              <span>
                                <MinusCircleOutlined
                                  onClick={() => this.onChange(false)}
                                />
                              </span>
                            </div>
                          </div>
                          <div className="pridiv">
                            <h2 className="title">{PageConst.pri}</h2>
                            <Checkbox onChange={this.check} checked={checked} />
                          </div>
                        </div>
                        <div className="topmar anime">
                          <h2
                            className={`title  ${
                              errors.remark && touched.remark ? "empty" : ""
                            }`}
                          >
                            {PageConst.rmark}
                          </h2>
                          <Input
                            row={4}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            name="remark"
                            onBlur={handleBlur}
                            value={values.remark}
                            handleChange={handleChange}
                            max={2021}
                            className={
                              errors.remark && touched.remark ? "empty" : ""
                            }
                          />
                        </div>
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
            </RequestStyle>
          </Col>
        </Row>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.request.loading,
  error: state.request.error,
  message: state.request.message,
  request: state.request.request,
  loading1: state.floor.loading,
  floors: state.floor.floors,
  loading2: state.employee.loading,
  employees: state.employee.employees,
  location: state.employee.location,
});
const mapDispatchToProps = (dispatch) => ({
  getFloor: (payload) => dispatch(getFloor(payload)),
  getEmployee: (payload) => dispatch(getEmployee(payload)),
  saveRequest: (payload) => dispatch(saveRequest(payload)),
  getRequestDetail: (payload) => dispatch(getRequestDetail(payload)),
  getEmployeeLocation: (payload) => dispatch(getEmployeeLocation(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Request)
);
