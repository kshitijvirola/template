import styled from "styled-components";
import { size } from "App/device";

const LoginStyle = styled.div`
  min-height: 100vh;
  .ant-row,
  .ant-col {
    height: 100vh;
  }
  .ant-row {
    @media ${size["tablet-max"]} {
      height: unset;
      background: linear-gradient(354.97deg, #ed3437 -4.39%, #f89c32 123.56%);
    }
  }
  .titleDiv {
    background: linear-gradient(354.97deg, #ed3437 -4.39%, #f89c32 123.56%);
    padding: 10% 0;
    text-align: center;
    @media ${size["tablet-max"]} {
      background: transparent;
      height: 24vh;
      padding: 5% 0 0;
      .ant-image {
        width: 20em;
      }
    }
    @media ${size["tablet-sm-max"]} {
      padding: 8% 0 0;
    }
    .logo {
      @media ${size["desktop-mm-max"]} {
        padding: 0 10%;
      }
      @media ${size["tablet-max"]} {
        padding: 0 5%;
      }
    }
    .head {
      margin-top: 2em;
      margin-bottom: 0;
      font-weight: bold;
      font-size: 30px;
      text-align: center;
      color: #ffffff;
      @media ${size["tablet-max"]} {
        margin-top: 0;
        font-size: 20px;
      }
    }
    .detail {
      padding: 0 25%;
      font-weight: 100;
      font-size: 17px;
      text-align: center;
      color: #ffffff;
      display: block;
      @media ${size["tablet-max"]} {
        font-size: 14px;
        display: none;
      }
    }
  }
  .logDiv {
    text-align: center;
    color: #616161;
    @media ${size["tablet-max"]} {
      height: 76vh;
    }
    .box {
      margin: auto;
      margin-top: 22%;
      padding-top: 0.7em;
      width: 55%;
      background: #ffffff;
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.15);
      border-radius: 1em;
      @media ${size["laptop-md-max"]} {
        margin-top: 20%;
        width: 60%;
      }
      @media ${size["laptop-max"]} {
        width: 65%;
      }
      @media ${size["tablet-max"]} {
        margin-top: 2%;
        width: 55%;
      }
      @media ${size["tablet-sm-max"]} {
        width: 70%;
      }
      @media ${size["mobile-md-max"]} {
        width: 80%;
      }
      .head {
        font-weight: bold;
        font-size: 30px;
        text-align: center;
      }
      .red {
        color: red;
      }
      .inputDiv {
        margin: 2em;
        .ant-input,
        .ant-input-suffix {
          margin-left: 0;
          background-color: #e5e6ea;
        }
        input {
          border-radius: 5px 5px 0 0;
          color: #616161;
          font-size: 15px;
          font-weight: 500;
          box-shadow: none !important;
        }
        .ant-input-password {
          box-shadow: none !important;
          border-radius: 0 0 5px 5px !important;
          .ant-input-suffix {
            border-radius: 0 0 5px 0;
          }
          input {
            border-radius: 0 0 0 5px !important;
          }
          &.empty {
            margin-top: 1px;
            border-radius: 0 0 5px 5px;
          }
        }
        .bt {
          border-bottom: 0.76px solid #b5b5b5;
        }
      }
      .submit-box .submit {
        height: 2.3em;
        border-radius: 5px;
        font-size: 1.3em;
        @media ${size["laptop-max"]} {
          margin: 0 -0.5em;
        }
      }
      .bottomDiv {
        padding: 2em;
        display: flex;
        .forgot {
          color: #616161;
          margin-left: auto;
          @media ${size["laptop-max"]} {
            margin-left: 1em;
          }
        }
      }
      .last-box {
        background: #f89c32;
        height: 1em;
        box-shadow: 0 7px 7px rgba(0, 0, 0, 0.15);
        border-radius: 0 0 5px 8px;
      }
    }
  }
`;
export { LoginStyle };
