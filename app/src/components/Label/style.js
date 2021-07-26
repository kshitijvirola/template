import styled from "styled-components";
import { Theme } from "../../App/theme";
const FormWrapper = styled.div`
  & label {
    font-size: 13px;
    font-weight: 500;
    color: ${Theme.mainColor};
    letter-spacing: 0.05em;
    line-height: 15px;
    display: block;
  }
`;
export { FormWrapper };
