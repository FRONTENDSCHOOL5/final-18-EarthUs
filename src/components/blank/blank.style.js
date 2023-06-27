import styled from "styled-components";

import imgBlank from "../../assets/images/blank.svg";

const BlankWrap = styled.div`
  > p {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    padding: 240px var(--size-gap) 0;
    font-size: var(--font-size-xl);
    background: url(${imgBlank}) no-repeat center/50%;
    text-align: center;
  }
`;

export default BlankWrap;
