import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const FormWrapper = styled.div`
  margin: 0;
  position: relative;
`;

const FormItem = styled.div`
  margin-top: 20px;
  @media ${size["tablet-md-max"]} {
    margin-top: 10px;
  }
`;
const FormGroup = styled.div`
  position: relative;
  padding: 0;
`;
const EditPhotoStyle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  position: relative;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  span.icon {
    position: absolute;
    top: 100px;
    right: 0;
    background: ${Theme.mainColor};
    border-radius: 100%;
    width: 40px;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    text-align: center;
    color: #0000ff;
    font-size: 14px;
    cursor: pointer;
    .ant-image img {
      border-radius: 0;
    }
  }
  .ant-avatar-lg {
    width: 100%;
    height: 100%;
  }
`;

export { FormWrapper, FormItem, FormGroup, EditPhotoStyle };
