import React, { Component } from "react";
import { Avatar, Image, Modal, Tooltip } from "antd"; //notification, message
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import { MenuContainer } from "./style";
import { menuIcon, MenuConstant } from "./constant";
import { logout } from "redux/login/actions";
// import { getNotifications } from "redux/notification/actions";
import { getProfile } from "redux/profile/actions";
import { configVar } from "modules/config";
import { getAllUsers } from "redux/user/actions";
import { setCallLog } from "redux/app/actions";
import { NotificationModal } from "components/Form";

const { confirm } = Modal;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { notification: false };
  }
  async componentDidMount() {
    const { userInfo } = this.props;
    if (!userInfo) await this.props.getProfile(); //window.location.pathname === "/call" && (await this.props.setCallLog(true));
  }
  handleClick = async (name, path) => {
    try {
      await this.props.setCallLog(
        name === "Call" || name === "/call" ? true : false
      );
      if (name === "Notification") {
        this.setState({ notification: true });
      } else this.props.history.push(path);
    } catch (error) {
      console.log(error);
    }
  };
  getUserData = (type) => {
    try {
      const { userInfo } = this.props;
      if (userInfo) {
        if (type === "userName") return <b>{userInfo.userName}</b>;
        if (type === "image" && userInfo.userImg !== null)
          return configVar.BASE_URL + userInfo.userImg;
      }
      return null;
    } catch (error) {
      console.log("Menu", "getUserData", error);
    }
  };
  getImage = (name, top, src, srcgray, link) => {
    try {
      const { selected, url } = this.props;
      if (name === "Log-out") {
        return (
          <Tooltip placement="right" title={name} key={name}>
            <Image
              preview={false}
              width={15}
              src={src}
              className="bottomIcon pointer"
              onClick={this.showDeleteConfirm}
              id="logout"
            />
          </Tooltip>
        );
      } else if (link === url) {
        return (
          <div
            key={name}
            className={`selectedDiv pointer ${
              name !== "Change-password" ? "" : "settingIcon"
            }`}
          >
            <Tooltip placement="right" title={name}>
              <Image
                preview={false}
                width={12}
                src={srcgray}
                className={`selectedimg`}
                onClick={() => this.handleClick(link)}
              />
            </Tooltip>
          </div>
        );
      } else {
        return (
          <Tooltip placement="right" title={name} key={name}>
            <Image
              preview={false}
              width={top || name === selected ? 13 : 15}
              src={src}
              className={`pointer ${
                name !== "Change-password" ? "icon" : "settingIcon"
              }`}
              onClick={() => this.handleClick(name, link)}
            />
          </Tooltip>
        );
      }
    } catch (error) {
      console.log("Menu", "getImage", error);
    }
  };
  getMenuIcon = () => {
    try {
      let UI = menuIcon.map((menu) =>
        this.getImage(menu.name, menu.top, menu.src, menu.srcgray, menu.link)
      );
      return <>{UI}</>;
    } catch (error) {
      console.log("Menu", "getMenuIcon", error);
    }
  };
  showDeleteConfirm = () => {
    try {
      confirm({
        title: MenuConstant.header,
        icon: <QuestionCircleOutlined />,
        content: MenuConstant.deleteMessage,
        okText: MenuConstant.yes,
        okType: "danger",
        cancelText: MenuConstant.no,
        getContainer: () => document.getElementById("logout"),
        onOk: () => {
          this.props.logout();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  toggleModel = () => {
    this.setState({ notification: false });
  };
  render() {
    const { notification } = this.state;
    const image = this.getUserData("image");
    return (
      <MenuContainer>
        <NavLink to="/profile" onClick={() => this.handleClick("profile")}>
          <Tooltip placement="right" title="Profile">
            <Avatar
              size={42}
              src={image !== null && image}
              icon={image === null && <UserOutlined />}
              className="iconAvatar pointer"
            />
          </Tooltip>
        </NavLink>
        {this.getMenuIcon()}
        <>
          {notification && (
            <NotificationModal
              title={MenuConstant.title}
              btnText={MenuConstant.btnText}
              nomsg={MenuConstant.nomsg}
              visible={notification}
              onCancel={this.toggleModel}
            />
          )}
        </>
      </MenuContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.profile.userInfo,
  selected: state.app.selected,
  alert: state.notification.alert,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  getProfile: () => dispatch(getProfile()),
  getAllUsers: (payload) => dispatch(getAllUsers(payload)),
  setCallLog: (payload) => dispatch(setCallLog(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
