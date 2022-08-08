import React, { Component } from "react";
import { Row, Col, Image, Modal, Empty } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { DashboardStyle } from "./style";
import { editPen, fillClose } from "components/Images";
import { RemoveConst, PageConst } from "App/AppConstant";
import { getAuthUserID, getAuthRole, getAuthUserName } from "modules/helper";
import {
  getRequestList,
  deleteRequest,
  setCompleteRequest,
} from "redux/request/action";
import { Menu, Collapse, Button, Header, Label } from "components/Form";

const { confirm } = Modal;
var userRole = getAuthRole();
var userId = getAuthUserID();
var userName = getAuthUserName();

class EmpDashboard extends Component {
  constructor() {
    super();
    this.state = { activeKey: ["1"] };
  }
  async componentDidMount() {
    try {
      userRole = userRole ? userRole : getAuthRole();
      userName = userName ? userName : getAuthUserName();
      if (userRole !== "EMPLOYEE") this.props.history.push("/");
      userId = userId ? userId : getAuthUserID();
      await this.props.getRequestList(userId);
      setInterval(() => {
        this.props.getRequestList({ id: userId, show: false });
      }, 10000);
    } catch (error) {
      console.log(error);
    }
  }
  collapseKey = (key) => this.setState({ activeKey: key });
  removecol = (requestid, empid, type) => {
    try {
      confirm({
        title: RemoveConst.header + type,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage + type.toLowerCase() + RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("empDash-form"),
        onOk: () => {
          this.props.deleteRequest(requestid + "/" + empid);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  setComplete = async (data) => {
    await this.props.setCompleteRequest(data);
    await this.props.getRequestList(userId);
  };
  colUI = () => {
    try {
      const { activeKey } = this.state;
      const { requestList } = this.props;
      let array = [];
      requestList.forEach((a, i) => {
        array.push({
          header: (
            <div className="panelSet">
              <div className="content">
                <div className="static_cont">
                  <div className="field">
                    <Label title={PageConst.to} className="brdy bold wl-7" />
                    <Label
                      title={a.toemp ? a.toemp : "-"}
                      className="bold orange"
                    />
                  </div>
                  <div className="field">
                    <Label
                      title={PageConst.status}
                      className="bold brdy wl-7"
                    />
                    <Label
                      title={a.status}
                      className={`bold ${
                        a.status === "Looking for Porter"
                          ? "blue"
                          : a.status === "Finished" || a.status === "Completed"
                          ? "red"
                          : a.status === "Job Started"
                          ? "green"
                          : "orange"
                      }`}
                    />
                  </div>
                  <div className="field">
                    <Label title={PageConst.dest} className="brdy bold wl-7" />
                    <Label title={a.destination} className="bold orange" />
                  </div>
                  <div className="field">
                    <Label title={PageConst.from} className="brdy bold wl-7" />
                    <Label title={a.fromemp} className="bold orange" />
                  </div>
                </div>
                {activeKey === i.toString() && (
                  <div className="dynamic_cont">
                    <div className="field">
                      <Label title={PageConst.por} className="brdy bold wl-7" />
                      <Label title={a.noofporterneeded} className="orange" />
                    </div>
                    <div className="field">
                      <Label title={PageConst.rem} className="brdy bold wl-7" />
                      <Label title={a.description} className="orange wb" />
                    </div>
                  </div>
                )}
              </div>
              {activeKey === i.toString() && a.status === "Finished" && (
                <div
                  className="completed_box"
                  onClick={() => this.setComplete(a.requestid + "/" + userId)}
                >
                  {PageConst.comp}
                </div>
              )}
              {a.status !== "Finished" &&
                a.status !== "Job Started" &&
                a.status !== "Completed" &&
                userName === a.fromemp &&
                activeKey === i.toString() && (
                  <>
                    <div className="edite">
                      <Image
                        src={editPen}
                        preview={false}
                        width={16}
                        onClick={(event) => {
                          event.stopPropagation();
                          this.props.history.push(
                            "/edit-request/" + window.btoa(a.requestid)
                          );
                        }}
                      />
                    </div>
                    <div>
                      <Image
                        src={fillClose}
                        preview={false}
                        width={16}
                        onClick={(event) => {
                          event.stopPropagation();
                          this.removecol(a.requestid, userId, PageConst.req);
                        }}
                      />
                    </div>
                  </>
                )}
            </div>
          ),
          body: (
            <div>{this.bodyUi(a.pickup, a.status, a.starttime, a.endtime)}</div>
          ),
        });
      });
      return requestList.length > 0 ? (
        <Collapse data={array} collapseKey={this.collapseKey} />
      ) : (
        <Empty />
      );
    } catch (error) {
      console.log(error);
    }
  };
  bodyUi = (pickup, status, start, end) => {
    try {
      return (
        <div className="panel_box">
          <div className="pick_up">
            <div className="field">
              <Label title={PageConst.pick} className="brdy bold wl-7" />
              <Label title={pickup} className="orange bold" />
            </div>
          </div>
          {(status === "Job Started" ||
            status === "Finished" ||
            status === "Completed") && (
            <div className="time-data">
              <div className="field">
                <Label title={PageConst.starttm} className="brdy bold wl-7" />
                <Label title={start ? start : "-"} className="orange bold" />
              </div>
              {(status === "Finished" || status === "Completed") && (
                <div className="field">
                  <Label title={PageConst.endtm} className="brdy bold wl-7" />
                  <Label title={end ? end : "-"} className="orange bold" />
                </div>
              )}
            </div>
          )}
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    // const { loading } = this.props;
    if (!userRole || userRole !== "EMPLOYEE") return <></>;
    // <Spin spinning={loading} size="large">  </Spin>
    return (
      <Row>
        <Col xs={0} sm={0} md={8} lg={6} xl={5} className="menuItems">
          <Menu />
        </Col>
        <Col xs={24} sm={24} md={16} lg={18} xl={19} className="dataItems">
          <DashboardStyle>
            <Header />
            <div className="displayDiv" id="empDash-form">
              <h2 className="title">{PageConst.dash}</h2>
              <div className="headDiv">
                <div className="button_box">
                  <Button onClick={() => this.props.history.push("/request")}>
                    {PageConst.addReq}
                  </Button>
                </div>
              </div>
              <div className="midel_content emp">{this.colUI()}</div>
            </div>
          </DashboardStyle>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.request.loading,
  error: state.request.error,
  message: state.request.message,
  requestList: state.request.requestList,
});
const mapDispatchToProps = (dispatch) => ({
  getRequestList: (payload) => dispatch(getRequestList(payload)),
  deleteRequest: (payload) => dispatch(deleteRequest(payload)),
  setCompleteRequest: (payload) => dispatch(setCompleteRequest(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmpDashboard)
);
