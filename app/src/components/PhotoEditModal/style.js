import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";

const ModalContainer = styled.div`
  .ant-modal-content {
    border-radius: 10px;
    @media ${size["tablet-sm-max"]} {
      margin: 5%;
    }
    .ant-modal-close {
      display: none;
    }
    .ant-modal-body {
      padding: 1rem;
      b {
        font-size: large;
      }
      .imgDiv {
        margin: 1rem;
        margin-left: 35%;
        width: 150px;
        height: 150px;
        border-radius: 100%;
        position: relative;
        @media ${size["laptop-max"]} {
          width: 120px;
          height: 120px;
        }
        @media ${size["tablet-sm-max"]} {
          width: 80px;
          height: 80px;
        }
        img {
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
        span.icon {
          position: absolute;
          top: 110px;
          right: 0;
          background: ${Theme.mainColor};
          border-radius: 100%;
          width: 35px;
          height: 35px;
          line-height: 35px;
          vertical-align: middle;
          text-align: center;
          color: #0000ff;
          font-size: 14px;
          cursor: pointer;
          @media ${size["laptop-max"]} {
            top: 90px;
            width: 30px;
            height: 30px;
            line-height: 30px;
          }
          @media ${size["tablet-sm-max"]} {
            top: 60px;
            width: 25px;
            height: 25px;
            line-height: 25px;
          }
          .ant-image img {
            border-radius: 0;
          }
        }
        .ant-avatar-lg {
          width: 100%;
          height: 100%;
        }
        .anticon-delete {
          color: #fff;
        }
      }
      .dragDrop {
        margin: 5% 0;
        .ant-tooltip {
          display: none;
        }
        .ant-upload.ant-upload-drag {
          border: 2px dashed ${Theme.mainColor};
        }
        .ant-upload.ant-upload-drag p.ant-upload-text {
          color: rgb(163 166 190);
          font-size: 15px;
          img {
            width: 5rem;
            @media ${size["tablet-sm-max"]} {
              width: 3rem;
            }
          }
        }
      }
      .btnDiv {
        margin-left: auto;
        width: fit-content;
        button {
          min-width: auto;
        }
      }
      .btmDiv {
        font-size: smaller;
        color: #141b5a;
      }
    }
  }
  .anticon-question-circle {
    color: #ff4d4f !important;
  }
`;
export { ModalContainer };
