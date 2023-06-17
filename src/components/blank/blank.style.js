import styled from "styled-components";

import imgBlank from "../../assets/images/blank.svg";
import Button from "../common/button/Button";

const Notice = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  padding-top: 240px;
  font-size: var(--font-size-xl);
  background: url(${imgBlank}) no-repeat top center;
`;

const SearchButton = styled(Button)`
  bottom: 6.5rem;
`;

export { Notice, SearchButton };
