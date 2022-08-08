import React, { Component } from "react";
import { Row, Col, Tabs, Spin, Image } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  Menu,
  Header,
  Table,
  Button,
  Select,
  DatePicker,
  ExportModal,
} from "components/Form";
import { ReportStyle } from "./style";
import {
  ReportConst,
  Report1Const,
  RequestStatus,
  PortStatus,
  FloLocStatus,
} from "./constant";
import { PageConst, ButtonConstant } from "App/AppConstant";
import { download } from "components/Images";
import { getEmployee } from "redux/employee/action";
import { getPorter } from "redux/porter/action";
import { getFloor } from "redux/floor/action";
import {
  getEmployeeReport,
  getPorterReport,
  getJobReport,
  getFloorReport,
  getLocationReport,
} from "redux/report/actions";
import { getAuthRole, getAuthUserID } from "modules/helper";

const { TabPane } = Tabs;
var userRole = getAuthRole();
var userid = getAuthUserID();

const ReportValidation = Yup.object().shape({
  employee: Yup.string().nullable().required(" "),
  date: Yup.date().nullable().required(" "),
  toDate: Yup.date()
    .required(" ")
    .nullable()
    .when(
      "date",
      (date, schema) =>
        date && schema.min(date, "To date must be later than from date")
    ),
  location: Yup.string().nullable().required(" "),
});

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      selected: true,
      exportVisible: false,
      expoType: "Employee",
      tabKey: "1",
      ldata: [],
      selectData: [],
      tableData: [],
      empId: 0,
      initialState: {
        reqId: 0,
        empId: 0,
        locationId: 0,
        emp2: "",
        date: "",
        toDate: "",
        location: "",
        employee: "All",
        req: "All",
      },
    };
  }
  async componentDidMount() {
    const { initialState, tabKey } = this.state;
    userRole = userRole ? userRole : getAuthRole();
    userid = userid ? userid : getAuthUserID();
    if (userRole === "PORTER") this.props.history.push("/");
    else if (userRole === "ADMIN") {
      await this.props.getEmployee();
      initialState.location = tabKey !== "5" ? "loc" : "";
      this.setState({ initialState });
    } else {
      initialState.employee = tabKey < "2" ? "employee" : "";
      initialState.location = tabKey < "3" ? "loc" : "";
      this.setState({ initialState });
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const {
        employees,
        porters,
        empReport,
        portReport,
        jobReport,
        floors,
        floorReport,
        locationReport,
      } = this.props;
      if (employees !== prevProps.employees) {
        let edata = [{ id: 0, value: "All" }];
        employees.forEach((a) => {
          a.isdisable === 0 && edata.push({ id: a.userid, value: a.name });
        });
        this.setState({ selectData: edata });
      } else if (porters !== prevProps.porters) {
        let pdata = [{ id: 0, value: "All" }];
        porters.forEach((a) => {
          a.isdisable === 0 && pdata.push({ id: a.userid, value: a.name });
        });
        this.setState({ selectData: pdata });
      } else if (floors !== prevProps.floors) {
        let fdata = [];
        floors.forEach((a) => {
          a.isdisable === 0 &&
            fdata.push({ id: a.floorid, value: a.floorname });
        });
        this.setState({ selectData: fdata });
      }
      if (empReport !== prevProps.empReport)
        this.setState({ tableData: empReport });
      else if (portReport !== prevProps.portReport)
        this.setState({ tableData: portReport });
      else if (jobReport !== prevProps.jobReport)
        this.setState({ tableData: jobReport });
      else if (floorReport !== prevProps.floorReport)
        this.setState({ tableData: floorReport });
      else if (locationReport !== prevProps.locationReport) {
        this.setState({ tableData: locationReport });
      }
    } catch (error) {
      console.log(error);
    }
  }
  callback = async (key) => {
    try {
      const { initialState } = this.state;
      this.formik.resetForm();
      this.setState({ selectData: [], tableData: [], tabKey: key });
      if (userRole === "ADMIN") {
        if (key === "1") await this.props.getEmployee();
        else if (key === "2") await this.props.getPorter();
        else if (key === "4" || key === "5") await this.props.getFloor();
        initialState.employee = key === "3" ? "employee" : "";
        initialState.location = key !== "5" ? "loc" : "";
        initialState.emp2 = "";
        this.setState({ initialState });
      } else {
        initialState.employee = key < "2" ? "employee" : "";
        initialState.location = key < "3" ? "loc" : "";
        this.setState({ initialState });
        if (key === "2" || key === "3") await this.props.getFloor();
      }
    } catch (error) {
      console.log(error);
    }
  };
  setLocation = (value) => {
    try {
      const { floors } = this.props;
      let array = floors?.find((x) => x.floorname === value);
      if (array && array?.locations) {
        let ldata = [];
        array?.locations?.forEach((a) => {
          a?.isdisable === 0 &&
            ldata?.push({ id: a.locationid, value: a.location });
        });
        this.setState({ ldata });
      }
    } catch (error) {
      console.log(error);
    }
  };
  selectUI = (val, name, key, setFieldValue, error, tab) => {
    try {
      const { selectData, ldata } = this.state;
      return (
        <Select
          data={
            name !== "req"
              ? name === "location"
                ? ldata
                : selectData
              : tab === "Employee"
              ? RequestStatus
              : tab === "Porter"
              ? PortStatus
              : FloLocStatus
          }
          sort={key !== "employee"}
          withID={true}
          value={val}
          disabled={val === "none"}
          placeholder={
            key === "Employee"
              ? PageConst.emp + PageConst.star
              : key === "Porter"
              ? PageConst.port + PageConst.star
              : key === "Floor" || key === "Location"
              ? name === "location"
                ? PageConst.loc + PageConst.star
                : PageConst.floor + PageConst.star
              : ""
          }
          defaultValue={name === "req" ? "ALL" : val}
          selectClass={error ? "empty" : ""}
          onChange={(value, data) => {
            if (name === "req") setFieldValue("reqId", data.id);
            else if (name === "employee") {
              if (key === "Location") {
                setFieldValue("empId", data.id);
                setFieldValue("location", "");
                this.setLocation(value);
              } else {
                this.setState({ empId: data.id });
                setFieldValue("empId", data.id);
              }
            }
            name === "location" && setFieldValue("locationId", data.id);
            setFieldValue(name, value);
          }}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  switchChange = () => {
    const { selected } = this.state;
    this.setState({ selected: !selected });
  };
  handleSubmit = async (value, { setSubmitting }) => {
    try {
      const { tabKey } = this.state;
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 5000);
      let jWR = value.date + "/" + value.toDate;
      let eWRR = value.empId + "/" + value.reqId + "/" + jWR;
      let gFWR = value.empId + "/" + value.reqId + "/" + jWR;
      let gLWR = value.locationId + "/" + gFWR;
      if (userRole === "ADMIN") {
        let zero = "/0";
        if (tabKey === "1") await this.props.getEmployeeReport(eWRR);
        else if (tabKey === "2") await this.props.getPorterReport(eWRR);
        else if (tabKey === "3") await this.props.getJobReport(jWR + zero);
        else if (tabKey === "4") await this.props.getFloorReport(gFWR + zero);
        else if (tabKey === "5")
          await this.props.getLocationReport(gLWR + zero);
      } else {
        let id = "/" + userid;
        if (tabKey === "1") await this.props.getJobReport(jWR + id);
        else if (tabKey === "2") await this.props.getFloorReport(gFWR + id);
        else if (tabKey === "3") await this.props.getLocationReport(gLWR + id);
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  TabPaneUI = () => {
    try {
      const { initialState, disable, tableData, empId } = this.state;
      const { averagetime, totaljobs } = this.props;
      let array = Report1Const;
      if (userRole === "ADMIN") array = ReportConst.concat(Report1Const);
      return array.map((a, i) => {
        let tab = a.split(" ")[0];
        return (
          <TabPane tab={a} key={i + 1}>
            <Formik
              initialValues={initialState}
              innerRef={(p) => (this.formik = p)}
              validationSchema={ReportValidation}
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
                  <Row gutter={10}>
                    {tab !== "Job" && (
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={12}
                        xl={tab === "Location" ? 4 : 5}
                        className="anime highZ"
                      >
                        <div className="field">
                          {values.employee === "" &&
                            this.selectUI(
                              values.employee,
                              "employee",
                              tab,
                              setFieldValue,
                              errors.employee && touched.employee
                            )}
                          {values.employee !== "" &&
                            this.selectUI(
                              values.employee,
                              "employee",
                              tab,
                              setFieldValue
                            )}
                        </div>
                      </Col>
                    )}
                    {tab === "Location" && (
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={12}
                        xl={4}
                        className="anime highZ2"
                      >
                        <div className="field">
                          {values.location === "" &&
                            this.selectUI(
                              values.location,
                              "location",
                              tab,
                              setFieldValue,
                              errors.location && touched.location
                            )}
                          {values.location !== "" &&
                            this.selectUI(
                              values.location,
                              "location",
                              i,
                              setFieldValue
                            )}
                        </div>
                      </Col>
                    )}
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      xl={tab === "Job" ? 8 : tab === "Location" ? 4 : 5}
                      className="anime"
                    >
                      <div className="field">
                        <DatePicker
                          placeholder={PageConst.fd + PageConst.star}
                          name="date"
                          disableDate={true}
                          value={values.date}
                          onBlur={handleBlur}
                          handleChange={(data) => {
                            setFieldValue("date", data);
                            values.toDate === "" &&
                              setFieldValue(
                                "toDate",
                                new Date().toJSON().split("T")[0]
                              );
                          }}
                          className={errors.date && touched.date ? "empty" : ""}
                        />
                      </div>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      xl={tab === "Job" ? 8 : tab === "Location" ? 4 : 5}
                      className="anime"
                    >
                      <div className="field">
                        <DatePicker
                          placeholder={PageConst.td + PageConst.star}
                          disableDate={true}
                          name="toDate"
                          value={values.toDate}
                          onBlur={handleBlur}
                          disabled={values.date === ""}
                          handleChange={(data) => setFieldValue("toDate", data)}
                          className={
                            errors.toDate && touched.toDate ? "empty" : ""
                          }
                        />
                      </div>
                      {errors.toDate && touched.toDate && (
                        <div className="form-error">{errors.toDate}</div>
                      )}
                    </Col>
                    {/* {(tab === "Floor" || tab === "Location") && (
                      <Col xs={24}sm={12}md={12}lg={12}xl={5}className="anime">
                        <div className="field">
                          <Switch right={"Pickup"}left={"Destination"}checked={selected}handleChange={this.switchChange}/>
                        </div></Col>
                    )} */}
                    {tab !== "Job" && (
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={12}
                        xl={5}
                        className="anime highZ"
                      >
                        <div className="field">
                          {values.req === "" &&
                            this.selectUI(
                              values.req,
                              "req",
                              3,
                              setFieldValue,
                              errors.req && touched.req,
                              tab
                            )}
                          {values.req !== "" &&
                            this.selectUI(
                              values.req,
                              "req",
                              3,
                              setFieldValue,
                              errors.req && touched.req,
                              tab
                            )}
                        </div>
                      </Col>
                    )}
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={tab === "Location" ? 12 : 24}
                      xl={tab === "Job" ? 8 : tab === "Location" ? 3 : 4}
                      className={`anime  btn_end ${
                        tableData.length > 0 ? "downDiv" : ""
                      } `}
                    >
                      <Button
                        htmlType="submit"
                        disabled={disable}
                        className={
                          tab === "Location" && tableData.length === 0
                            ? "loc-Btn"
                            : tab === "Location" && tableData.length > 0
                            ? "dowLoc"
                            : ""
                        }
                        s
                      >
                        {ButtonConstant.submit}
                      </Button>
                      {tableData.length > 0 && (
                        <div className="icon_box">
                          <div className="set_icon_box">
                            <Image
                              src={download}
                              preview={false}
                              className="downImg pointer"
                              onClick={() => this.toggleExportModal(tab)}
                            />
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
            <div className="anime">
              <Table
                type={"report"}
                data={tableData}
                tab={tab}
                empId={empId}
                averagetime={averagetime}
                totaljobs={totaljobs}
              />
            </div>
          </TabPane>
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  toggleExportModal = (tab) => {
    try {
      const { exportVisible } = this.state;
      this.setState({ exportVisible: !exportVisible, expoType: tab });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading, loading2, loading3, loading4 } = this.props;
    const { exportVisible, tableData, expoType, empId } = this.state;
    return (
      <Spin spinning={loading || loading2 || loading3 || loading4} size="large">
        <Row>
          <Col xs={0} sm={0} md={8} lg={6} xl={5} className="menuItems">
            <Menu />
          </Col>
          <Col xs={24} sm={24} md={16} lg={18} xl={19} className="dataItems">
            <ReportStyle>
              <Header />
              <div className="displayDiv">
                <h2 className="title">{PageConst.rep}</h2>
                <div className="hidden">
                  {this.selectUI("none")}
                  <DatePicker />
                </div>
                <Tabs defaultActiveKey="1" onChange={this.callback} type="card">
                  {this.TabPaneUI()}
                </Tabs>
              </div>
              {exportVisible && (
                <ExportModal
                  type={expoType + PageConst.rep}
                  data={tableData}
                  empId={empId}
                  onCancel={this.toggleExportModal}
                  onOk={this.toggleExportModal}
                />
              )}
            </ReportStyle>
          </Col>
        </Row>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.employee.loading,
  employees: state.employee.employees,
  loading1: state.porter.loading,
  porters: state.porter.porters,
  loading3: state.floor.loading,
  floors: state.floor.floors,
  loading4: state.report.loading,
  empReport: state.report.empReport,
  portReport: state.report.portReport,
  jobReport: state.report.jobReport,
  floorReport: state.report.floorReport,
  locationReport: state.report.locationReport,
  averagetime: state.report.averagetime,
  totaljobs: state.report.totaljobs,
});
const mapDispatchToProps = (dispatch) => ({
  getEmployee: (payload) => dispatch(getEmployee(payload)),
  getPorter: (payload) => dispatch(getPorter(payload)),
  getFloor: (payload) => dispatch(getFloor(payload)),
  getEmployeeReport: (payload) => dispatch(getEmployeeReport(payload)),
  getPorterReport: (payload) => dispatch(getPorterReport(payload)),
  getJobReport: (payload) => dispatch(getJobReport(payload)),
  getFloorReport: (payload) => dispatch(getFloorReport(payload)),
  getLocationReport: (payload) => dispatch(getLocationReport(payload)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Report));
