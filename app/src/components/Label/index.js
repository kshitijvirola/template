import React, { Component } from "react";
import { FormWrapper } from "./style";

class Label extends Component {
  render() {
    const { title, className } = this.props;
    return (
      <FormWrapper>
        <label className={className}>{title}</label>
      </FormWrapper>
    );
  }
}
Label.defaultProps = {
  title: "Label",
  className: "",
};
export default Label;
