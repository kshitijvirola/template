import styled from "styled-components";
import { size } from "App/device";

const ReportStyle = styled.div`
  max-height: 100vh;
  overflow-y: auto;
  .displayDiv {
    padding: 2em;
    margin-top: 2em;
    @media ${size["tablet-md-max"]} {
      padding: 0.5em;
      margin-top: 3em;
    }
    .title {
      color: #616161;
      margin-left: 0.5em;
    }
    .ant-tabs {
      margin: 0.5em;
      @media ${size["tablet-md-max"]} {
        overflow-x: scroll;
      }
      .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #616161;
        font-weight: 600;
      }
      .ant-col {
        margin: 1em 0;
        .field {
          display: flex;
          @media ${size["tablet-md-max"]} {
            display: block;
          }
          .text {
            margin: 2px 2px;
            @media ${size["laptop-max"]} {
              margin: 2px 12px;
            }
          }
        }
        .loc-Btn {
          min-width: 100px;
          @media ${size["laptop-max"]} {
            min-width: 130px;
          }
        }
        .dowLoc {
          min-width: 65px;
          padding: 0;
          @media ${size["laptop-max"]} {
            min-width: 130px;
            padding: 0 20px;
          }
        }
      }
      .btn_end {
        display: flex;
        align-items: center;
        @media ${size["laptop-max"]} {
          justify-content: end;
        }
      }
      .downDiv {
        button {
          min-width: 100px;
          @media ${size["laptop-max"]} {
            margin-left: auto;
            margin-right: 15px;
            min-width: 130px;
          }
        }
        .icon_box {
          margin-left: 10%;
        }
        @media ${size["tablet-max"]} {
          .icon_box {
            margin-top: 0;
          }
        }
        @media ${size["laptop-max"]} {
          .icon_box {
            margin-left: 0;
            margin-right: 5px;
          }
        }
      }
      > .ant-tabs-nav .ant-tabs-tab-active,
      > div > .ant-tabs-nav .ant-tabs-tab-active {
        color: #1890ff;
        background: #e5e6ea;
      }
      .ant-tabs-content {
        padding: 0 1em;
      }
    }
    .hidden {
      height: 0;
      #form-datePicker,
      #form-select,
      .ant-select-selector,
      .ant-select,
      .ant-picker {
        height: 0;
        border: none;
      }
      .ant-picker {
        display: none;
      }
      .ant-picker-suffix,
      .ant-select-selector:after {
        display: none;
      }
    }
  }
`;

export { ReportStyle };
