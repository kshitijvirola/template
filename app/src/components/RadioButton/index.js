import React, { Component } from "react";
import { Radio } from "antd";

import { RadiaWraper } from "./style";

export default class RadioButton extends Component {
  render() {
    const { data, value, checked, onClick } = this.props;
    return (
      <RadiaWraper>
        <Radio value={value} checked={checked} onClick={onClick}>
          {data}
        </Radio>
      </RadiaWraper>
    );
  }
}
