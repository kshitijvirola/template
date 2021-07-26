import React, { Component } from "react";
import { Select } from "antd";

import { SelectContainer } from "./style";

const { Option } = Select;

class FormSelect extends Component {
  getOptions = () => {
    try {
      const { data, withID } = this.props;
      if (data && data.length > 0) {
        if (withID) {
          let dArray = data.sort((a, b) => a.value.localeCompare(b.value));
          return dArray.map((l, i) => {
            return (
              l.value &&
              l.id && (
                <Option value={l.value} key={i} id={l.id}>
                  {l.value}
                </Option>
              )
            );
          });
        } else
        let dArray2 = data.sort((a, b) => a.localeCompare(b));
          return dArray2.map((a, i) => {
            return (<Option value={a} key={i}>{a}</Option>);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { id, onChange, selectClass, defaultValue, className } = this.props;
    return (
      <SelectContainer id={id ? id : "form-dropdown"} className={className}>
        <Select
          showSearch
          defaultActiveFirstOption
          showArrow={false}
          defaultValue={defaultValue}
          optionFilterProp="children"
          onChange={onChange}
          dropdownClassName="dropdown-custom"
          className={`select-custom ${selectClass ? selectClass : ""}`}
          filterSort={(a, b) => a.value.localeCompare(b.value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          getPopupContainer={() =>
            document.getElementById(id ? id : "form-dropdown")
          }
          dropdownRender={(mountNode, prop) => {
            return (
              <div className="dropdown-section">
                <div>{mountNode}</div>
              </div>
            );
          }}
        >
          {this.getOptions()}
        </Select>
      </SelectContainer>
    );
  }
}
FormSelect.defaultProps = {
  placeholder: null,
  className: "",
  disabled: false,
};
export default FormSelect;
