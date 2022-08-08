import React, { Component } from "react";
import { Row, Col, Card, Image, Spin } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Chart from "react-google-charts";

import { Menu, Header, Select, Switch, DashModal } from "components/Form";
import { DashbordStyle } from "./style";
import {
  activePorters,
  activeRequest,
  completeRequest,
  mostActivePorter,
} from "components/Images";
import { getAuthRole } from "modules/helper";
import { PageConst } from "App/AppConstant";
import { getDashboardDetail, getPieChart } from "redux/report/actions";
import { Period } from "./constant";
var userRole = getAuthRole();

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      status: "Day",
      statusId: 1,
      graphData: [],
      pieChartData: [],
      popData: [],
      mapPop: {},
      selected: true,
      show: false,
      cardName: "",
    };
  }
  async componentDidMount() {
    try {
      const { statusId, selected } = this.state;
      userRole = userRole ? userRole : getAuthRole();
      if (userRole !== "ADMIN") this.props.history.push("/");
      let flag = selected ? 1 : 0;
      await this.props.getDashboardDetail(statusId);
      await this.props.getPieChart(statusId + "/" + flag);
    } catch (error) {
      console.log(error);
    }
  }
  async componentDidUpdate(prevProps) {
    try {
      const { dashData, pieData } = this.props;
      if (dashData !== prevProps.dashData) {
        let data = [["Time", "Count"]];
        dashData?.graph &&
          dashData?.graph.forEach((a) => {
            data.push([a.period, a.count]);
          });
        this.setState({ graphData: data });
      }
      if (pieData !== prevProps.pieData) {
        let data = [["period", "Count"]];
        pieData &&
          pieData.forEach((a) => {
            data.push([a.period, a.count]);
          });
        this.setState({ pieChartData: data });
      }
    } catch (error) {
      console.log(error);
    }
  }
  stausUpdate = async (value, id) => {
    const { selected } = this.state;
    let flag = selected ? 1 : 0;
    this.setState({ status: value, statusId: id });
    await this.props.getDashboardDetail(id);
    await this.props.getPieChart(id + "/" + flag);
  };
  switchChange = async () => {
    const { selected, statusId } = this.state;
    this.setState({ selected: !selected });
    let flag = !selected;
    let f = flag ? 1 : 0;
    await this.props.getPieChart(statusId + "/" + f);
  };
  topRowUi = () => {
    try {
      const { dashData } = this.props;
      return (
        <>
          {this.colUI(1, PageConst.av, dashData?.activeporter?.length)}
          {this.colUI(2, PageConst.ar, dashData?.activerequest?.length)}
          {this.colUI(3, PageConst.fr, dashData?.completedrequest?.length)}
          {this.colUI(
            4,
            PageConst.map,
            dashData?.mostactiveporter?.name
              ? dashData?.mostactiveporter?.name
              : " "
          )}
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  openRecord = (name) => {
    try {
      const { show } = this.state;
      const { dashData } = this.props;
      let data =
        name === "Active Porters"
          ? dashData?.activeporter
          : name === "Active Jobs"
          ? dashData?.activerequest
          : name === "Finished Jobs"
          ? dashData?.completedrequest
          : dashData?.mostactiveporter;
      this.setState({
        show: !show,
        cardName: name,
        popData: data,
        mapPop: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  colUI = (i, name, val) => {
    try {
      return (
        <Col xs={24} sm={12} md={12} lg={12} xl={6} className="anime">
          <Card
            className="box pointer"
            onClick={() =>
              name === "Most Active Porter" && val === " "
                ? ""
                : this.openRecord(name)
            }
          >
            <div className="content1">
              <h1 className="number">{val}</h1>
              <h3 className="name">{name}</h3>
            </div>
            <Image
              width={80}
              src={
                i === 1
                  ? activePorters
                  : i === 2
                  ? activeRequest
                  : i === 3
                  ? completeRequest
                  : i === 4
                  ? mostActivePorter
                  : ""
              }
              preview={false}
              className="topImg"
            />
          </Card>
        </Col>
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading } = this.props;
    const {
      status,
      graphData,
      pieChartData,
      selected,
      show,
      cardName,
      popData,
      mapPop,
    } = this.state;
    let txt =
      status === "Day" ? " Hours" : status === "Week" ? " Days" : " Weeks";
    if (!userRole || userRole !== "ADMIN") return <></>;
    return (
      <Spin spinning={loading} size="large">
        <Row>
          <Col xs={0} sm={0} md={8} lg={6} xl={5} className="menuItems">
            <Menu />
          </Col>
          <Col xs={24} sm={24} md={16} lg={18} xl={19} className="dataItems">
            <DashbordStyle>
              <Header />
              <div className="displayDiv">
                <div className="flex">
                  <h2 className="title">{PageConst.dashHead}</h2>
                  <div className="selectDiv">
                    <Select
                      data={Period}
                      value={status}
                      defaultValue={status}
                      withID={true}
                      sort={true}
                      onChange={(value, data) => {
                        this.stausUpdate(value, data?.id);
                      }}
                    />
                  </div>
                </div>
                <Row className="top-row-box">{this.topRowUi()}</Row>
                <Row className="bottom-row-box" gutter={20}>
                  {graphData.length > 0 && (
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Card className="box">
                        <Chart
                          width={"auto"}
                          height={"350px"}
                          chartType="Bar"
                          data={graphData}
                          options={{
                            chart: { title: PageConst.active + txt },
                            colors: "#f89c32",
                            theme: "material",
                            axes: { y: { all: { range: { min: 0 } } } },
                          }}
                        />
                      </Card>
                    </Col>
                  )}
                  {pieChartData?.length > 0 && (
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Card className="box">
                        <div className="pieInfoBox">
                          <h2 className="name">
                            {PageConst.active} {PageConst.floor}
                          </h2>
                          <div className="mrleau">
                            <Switch
                              right={"Pickup"}
                              left={"Destination"}
                              checked={selected}
                              handleChange={this.switchChange}
                            />
                          </div>
                        </div>
                        <Chart
                          width={"auto"}
                          height={"318px"}
                          chartType="PieChart"
                          data={pieChartData}
                          rootProps={{ "data-testid": "1" }}
                          options={{
                            chartArea: {
                              top: 10,
                              width: "100%",
                              height: "80%",
                            },
                            legend: { position: "bottom", alignment: "center" },
                            slices: [
                              { color: "#f89c32" },
                              { color: "#fb7a27" },
                              { color: "#ff9d5d" },
                              { color: "#ff7d19" },
                              { color: "#fb8d38" },
                            ],
                          }}
                        />
                      </Card>
                    </Col>
                  )}
                </Row>
              </div>
              {show && (
                <DashModal
                  title={cardName}
                  data={cardName === "Most Active Porter" ? mapPop : popData}
                  onOk={this.openRecord}
                  onCancel={this.openRecord}
                />
              )}
            </DashbordStyle>
          </Col>
        </Row>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.report.loading,
  error: state.report.error,
  message: state.report.message,
  dashData: state.report.dashData,
  pieData: state.report.pieData,
});
const mapDispatchToProps = (dispatch) => ({
  getDashboardDetail: (payload) => dispatch(getDashboardDetail(payload)),
  getPieChart: (payload) => dispatch(getPieChart(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashBoard)
);
