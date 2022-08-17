import React, { Component } from "react";
import { Image, Menu, Drawer } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { MenuStyle } from "./style";
import { MenuItem } from "./constant";
import { menuCol } from "redux/app/actions";
import { coffee, logo } from "components/Images";
class MenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { path: "", active: "" };
  }
  async componentDidMount() {
    try {
      const { location } = this.props;
      let path = location.pathname.slice(1).toLowerCase();
      let url = path.replace("-", " ");
      url !== "" ? this.setDefault(url) : this.setState({ path: "" });
    } catch (error) {
      console.log(error);
    }
  }
  setDefault = (url) => {
    try {
      let words = url.split(" ");
      let capWords = [];
      words.forEach((a) => {
        capWords.push(a[0].toUpperCase() + a.slice(1, a.length));
      });
      this.setState({ path: capWords.join(" ") });
    } catch (error) {
      console.log(error);
    }
  };
  setOpenKeys = (e) => {
    try {
      const { history } = this.props;
      if (e.key === "Log-out") this.props.logoutWarn();
      else if (e.key === "Change Password")
        this.props.history.push("/change-password");
      else {
        let url = e.key.toLowerCase();
        url = url.replace(/ /g, "-");
        url = url.replace(/\//g, "-");
        url = url.replace(/& /g, "");
        history.push("/" + url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  menuUI = (path) => {
    let auth = localStorage?.auth;
    let men = auth ? MenuItem : [];
    return men.map((a, i) => {
      return (
        <Menu.Item
          key={a.name}
          icon={a.icon}
          className={
            path.toLowerCase().includes(a.name.toLowerCase()) ||
            (path === "" && i === 0)
              ? "active"
              : ""
          }
        >
          {a.name}
        </Menu.Item>
      );
    });
  };
  closeCol = (a) => this.props.menuCol(a);
  render() {
    const { path } = this.state;
    const { collapsed } = this.props;
    return (
      <MenuStyle>
        <div className="mDiv">
          <div className="menuTop">
            <Image
              src={collapsed ? coffee : logo}
              width={collapsed ? 60 : 123}
              height={60}
              preview={false}
            />
          </div>
          <Menu
            mode="inline"
            onClick={this.setOpenKeys}
            inlineCollapsed={collapsed}
          >
            {this.menuUI(path)}
          </Menu>
        </div>
        <div className="dDiv" id="draw">
          <Drawer
            title={<Image src={logo} width={100} height={60} preview={false} />}
            placement="left"
            width={250}
            onClose={() => this.closeCol(!collapsed)}
            visible={collapsed}
            getContainer={() => document.getElementById("draw")}
          >
            <Menu
              mode="inline"
              onClick={(e) => {
                this.setOpenKeys(e);
                this.closeCol(!collapsed);
              }}
            >
              {this.menuUI(path)}
            </Menu>
          </Drawer>
        </div>
      </MenuStyle>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  menuCol: (payload) => dispatch(menuCol(payload)),
});
const mapStateToProps = (state) => ({ collapsed: state.app.collapsed });
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MenuComponent)
);
