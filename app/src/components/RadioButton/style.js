import styled from "styled-components";
import { Theme } from "App/theme";

const RadiaWraper = styled.div`
  width: 100%;
  .ant-radio-wrapper {
    display: flex;
    .ant-radio {
      height: fit-content;
    }
    .ant-radio-checked .ant-radio-inner {
      border-color: ${Theme.mainColor};
      :after {
        background-color: ${Theme.mainColor};
      }
    }
  }
`;

export { RadiaWraper };
