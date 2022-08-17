import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";

const MenuStyle = styled.div`
  padding: 5px;
  height: 100vh; 
  .dDiv {
    display: none;
  }
  @media ${size["tablet-sm-max"]} {
  padding: 0;
  .mDiv {
      display: none;
    }
    .dDiv {
      display: block;
    }
  }
  .menuTop {
    display: flex;
    padding: 0 1.5em;
    align-items: center;
    margin: 5px 0;
    .anticon {
      font-size: 14px;
      color: #acb4ba;
    }
    h2 {
      margin-left: 10px;
      margin-bottom: 0;
    }
  }
  .ant-menu-inline {
    border-right: none;
  }
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: none;
    padding: 0.5em 1em;
    .ant-menu-item {
      font-size: 16px;
      &.active {
        border-radius: 2em;
      }
      :hover {
        background: #ebeef0;
        border-radius: 10px;
        color: black;
      }
    }
    .active {
      background: #ebeef0;
      border-radius: 10px;
    }
  }
  .active,
  .ant-menu-item-selected {
    background: #ebeef0;
    border-radius: 10px;
  }
  .ant-menu-item:hover,
  .ant-menu-item-active,
  .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
  .ant-menu-submenu-active,
  .ant-menu-submenu-title:hover {
    color: #9fa4a6;
  }
  .ant-menu-title-content {
    color: #9fa4a6;
    font-weight: 700;
  }
`;
export { MenuStyle };
