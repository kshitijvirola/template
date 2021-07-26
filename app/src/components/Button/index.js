import React, { Component } from "react";
import { Button } from "./style";
import { Theme } from "App/theme";

const ButtonConstant = {
  primary: { background: Theme.mainColor, color: "#fff" },
  secondary: { background: "#e2e2e2", color: Theme.mainColor },
  answer: { background: "green", color: "#fff" },
  decline: { background: "red", color: "#fff" },
};
class FormButton extends Component {
  render() {
    const { children, htmlType, color, onClick, className, disabled } =
      this.props;
    return (
      <Button
        bgcolor={ButtonConstant[color]}
        type={htmlType}
        onClick={onClick}
        className={className}
        disabled={disabled ? disabled : false}
      >
        {children}
      </Button>
    );
  }
}
FormButton.defaultProps = {
  text: "Button",
  color: "primary",
  htmlType: "button",
  className: "",
  handleClick: () => {},
};
export default FormButton;
