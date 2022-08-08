import styled from "styled-components";
import { size } from "App/device";

const DashbordStyle = styled.div`
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
      @media ${size["mobile-md-max"]} {
        display: block;
      }
      .title {
        color: #616161;
        margin-left: 0.5em;
      }
      .selectDiv {
        width: 15em;
        margin-left: auto;
        @media ${size["mobile-md-max"]} {
          margin-left: 0.7em;
        }
      }
    }
    .top-row-box {
      margin-top: 1em;
      .box {
        background: #ffffff;
        box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
        border-radius: 14px;
        margin-right: 10px;
        .ant-card-body {
          padding: 0;
          margin-bottom: 1em;
          display: flex;
          height: auto;
          .ant-image {
            margin-left: auto;
            @media ${size["laptop-max"]} {
              width: 50px;
            }
            .topImg {
              padding: 5px;
            }
          }
        }
        .content1 {
          margin: auto 0;
        }
        .number {
          font-weight: 700;
          margin: 0 0 0 10px;
          width: 5em;
          overflow: hidden;
          height: 1.5em;
        }
        .name {
          color: #797979;
          margin-left: 10px;
        }
      }
    }
    .middle-box {
      margin-top: 2em;
      box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
      border-radius: 14px;
      margin-left: 10px;
      .number {
        font-weight: bold;
      }
      .black-ground {
        border: 1px solid;
        height: 168px;
        margin-top: 10px;
      }
    }
    .ant-card-bordered {
      border: none;
    }
    .bottom-row-box {
      .ant-col {
        margin-top: 2em;
        .ant-card-body {
          padding: 1em;
        }
        .name {
          color: rgb(133 133 133);
        }
      }
      .box {
        box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
        border-radius: 14px;
        + .box {
          margin-left: 20px;
        }
        .pieInfoBox {
          display: flex;
          @media ${size["mobile-md-max"]} {
            display: block;
          }
          h2 {
            margin-bottom: 0;
            font-size: 16px;
            @media ${size["mobile-md-max"]} {
              margin-bottom: 10px;
            }
          }
          .mrleau {
            margin-left: auto;
            @media ${size["mobile-md-max"]} {
              margin-left: 0;
            }
            .text {
              @media ${size["laptop-sm-max"]} {
                margin: 2px 10px !important;
              }
              @media ${size["tablet-md-max"]} {
                :first-child {
                  margin-left: 0 !important;
                }
              }
            }
          }
        }
      }
    }
    .number {
      font-weight: bold;
      color: #ed3437;
    }
  }
`;
export { DashbordStyle };
