import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const FormWrapper = styled.div`
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  .ant-input-affix-wrapper {
    border: 0;
    padding: 0;
    border-bottom: 1px solid ${Theme.mainColor};
    box-shadow: none;
    border-radius: 0;
  }
  .ant-input-prefix {
    margin-right: 5px;
  }
  input {
    display: block;
    width: 100%;
    line-height: 1.5;
    margin: 0;
    -webkit-appearance: none;
    background: #fff;
    border: 0;
    height: 34px;
    font-size: 15px;
    font-weight: 300;
    padding: 10px 30px;
    color: ${Theme.mainColor};
    font-family: "Rubik", sans-serif;
    ::placeholder {
      color: ${Theme.mainColor};
    }
    :-ms-input-placeholder {
      color: ${Theme.mainColor};
    }
    ::-ms-input-placeholder {
      color: ${Theme.mainColor};
    }
    :hover,
    :focus {
      outline: none;
    }
    @media ${size["desktop-sm-max"]} {
      font-size: 13px;
      padding: 5px 10px;
    }
    @media ${size["tablet-max"]} {
      font-size: 14px;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

export { FormWrapper };
