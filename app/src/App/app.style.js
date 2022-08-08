import styled, { createGlobalStyle } from "styled-components";
import { size } from "App/device";
import { Theme } from "./theme";

export const AppContainer = styled.div`
  height: 100vh;
  .txtWrap {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .btnDiv {
    margin-top: 2em;
    button {
      margin-left: auto;
      display: block;
      border-radius: 10px;
      span {
        margin-right: 5px;
      }
    }
    .nextDiv {
      display: flex;
      button + button {
        margin-left: 1em;
      }
    }
    @media ${size["tablet-md-max"]} {
      margin-top: 1em;
      button {
        margin: auto;
      }
    }
  }
  .icon_box {
    display: flex;
    margin-left: auto;
    @media ${size["tablet-max"]} {
      margin-top: 1.5em;
    }
    .set_icon_box {
      width: 2.5em;
      height: 29px;
      box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      + .set_icon_box {
        margin-left: 1em;
      }
      .ant-image-img {
        height: 20px;
        width: 25px;
        margin: 5px;
      }
    }
  }
  .midel_content {
    .ant-empty {
      margin: 0 0;
      padding: 30px 0;
      box-shadow: 0px 0px 7px rgb(0, 0, 0, 0.15);
      border-radius: 10px;
    }
  }
  .printDiv {
    margin: 0.5em;
    .ant-table-content table {
      // width: 500px;
      border-spacing: 0 0px;
      .ant-table-tbody tr {
        box-shadow: none;
        border-radius: 0px;
      }
    }
    .ant-table-column-sorter {
      display: none;
    }
  }
  iframe {
    width: 100vw;
  }
  .none {
    opacity: 0;
  }
  .develope {
    by: Kshitij;
  }
`;
const GlobalStyle = createGlobalStyle`
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: transparent;
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    margin:5px;
    width: 7px; 
    height: 1px;
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: ${Theme.baseColor};
  }
  .form-error {
    color: red;
  }
  .pointer {
    cursor: pointer;
  } 
  .wb {
    word-break: break-all;
  }
  .ant-spin {
    min-height:60vh;
  }
  button[disabled] {
    opacity: 0.5;
  }
  .ant-select-selection-search-input {
    color: black;
  }
  .ant-empty{
    padding: 10px 0 !important;
    .ant-empty-image{
      height: 60px;
    }
  }
  // .ant-modal-confirm {
  //   @media ${size["mobile-md-max"]}{
  //     // width: 250px !important;
  //   }
  //   .ant-modal-body{
  //     @media ${size["mobile-md-max"]}{        
  //       padding: 10px !important;
  //     }
  //     .ant-modal-confirm-content{
  //       @media ${size["mobile-md-max"]}{        
  //         margin-left: 20px !important;
  //       }
  //     }
  //   }
  //   .ant-modal-confirm-btns{
  //     @media ${size["mobile-md-max"]}{
  //       // margin-right: px;        
  //     }
  //   }
  // }
  .anime{
    opacity: 0;
    position: relative;
    animation: anime-animation 0.4s ease-in-out 0.33333s;
    animation-fill-mode: forwards;
    transform: translateX(50px);     
  }
  @-webkit-keyframes anime-animation {
    to {
      opacity: 1;
      transform: translatex(0);
    }
  }
  @keyframes anime-animation {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .anime:first-child{
    animation-delay: .1s;
  }
  .anime:nth-child(2){
    animation-delay: .2s;
  }
  .anime:nth-child(3){
    animation-delay: .3s;
  }
  .anime:nth-child(4){
    animation-delay: .4s;
  }
  .anime:nth-child(5){
    animation-delay: .5s;
  }
  .anime:nth-child(6){
    animation-delay: .6s;
  }
  .anime:nth-child(7){
    animation-delay: .7s;
  }
  .anime:nth-child(8){
    animation-delay: .8s;
  }
  .anime:nth-child(9){
    animation-delay: .9s;
  }
  .anime:nth-child(10){
    animation-delay: .91s;
  }
  .anime:nth-child(11){
    animation-delay: .92s;
  }
  .anime:nth-child(12){
    animation-delay: .93s;
  }
  .anime:nth-child(13){
    animation-delay: .94s;
  }
  .anime:nth-child(14){
    animation-delay: .95s;
  }
  .anime:nth-child(15){
    animation-delay: .96s;
  }
  .anime:nth-child(16){
    animation-delay: .97s;
  }
  .anime:nth-child(17){
    animation-delay: .98s;
  }
  .anime:nth-child(18){
    animation-delay: .99s;
  }
  .anime:nth-child(19){
    animation-delay: .991s;
  }
  .anime:nth-child(20){
    animation-delay: .992s;
  }
  .highZ{z-index: 22;}
  .highZ2{z-index: 20;}
`;
export default GlobalStyle;
export const PageStyle = styled.div`
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
      margin-left: 0.7em;
      margin-top: 10px;
      display: flex;
      @media ${size["tablet-max"]} {
        display: block;
      }
      .search {
        position: relative;
        display: flex;
        width: 13rem;
        @media ${size["tablet-max"]} {
          width: auto;
        }
        .ant-input-affix-wrapper {
          box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.15);
          border-radius: 10px;
          input {
            border-radius: 10px;
          }
        }
        .ant-input-affix-wrapper:hover {
          border-color: #ffff;
        }
      }
    }
    .ant-layout-header {
      margin-top: 10px;
      padding: 0;
      background: #f1f5f8;
    }
    .midel_content {
      margin: 2rem 0.5rem 5px;
      @media ${size["tablet-max"]} {
        margin: 0.5rem;
      }
      .panelSet {
        display: flex;
        h3 {
          margin-bottom: 0;
        }
        .edite {
          margin-left: auto;
          margin-right: 10px;
          height: 20px;
        }
      }
      .panel_box {
        .ant-col {
          margin-top: 1em;
        }
      }
    }
  }
`;
export const AddEditStyle = styled.div`
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
    .editImgDiv {
      display: flex;
      justify-content: center;
      .editImg {
        top: 7em;
        right: 2em;
        width: 2.6em;
        position: relative;
        cursor: pointer;
        @media ${size["tablet-md-max"]} {
          width: 2em;
        }
      }
    }
    .inputDiv {
      margin: 2em 10px 10px;
      .field {
        margin-top: 1em;
      }
    }
    .status {
      text-align: center;
      margin-right: 2em;
      font-size: 16px;
    }
  }
`;
