import React, { Component } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Image } from "antd";
import { NavLink } from "react-router-dom";

import { FormWrapper } from "./style";
import { pen } from "components/Images";

class CustomDropdown extends Component {
  handleChange = (ele) => {
    const { name } = this.props;
    this.props.setFieldValue(name, ele);
  };
  list = (data) => {
    try {
      if (data && data.length > 0) {
        const { redirect, handleClick } = this.props;
        let UI = data.map((element, key) => (
          <Menu.Item key={key + 1}>
            {redirect ? (
              element.name.trim() !== "" && (
                <NavLink
                  to={"/chat/" + window.btoa(element.id)}
                  className="inside txtWrap"
                >
                  {element.name.trim()}
                </NavLink>
              )
            ) : handleClick ? (
              <div
                className="inside txtWrap"
                id={key + 1}
                onClick={handleClick}
              >
                {element}
              </div>
            ) : (
              <div className="inside txtWrap">{element}</div>
            )}
          </Menu.Item>
        ));
        return <Menu>{UI}</Menu>;
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { isBorder, data, defaultValue, dropDownClass, edit, arrow } =
      this.props;
    let dropClass = dropDownClass + (isBorder === true ? " setborder" : "");
    return (
      <FormWrapper className={dropClass}>
        <div id="form-dropdown">
          <Dropdown
            overlay={this.list(data)}
            trigger={["click"]}
            getPopupContainer={() => document.getElementById("form-dropdown")}
          >
            <span className="ant-dropdown-link inside txtWrap">
              {edit && (
                <Image preview={false} src={pen} className="insideimg" />
              )}
              {defaultValue ? defaultValue : "drop"}
              {arrow && <DownOutlined />}
            </span>
          </Dropdown>
        </div>
      </FormWrapper>
    );
  }
}
CustomDropdown.defaultProps = {
  placeholder: null,
  isText: false,
  arrow: true,
};
export default CustomDropdown;
