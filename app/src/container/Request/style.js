import styled from "styled-components";
import { size } from "App/device";

const RequestStyle = styled.div`
  max-height: 100vh;
  overflow-y: auto;
  .displayDiv {
    padding: 2em;
    margin-top: 2em;
    @media ${size["tablet-md-max"]} {
      padding: 0.5em;
      margin-top: 3em;
    }
    .flex {
      display: flex;
      .title {
        // margin-left: 0.5em;
        font-weight: bolder;
        color: #757575;
      }
      .icon_box {
        @media ${size["tablet-max"]} {
          align-items: center;
          margin-top: 0;
        }
      }
    }
    .inputDiv .field,
    textarea {
      margin-left: 0.8em;
      margin-top: 1em;
    }
    .topmar {
      margin-top: 2em;
      &.join {
        display: flex;
        .countDiv span {
          margin: 0.5em;
        }
        .pridiv {
          margin-left: 6em;
          @media ${size["mobile-md-max"]} {
            margin-left: 3em;
          }
          .ant-checkbox-wrapper {
            margin-left: 40%;
            margin-top: 5px;
          }
        }
      }
      .empty {
        color: #e81c1c;
      }
    }
  }
`;
export default RequestStyle;
