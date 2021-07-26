import styled from "styled-components";
import { arrowdown } from "components/Images";
import { Theme } from "App/theme";

const SelectContainer = styled.div`
  height: 2.4em;
  width: 100%;
  .ant-select {
    height: 24px;
    width: inherit;
    .ant-select-selection-search {
      height: 24px;
    }
    .ant-select-selection-search-input {
      height: 24px !important;
    }
    .ant-select-selector {
      width: -webkit-fill-available;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      height: 2.25em;
      :before {
        border: 0;
        background-size: 100% auto;
        width: 15px;
        height: 15px;
        position: absolute;
        content: "";
        top: 35%;
        z-index: 1;
      }
      :after {
        background: url(${arrowdown}) no-repeat center;
        visibility: visible;
        border: 0;
        background-size: 100% auto;
        width: 9px;
        height: 8px;
        position: absolute;
        content: "";
        right: 5px;
        top: 50%;
        z-index: 1;
        transform: translate(0, -50%);
        -webkit-transform: translate(0, -50%);
        -moz-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
      }
    }
  }
  .ant-select-item-option-content {
    color: ${Theme.mainColor};
  }
  .empty {
    .ant-select-selector {
      border: 1px solid #e81c1c;
    }
  }
  &.default {
    .ant-select .ant-select-selector {
      height: 30px;
      background: ${Theme.baseColor};
      border-radius: 5px;
      color: #c1c1c1;
    }
  }
`;
export { SelectContainer };
