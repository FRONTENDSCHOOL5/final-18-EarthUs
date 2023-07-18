import styled, { css } from "styled-components";

export const Img = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;

  ${({ hasError }) =>
    hasError &&
    css`
      width: 100px;
      height: 90px;
      object-fit: contain;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `}
`;

export default Img;
