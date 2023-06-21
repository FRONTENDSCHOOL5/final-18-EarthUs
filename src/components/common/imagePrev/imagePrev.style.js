import styled from "styled-components";

import close from "../../../assets/images/close.svg";

const ImgPrevWrap = styled.div`
  flex-basis: 1 0 100%;
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  position: relative;
  background: var(--color-bg);
  border: 1px solid var(--color-light);
  border-radius: 0.5rem;
  overflow: hidden;

  img {
    width: 100%;
    display: inline-block;
    aspect-ratio: 1/1;
    object-fit: cover;
  }

  button {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    position: absolute;
    right: 0;
    top: 0;
    background: url(${close}) no-repeat center/1.5rem;
    filter: invert(0.5);
  }
`;

export default ImgPrevWrap;
