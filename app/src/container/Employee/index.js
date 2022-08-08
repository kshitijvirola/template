import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Modal, Image, Spin } from "antd";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";

import {
  ProfileModal,
  ExportModal,
  Header,
  Input,
  Menu,
  Table,
  TransferModal,
} from "components/Form";
import { userpluse, download, upload } from "components/Images";
import { getEmployee, deleteEmployee } from "redux/employee/action";
import { PageConst, RemoveConst } from "App/AppConstant";
import { configVar, transferConstant } from "modules/config";
import { getAuthRole } from "modules/helper";
import { PageStyle } from "App/app.style";

var userRole = getAuthRole();
const { confirm } = Modal;
class Employee extends Component {
  constructor() {
    super();
    this.state = {
      showTransfer: false,
      exportVisible: false,
      show: false,
      search: "",
      viewdata: {},
    };
  }
  async componentDidMount() {
    userRole = userRole ? userRole : getAuthRole();
    if (userRole !== "ADMIN") this.props.history.push("/");
    await this.props.getEmployee();
  }
  async componentDidUpdate(prevProps) {
    try {
      const { isEmpImported } = this.props;
      if (isEmpImported !== prevProps.isEmpImported) {
        isEmpImported && (await this.props.getEmployee());
      }
    } catch (error) {
      console.log(error);
    }
  }
  download = () => {
    try {
      var win = window.open(
        configVar.BASE_URL + transferConstant.IMPORT_EMPLOYEE_TEMPLATE,
        "_blank"
      );
      win.focus();
      this.setState({ showTransfer: false });
    } catch (error) {
      console.log(error);
    }
  };
  showTransferModal = async (val) => {
    try {
      const { showTransfer } = this.state;
      this.setState({ showTransfer: !showTransfer });
      val && (await this.props.getEmployee());
    } catch (error) {
      console.log(error);
    }
  };
  toggleExportModal = async (val) => {
    try {
      const { exportVisible } = this.state;
      this.setState({ exportVisible: !exportVisible });
    } catch (error) {
      console.log(error);
    }
  };
  showModal = (id) => {
    try {
      const { show } = this.state;
      const { employees } = this.props;
      if (id && id !== 0 && !show) {
        let vdata = employees.find((x) => x.userid === id);
        this.setState({ viewdata: vdata });
      }
      this.setState({ show: !show });
    } catch (error) {
      console.log(error);
    }
  };
  removecol = async (i) => {
    try {
      confirm({
        title: RemoveConst.header + PageConst.emp,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage +
          PageConst.emp.toLowerCase() +
          RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("employee-form"),
        onOk: () => {
          this.deleteCol(i);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  deleteCol = async (id) => {
    try {
      await this.props.deleteEmployee(id);
      await this.props.getEmployee();
    } catch (error) {
      console.log(error);
    }
  };
  txtChange = (e) => this.setState({ search: e.target.value });
  render() {
    const { show, viewdata, showTransfer, search, exportVisible } = this.state;
    const { loading, loading1, employees } = this.props;
    return (
      <Spin spinning={loading || loading1} size="large">
        <Row>
          <Col xs={0} sm={0} md={8} lg={6} xl={5} className="menuItems">
            <Menu />
          </Col>
          <Col xs={24} sm={24} md={16} lg={18} xl={19} className="dataItems">
            <PageStyle>
              <Header />
              <div className="displayDiv" id="employee-form">
                <h2 className="title">{PageConst.empMast}</h2>
                <div className="headDiv">
                  <div className="search">
                    <Input
                      placeholder={PageConst.search}
                      value={search}
                      onChange={this.txtChange}
                      suffix={<SearchOutlined />}
                    />
                  </div>
                  <div className="icon_box">
                    <div className="set_icon_box">
                      <Image
                        src={download}
                        preview={false}
                        className="downImg pointer"
                        onClick={this.toggleExportModal}
                      />
                    </div>
                    <div className="set_icon_box">
                      <Image
                        src={userpluse}
                        preview={false}
                        className="userpImg pointer"
                        onClick={() => this.props.history.push("/add-employee")}
                      />
                    </div>
                    <div className="set_icon_box">
                      <Image
                        src={upload}
                        search={search}
                        preview={false}
                        className="upImg pointer"
                        onClick={this.showTransferModal}
                      />
                    </div>
                  </div>
                </div>
                <div className="midel_content">
                  <Table
                    type={"employee"}
                    data={employees}
                    search={search}
                    showModal={this.showModal}
                    getEditId={(url) => this.props.history.push(url)}
                    removecol={this.removecol}
                  />
                </div>
              </div>
              {show && (
                <ProfileModal
                  data={viewdata}
                  title={PageConst.emp}
                  visible={show}
                  onCancel={this.showModal}
                  onOk={this.showModal}
                />
              )}
              {exportVisible && (
                <ExportModal
                  type={"Employee"}
                  data={employees}
                  onCancel={this.toggleExportModal}
                  onOk={this.toggleExportModal}
                />
              )}
              {showTransfer && (
                <TransferModal
                  visible={showTransfer}
                  title={PageConst.adiBul}
                  paName={PageConst.emp}
                  onCancel={this.showTransferModal}
                  onOk={this.showTransferModal}
                  download={this.download}
                />
              )}
            </PageStyle>
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
  employees: state.employee.employees,
  isEmpImported: state.transfer.isEmpImported,
  loading1: state.transfer.loading,
});
const mapDispatchToProps = (dispatch) => ({
  getEmployee: (payload) => dispatch(getEmployee(payload)),
  deleteEmployee: (payload) => dispatch(deleteEmployee(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Employee)
);
