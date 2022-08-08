import React, { Component } from "react";
import { Row, Col, Image, Modal, Spin } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";

import {
  ExportModal,
  Menu,
  Table,
  Input,
  Header,
  ProfileModal,
  TransferModal,
} from "components/Form";
import { userpluse, download, upload } from "components/Images";
import { getPorter, deletePorter } from "redux/porter/action";
import { PageConst, RemoveConst } from "App/AppConstant";
import { configVar, transferConstant } from "modules/config";
import { PageStyle } from "App/app.style";
import { getAuthRole } from "modules/helper";

var userRole = getAuthRole();
const { confirm } = Modal;
class PorterMaster extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      showTransfer: false,
      viewVisible: false,
      exportVisible: false,
      search: "",
      tblData: [],
      viewData: {},
      protData: [],
    };
  }
  async componentDidMount() {
    userRole = userRole ? userRole : getAuthRole();
    if (userRole !== "ADMIN") this.props.history.push("/");
    await this.props.getPorter();
  }
  async componentDidUpdate(prevProps) {
    try {
      const { porters, isImported } = this.props;
      if (porters !== prevProps.porters) {
        porters.length > 0 && this.setState({ tblData: porters });
      }
      if (isImported !== prevProps.isImported) {
        isImported && (await this.props.getPorter());
      }
    } catch (error) {
      console.log(error);
    }
  }
  removePorter = (id) => {
    try {
      confirm({
        title: RemoveConst.header + PageConst.por,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage +
          PageConst.por.toLowerCase() +
          RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("porter-form"),
        onOk: () => {
          this.dropDeleteClick(id);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  download = () => {
    try {
      var win = window.open(
        configVar.BASE_URL + transferConstant.IMPORT_PORTER_TEMPLATE,
        "_blank"
      );
      win.focus();
      this.setState({ showTransfer: false });
    } catch (error) {
      console.log(error);
    }
  };
  toggleTransModal = async (val) => {
    try {
      const { showTransfer } = this.state;
      this.setState({ showTransfer: !showTransfer });
      val && (await this.props.getPorter());
    } catch (error) {
      console.log(error);
    }
  };
  toggleExportModal = async () => {
    try {
      const { exportVisible } = this.state;
      this.setState({ exportVisible: !exportVisible });
    } catch (error) {
      console.log(error);
    }
  };
  toggleEmpModal = (id) => {
    try {
      const { visible, tblData } = this.state;
      let prt = tblData.find((x) => x.userid === id);
      this.setState({ viewData: prt });
      this.setState({ visible: !visible });
    } catch (error) {
      console.log(error);
    }
  };
  dropDeleteClick = async (id) => {
    try {
      await this.props.deletePorter(id);
      await this.props.getPorter();
    } catch (error) {
      console.log(error);
    }
  };
  txtChange = (e) => this.setState({ search: e.target.value });
  render() {
    const { tblData, visible, viewData, showTransfer, search, exportVisible } =
      this.state;
    const { loading, loading1 } = this.props;
    return (
      <Spin spinning={loading || loading1} size="large">
        <Row>
          <Col xs={0} sm={0} md={8} lg={6} xl={5} className="menuItems">
            <Menu />
          </Col>
          <Col xs={24} sm={24} md={16} lg={18} xl={19} className="dataItems">
            <PageStyle>
              <Header />
              <div className="displayDiv" id="porter-form">
                <h2 className="title">{PageConst.porMast}</h2>
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
                        onClick={() => this.props.history.push("/add-porter")}
                      />
                    </div>
                    <div className="set_icon_box">
                      <Image
                        src={upload}
                        preview={false}
                        className="upImg pointer"
                        onClick={this.toggleTransModal}
                      />
                    </div>
                  </div>
                </div>
                <div className="midel_content">
                  <Table
                    type={"porter"}
                    data={tblData}
                    search={search}
                    showModal={this.toggleEmpModal}
                    getEditId={(url) => this.props.history.push(url)}
                    removecol={this.removePorter}
                  />
                  {visible && (
                    <ProfileModal
                      title={PageConst.por}
                      data={viewData}
                      onCancel={this.toggleEmpModal}
                      onOk={this.toggleEmpModal}
                    />
                  )}
                </div>
              </div>
              {showTransfer && (
                <TransferModal
                  title={PageConst.adiBul}
                  paName={PageConst.por}
                  onCancel={this.toggleTransModal}
                  onOk={this.toggleTransModal}
                  download={this.download}
                />
              )}
              {exportVisible && (
                <ExportModal
                  type={"Porter"}
                  data={tblData}
                  onCancel={this.toggleExportModal}
                  onOk={this.toggleExportModal}
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
  loading: state.porter.loading,
  error: state.porter.error,
  message: state.porter.message,
  porters: state.porter.porters,
  isImported: state.transfer.isImported,
  loading1: state.transfer.loading,
});
const mapDispatchToProps = (dispatch) => ({
  getPorter: (payload) => dispatch(getPorter(payload)),
  deletePorter: (payload) => dispatch(deletePorter(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PorterMaster)
);
