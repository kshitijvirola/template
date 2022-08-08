import styled from "styled-components";
import { size } from "App/device";

const DashboardStyle = styled.div`
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
    .headDiv {
      margin-top: 10px;
      display: flex;
      .button_box {
        margin-left: auto;
        margin-right: 10px;
      }
    }
    .midel_content {
      margin: 2rem 0.5rem 5px;
      @media ${size["tablet-max"]} {
        margin: 0.5rem;
      }
      .panelSet {
        display: flex;
        .completed_box {
          height: 25px;
          min-width: 80px;
          margin-left: auto;
          text-align: center;
          border-radius: 6px;
          background: #ed3437;
          line-height: 1.5rem;
          font-weight: 600;
          color: #ffff;
        }
        .edite {
          margin-left: auto;
          margin-right: 10px;
          height: 20px;
        }
        .margleft {
          margin-right: 10px;
          height: 20px;
        }
        .content {
          display: flex;
          width: 80%;
          @media ${size["laptop-max"]} {
            display: block;
          }
          .dynamic_cont {
            max-width: 40em;
            padding-left: 5%;
            @media ${size["laptop-max"]} {
              padding-left: 0;
            }
            @media ${size["laptop-sm-max"]} {
              width: 100%;
              padding-left: 0;
            }
          }
        }
      }
      .panel_box {
        display: flex;
        @media ${size["laptop-sm-max"]} {
          display: block;
        }
        &.current .field + .field {
          margin-left: 1em;
          @media ${size["laptop-sm-max"]} {
            margin-left: 0;
          }
        }
        .time-data {
          padding-left: 5%;
          @media ${size["laptop-sm-max"]} {
            padding-left: 0;
          }
        }
      }
      .timeDiv {
        display: flex;
        text-align: center;
        .min {
          margin: 0 1em;
          h1 {
            border-left: 1px solid #ebebeb;
            border-right: 1px solid #ebebeb;
          }
        }
        h1 {
          color: #8d8b8b;
        }
      }
      .colbtn button {
        margin: 1em 0.5em 0 0;
        min-width: 80px;
      }
    }
    .field {
      display: flex;
      @media ${size["tablet-sm-max"]} {
        display: block;
      }
      label,
      p {
        margin: 0 0 0.5em;
        font-size: 14px;
      }
      .wl-7 {
        width: 7em;
      }
      .bold {
        font-weight: bold;
      }
      .weight {
        font-weight: 600;
      }
      .red {
        color: #ed3437;
      }
      .grey {
        color: #b5b5b5;
      }
      .brown {
        color: #ab5c00;
      }
      .blue {
        color: #2142e2;
      }
      .green {
        color: #028a0f;
      }
      .purple {
        color: #d800ff;
      }
      .grn {
        color: #69b985;
      }
      .orange {
        color: #f89c32;
      }
      .brdy {
        color: #616161;
      }
    }
    .current .field {
      @media ${size["tablet-sm-max"]} {
        display: flex;
      }
    }
    &.panDiv {
      margin-bottom: 2em;
      @media ${size["tablet-sm-max"]} {
        .field {
          display: block;
          margin-bottom: 1.5em;
        }
        label,
        p,
        button {
          font-size: 1.5em;
        }
      }
    }
  }
`;
export { DashboardStyle };
