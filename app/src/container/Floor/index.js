import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Image, Modal, Spin, Empty, Space, Tooltip } from "antd";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";

import {
  Button,
  Input,
  Menu,
  Header,
  Collapse,
  LocationModal,
  Card,
} from "components/Form";
import { boxplus, location, editPen, fillClose } from "components/Images";
import { PageConst, RemoveConst } from "App/AppConstant";
import { getFloor, deleteFloor } from "redux/floor/action";
import { deleteLocation } from "redux/location/action";
import { PageStyle } from "App/app.style";

const { confirm } = Modal;

class Floor extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      floorvisible: false,
      show: false,
      edit: false,
      search: "",
      title: "Location",
      activeKey: [""],
      fdata: [],
      sdata: [],
      locId: 0,
    };
  }
  async componentDidMount() {
    await this.props.getFloor();
  }
  componentDidUpdate(prevProps) {
    const { floors } = this.props;
    if (floors !== prevProps.floors) {
      let sdata = [];
      floors.forEach((a) => {
        sdata.push({ id: a.floorid, value: a.floorname });
      });
      this.setState({ sdata });
    }
  }
  collapseKey = (key) => this.setState({ activeKey: key });
  editLoc = (loc) =>
    this.setState({ title: "Location", visible: true, locId: loc });
  editCol = (id) => {
    try {
      if (id) {
        const { floors } = this.props;
        let fdata = floors.find((x) => x.floorid === id);
        this.setState({
          title: "Floor",
          visible: true,
          eid: id,
          fdata: fdata ? fdata : [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  removecol = (id, type) => {
    try {
      confirm({
        title: RemoveConst.header + type,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage + type.toLowerCase() + RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("floor-form"),
        onOk: () => {
          this.deleteCol(id, type);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  deleteCol = async (id, type) => {
    if (type === "Floor") await this.props.deleteFloor(id);
    else await this.props.deleteLocation(id);
    await this.props.getFloor();
  };
  toggleModal = (a) => {
    try {
      const { visible } = this.state;
      this.setState({ visible: !visible, title: a, locId: 0, fdata: [] });
    } catch (error) {
      console.log(error);
    }
  };
  changeToEdit = () => {
    try {
      const { show, edit } = this.state;
      this.setState({ show: !show, edit: !edit });
    } catch (error) {
      console.log(error);
    }
  };
  searchData = () => {
    try {
      const { search } = this.state;
      const { floors } = this.props;
      let dData = [];
      let display = [];
      floors &&
        floors.length > 0 &&
        floors.forEach((a) => {
          a.locations.forEach((e) => {
            display.push(a.floorname, e.location, e.description);
          });
          let array = [];
          display.forEach((e) => {
            if (e && e !== null && e.length > 0) array.push(e);
          });
          let matches = array.filter((s) => s.includes(search));
          display = [];
          if (matches && matches.length > 0) dData.push(a);
        });
      return dData;
    } catch (error) {
      console.log(error);
    }
  };
  colUI = () => {
    try {
      const { activeKey, search } = this.state;
      const { floors } = this.props;
      let array = [];
      let display = search.trim() === "" ? floors : this.searchData();
      display.forEach((e, i) => {
        array.push({
          header: (
            <div className="panelSet">
              <h3>{e.floorname}</h3>
              {activeKey === i.toString() && (
                <>
                  <div className="edite">
                    <Image
                      src={editPen}
                      preview={false}
                      width={16}
                      onClick={(event) => {
                        event.stopPropagation();
                        this.editCol(e.floorid);
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
                        this.removecol(e.floorid, PageConst.floor);
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          ),
          body: (
            <div className="panel_box">
              {<Row gutter={10}>{this.bodyUi(e.locations)}</Row>}
            </div>
          ),
        });
      });
      if (array.length > 0)
        return <Collapse data={array} collapseKey={this.collapseKey} />;
      return (
        <Empty description={RemoveConst.no + PageConst.floor}>
          <Button onClick={() => this.toggleModal("Floor")}>
            {PageConst.add + PageConst.floor}
          </Button>
        </Empty>
      );
    } catch (error) {
      console.log(error);
    }
  };
  bodyUi = (locations) => {
    try {
      if (locations.length > 0)
        return locations.map((a, i) => (
          <Col key={i} xs={24} sm={24} md={24} lg={12} xl={8}>
            <Card
              title={a.location}
              content={a.description}
              extra={
                <Space>
                  <Image
                    src={editPen}
                    preview={false}
                    width={16}
                    onClick={() => this.editLoc(a.locationid)}
                  />
                  <Image
                    src={fillClose}
                    preview={false}
                    width={16}
                    onClick={(event) => {
                      event.stopPropagation();
                      this.removecol(a.locationid, PageConst.loc);
                    }}
                  />
                </Space>
              }
            />
          </Col>
        ));
      return (
        <Empty description={RemoveConst.no + PageConst.loc}>
          <Button onClick={() => this.toggleModal("Location")}>
            {PageConst.add + PageConst.loc}
          </Button>
        </Empty>
      );
    } catch (error) {
      console.log(error);
    }
  };
  txtChange = (e) => this.setState({ search: e.target.value });
  render() {
    const { visible, locId, fdata, title, sdata, search } = this.state;
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
              <div className="displayDiv" id="floor-form">
                <h2 className="title">{PageConst.floorMast}</h2>
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
                      <Tooltip title={"Add Floor"}>
                        <Image
                          src={boxplus}
                          preview={false}
                          className="boxImg pointer"
                          onClick={() => this.toggleModal("Floor")}
                        />
                      </Tooltip>
                    </div>
                    <div className="set_icon_box">
                      <Tooltip title={"Add Location"} placement="topRight">
                        <Image
                          src={location}
                          preview={false}
                          className="locImg pointer"
                          onClick={() => this.toggleModal("Location")}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <div className="midel_content">{this.colUI()}</div>
              </div>
            </PageStyle>
          </Col>
        </Row>
        {visible && (
          <LocationModal
            title={title}
            visible={visible}
            sdata={sdata}
            data={fdata}
            locId={locId}
            onCancel={this.toggleModal}
            onOk={this.toggleModal}
            changeToEdit={this.changeToEdit}
          />
        )}
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.floor.loading,
  error: state.floor.error,
  message: state.floor.message,
  floors: state.floor.floors,
  loading1: state.location.loading,
});
const mapDispatchToProps = (dispatch) => ({
  getFloor: (payload) => dispatch(getFloor(payload)),
  deleteFloor: (payload) => dispatch(deleteFloor(payload)),
  deleteLocation: (payload) => dispatch(deleteLocation(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Floor));
