import styled from "styled-components";

const AppContainer = styled.div`
  height: 100vh;
  .form-error {
    color: red;
  }
  .txtWrap {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export { AppContainer };
