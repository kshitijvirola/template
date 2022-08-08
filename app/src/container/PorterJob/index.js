import React, { Component } from "react";
import { Row, Col, Empty } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { PageConst } from "App/AppConstant";
import { getAuthUserID, getAuthRole } from "modules/helper";
import { Menu, Header, Collapse, Label, Button, Footer } from "components/Form";
import {
  getPorterRequestList,
  getAcceptedRequest,
  getRejectedRequest,
  setRequestAcceptance,
  setStartJob,
  setFinishJob,
  getStatus,
  getUpdateStatus,
} from "redux/porterData/actions";
import { DashboardStyle } from "container/EmpDashboard/style";

var userid = getAuthUserID();
var userRole = getAuthRole();
var refreshIntervalId = null;
class CurrentJob extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      visible: false,
      path: "/current-job",
      activeKey: -1,
      active: [],
      status: "",
      selected: true,
    };
  }
  async componentDidMount() {
    try {
      const { location } = this.props;
      userRole = userRole ? userRole : getAuthRole();
      if (userRole !== "PORTER") this.props.history.push("/");
      let path = location.pathname.slice(1);
      path = path.toLowerCase();
      this.setState({ path });
      userid = userid ? userid : getAuthUserID();
      if (path === "" || path === "current-job") {
        this.setState({ activeKey: "0" });
        this.updateAPI();
        setInterval(() => {
          this.updateAPI();
        }, 10000);
      } else if (path === "job-finished") {
        await this.props.getAcceptedRequest(userid);
      } else if (path === "job-rejected")
        await this.props.getRejectedRequest(userid);
      await this.props.getStatus(userid);
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { statusList } = this.props;
      if (statusList !== prevProps.statusList) {
        let selected = statusList.find((x) => x.selected === 1);
        const { path, activeKey } = this.state;
        this.setState({
          activeKey: path === "" || path === "current-job" ? activeKey : -1,
          active: !selected ? [] : selected,
          status: selected ? selected.status : "Available",
          selected: selected && selected.status === "Rest" ? true : false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  updateAPI = async () => {
    try {
      await this.props.getPorterRequestList(userid);
      await this.props.getAcceptedRequest(userid);
    } catch (error) {
      console.log(error);
    }
  };
  collapseKey = (key) => {
    const { path } = this.state;
    if ((path === "" || path === "current-job") && (!key || key < 0)) key = 0;
    this.setState({ activeKey: key });
  };
  switchChange = async () => {
    try {
      const { selected } = this.state;
      this.setState({ selected: !selected });
      let flag = !selected ? 3 : 2;
      await this.props.getUpdateStatus(userid + "/" + flag);
      await this.props.getStatus(userid);
    } catch (error) {
      console.log(error);
    }
  };
  setDate = (txt) => {
    try {
      let sdate = txt && txt !== null && txt.length > 0 ? new Date(txt) : txt;
      if (sdate) {
        let str = sdate.toGMTString();
        let locstr = sdate.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        let splt = str.split(" ");
        sdate = splt[1] + "-" + splt[2] + "-" + splt[3];
        sdate = sdate + " " + locstr;
      }
      return sdate;
    } catch (error) {
      console.log(error);
    }
  };
  colUI = () => {
    try {
      const { path, activeKey } = this.state;
      const { acceptedReq, requestList, rejectedReq } = this.props;
      let home = path === "" || path === "current-job";
      let data = path === "job-rejected" ? rejectedReq : [];
      if (home && (requestList.length > 0 || acceptedReq.length > 0)) {
        data = requestList;
        let data1 = acceptedReq.filter(
          (x) =>
            x.porterstatus !== "Finished" &&
            x.status !== "Finished" &&
            x.porterstatus !== "Completed" &&
            x.status !== "Completed"
        );
        data = data.concat(data1);
        let stjob = data.filter((x) => x.porterstatus === "Job Started");
        if (stjob.length > 0) {
          data = stjob;
          if (!localStorage.abcd) {
            localStorage.abcd = new Date(stjob[0].starttime);
            localStorage.sid = stjob[0].requestid;
          }
        } else if (data.length > 0) {
          let ary = data.sort((a, b) => a.requestid - b.requestid);
          data = [ary[0]];
        }
      } else if (path === "job-finished" && acceptedReq.length > 0) {
        data = acceptedReq.filter(
          (x) => x.porterstatus === "Finished" || x.porterstatus === "Completed"
        );
        if (localStorage.sid) {
          let arr = data.filter(
            (x) => x.requestid === parseInt(localStorage.sid)
          );
          if (arr.length > 0) {
            localStorage.removeItem("abcd");
            localStorage.removeItem("sid");
            refreshIntervalId !== null && clearInterval(refreshIntervalId);
          }
        }
      }
      let array = [];
      data.forEach((a) => {
        let clr =
          a.porterstatus === "Job Started" || a.porterstatus === "Accepted"
            ? "green"
            : a.porterstatus === "Rejected"
            ? "red"
            : a.porterstatus === "Looking for Porter" ||
              (a.status === "Looking for Porter" &&
                a.porterstatus !== "Finished")
            ? "blue"
            : "orange";
        let sdate = this.setDate(a.starttime);
        let edate = this.setDate(a.endtime);
        array.push({
          header: (
            <div className="panelSet current">
              <div className="static_cont">
                <div className="field">
                  <Label title={PageConst.to} className="brdy bold wl-7" />
                  <p className="bold orange">{a.toemp ? a.toemp : "-"}</p>
                </div>
                <div className="field">
                  <Label title={PageConst.status} className="bold wl-7 brdy" />
                  <Label
                    title={a.porterstatus || a.status}
                    className={`bold ${clr}`}
                  />
                </div>
                <div className="field">
                  <Label title={PageConst.dest} className="brdy bold wl-7" />
                  <Label title={a.destination} className="bold orange" />
                </div>
                <div className="field">
                  <Label title={PageConst.pick} className="brdy bold wl-7" />
                  <Label title={a.pickup} className="bold orange" />
                </div>
              </div>
            </div>
          ),
          body: this.bodyUi(
            a.requestid,
            a.fromemp,
            a.noofporterneeded,
            a.description,
            a.status,
            a.porterstatus,
            sdate,
            edate,
            a.timespent
          ),
        });
      });
      return data.length > 0 ? (
        <Collapse
          data={array}
          collapseKey={this.collapseKey}
          activeKey={activeKey}
        />
      ) : (
        <Empty description={<span>No Job</span>} />
      );
    } catch (error) {
      console.log(error);
    }
  };
  btnUI = (id) => {
    try {
      const { disable, path } = this.state;
      return (
        <>
          <Button
            color="accept"
            disabled={disable}
            onClick={() => this.setAcceptance(id, true)}
          >
            {PageConst.accept}
          </Button>
          {path !== "job-rejected" && (
            <Button
              color="decline"
              disabled={disable}
              onClick={() => this.setAcceptance(id, false)}
            >
              {PageConst.reject}
            </Button>
          )}
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  setZer = (a) => (a.toString().length === 1 ? "0" + a : a);
  getTime = (date, id, state) => {
    try {
      if (!localStorage.abcd && state === "Job Started") {
        localStorage.abcd = new Date().toString();
        localStorage.sid = id;
      }
      refreshIntervalId =
        date &&
        id &&
        setInterval(() => {
          if (localStorage.abcd) {
            let date_past = new Date(localStorage.abcd);
            let date_now = new Date();
            let seconds = Math.floor((date_now - date_past) / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            let days = Math.floor(hours / 24);
            hours = hours - days * 24;
            minutes = minutes - days * 24 * 60 - hours * 60;
            seconds =
              seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
            let item = document.getElementById(id);
            if (
              item &&
              document.getElementById(id + "hour") &&
              state === "Job Started"
            ) {
              document.getElementById(id + "hour").innerText =
                this.setZer(hours);
              document.getElementById(id + "minute").innerText =
                this.setZer(minutes);
              document.getElementById(id + "second").innerText =
                this.setZer(seconds);
            } else clearInterval(refreshIntervalId);
          }
        }, 1000);
      (!date || !id) && clearInterval(refreshIntervalId);
    } catch (error) {
      console.log(error);
    }
  };
  bodyUi = (
    id,
    fromemp,
    needed,
    description,
    state,
    pstate,
    stime,
    etime,
    spand
  ) => {
    try {
      const { disable, path, status } = this.state;
      pstate === "Job Started" &&
        stime !== null &&
        this.getTime(stime, id, pstate);
      pstate === "Finished" && this.getTime();
      return (
        <>
          <div className="panel_box current">
            {fromemp && this.fieldUI(PageConst.from, fromemp)}
            {needed && this.fieldUI(PageConst.por, needed)}
          </div>
          {state !== "Finished" && stime && (
            <>
              {this.fieldUI(PageConst.startj, stime)}
              {path === "job-finished" &&
                etime &&
                this.fieldUI(PageConst.endj, etime)}
            </>
          )}
          {state === "Finished" && (
            <div className="panel_box current">
              {stime && this.fieldUI(PageConst.startj, stime)}
              {etime && this.fieldUI(PageConst.endj, etime)}
              {spand && this.fieldUI(PageConst.ts, spand)}
            </div>
          )}
          {description && this.fieldUI(PageConst.rem, description, true)}
          {pstate === "Job Started" && stime !== null && (
            <div>
              <div className="timeDiv" id={id}>
                <div>
                  <h4>{PageConst.hor}</h4>
                  <h1 id={id + "hour"}>{PageConst.zero}</h1>
                </div>
                <div className="min">
                  <h4>{PageConst.min}</h4>
                  <h1 id={id + "minute"}>{PageConst.zero}</h1>
                </div>
                <div>
                  <h4>{PageConst.sec}</h4>
                  <h1 id={id + "second"}>{PageConst.zero}</h1>
                </div>
              </div>
            </div>
          )}
          <div className="colbtn">
            {path === "" || path === "current-job" ? (
              (state === "Looking for Porter" || state === "Porter on Way") &&
              pstate !== "Accepted" &&
              status !== "On Job" &&
              status !== "Rest" ? (
                this.btnUI(id)
              ) : pstate === "Accepted" &&
                status !== "On Job" &&
                status !== "Rest" ? (
                <Button
                  disabled={disable || status === "Rest"}
                  onClick={() => this.setJob(id, "start")}
                >
                  {PageConst.startj}
                </Button>
              ) : (
                (state === "Job Started" || pstate === "Job Started") && (
                  <Button
                    disabled={disable}
                    color="decline"
                    onClick={() => this.setJob(id, "end")}
                  >
                    {PageConst.endj}
                  </Button>
                )
              )
            ) : (
              ""
            )}
            {path === "job-rejected" &&
              status !== "On Job" &&
              status !== "Rest" &&
              this.btnUI(id)}
          </div>
        </>
      );
    } catch (error) {
      console.log();
    }
  };
  fieldUI = (a, b, c) => {
    try {
      return (
        <div className="field">
          <Label title={a} className="brdy bold wl-7" />
          {!c ? (
            <Label title={b} className="orange bold" />
          ) : (
            <p className="orange bold wb">{b}</p>
          )}
        </div>
      );
    } catch (error) {
      console.log();
    }
  };
  setDisable = async () => {
    try {
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 1000);
    } catch (error) {
      console.log();
    }
  };
  setAcceptance = async (id, val) => {
    try {
      const { path } = this.state;
      this.setDisable();
      await this.props.setRequestAcceptance(id + "/" + userid + "/" + val);
      if (path === "" || path === "current-job") {
        await this.props.getPorterRequestList(userid);
        await this.props.getAcceptedRequest(userid);
      } else if (path === "job-rejected")
        await this.props.getRejectedRequest(userid);
      this.collapseKey(-1);
    } catch (error) {
      console.log();
    }
  };
  setJob = async (id, val) => {
    try {
      this.setDisable();
      let txt = "/2";
      if (val === "end") localStorage.removeItem("abcd");
      if (val === "start") {
        txt = "/1";
        this.setState({ status: "On Job" });
        await this.props.setStartJob(id + "/" + userid);
      } else {
        this.setState({ status: "Available" });
        await this.props.setFinishJob(id + "/" + userid);
      }
      await this.props.getUpdateStatus(userid + txt);
      await this.props.getAcceptedRequest(userid);
      this.collapseKey(-1);
    } catch (error) {
      console.log();
    }
  };
  render() {
    const { path, status, selected } = this.state; //const { loading } = this.props;
    if (!userRole || userRole !== "PORTER") return <></>;
    // <Spin spinning={loading} size="large"> </Spin>
    return (
      <Row>
        <Col xs={0} sm={0} md={8} lg={6} xl={5} className="menuItems">
          <Menu />
        </Col>
        <Col xs={24} sm={24} md={16} lg={18} xl={19} className="dataItems">
          <DashboardStyle>
            <Header status={status} />
            <div className="displayDiv panDiv" id="empDash-form">
              <h2 className="title">
                {path === "current-job"
                  ? PageConst.cj
                  : path === "job-finished"
                  ? PageConst.jc
                  : path === "job-rejected"
                  ? PageConst.jr
                  : PageConst.cj}
              </h2>
              <div className="midel_content">{this.colUI()}</div>
            </div>
            <Footer
              status={status}
              selected={selected}
              onJob={status === "On Job"}
              switchChange={this.switchChange}
            />
          </DashboardStyle>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.porterData.loading,
  error: state.porterData.error,
  message: state.porterData.message,
  requestList: state.porterData.requestList,
  acceptedReq: state.porterData.acceptedReq,
  rejectedReq: state.porterData.rejectedReq,
  statusList: state.porterData.statusList,
});
const mapDispatchToProps = (dispatch) => ({
  getPorterRequestList: (payload) => dispatch(getPorterRequestList(payload)),
  getAcceptedRequest: (payload) => dispatch(getAcceptedRequest(payload)),
  getRejectedRequest: (payload) => dispatch(getRejectedRequest(payload)),
  setRequestAcceptance: (payload) => dispatch(setRequestAcceptance(payload)),
  setStartJob: (payload) => dispatch(setStartJob(payload)),
  getUpdateStatus: (payload) => dispatch(getUpdateStatus(payload)),
  setFinishJob: (payload) => dispatch(setFinishJob(payload)),
  getStatus: (payload) => dispatch(getStatus(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CurrentJob)
);
