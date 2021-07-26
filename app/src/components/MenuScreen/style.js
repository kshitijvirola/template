import styled from "styled-components";

const MenuContainer = styled.div`
  width: 4rem;
  padding: 0 15%;
  margin-top: 40%;
  display: grid;
  .iconAvatar {
    background-color: #6cc5cb;
    margin-bottom: 20%;
  }
  .selectedDiv {
    background-color: rgb(108, 197, 203);
    border-radius: 50%;
    padding: 3px;
    margin: 5px;
    width: 30px;
    margin-bottom: 9px;
  }
  .selectedimg {
    margin-left: 25%;
  }
  .icon {
    margin: 10px 12px;
    color: #6cc5cb;
  }
  .bottomIcon {
    bottom: 5rem;
    position: absolute;
    margin-left: 10px;
  }
  .settingIcon {
    bottom: 2rem;
    position: absolute;
    margin-left: 10px;
  }
  .selectedDiv.bottomIcon,
  .selectedDiv.settingIcon {
    margin: 0 5px;
  }
  .anticon.anticon-question-circle {
    color: #ff4d4f;
  }
`;

export { MenuContainer };
