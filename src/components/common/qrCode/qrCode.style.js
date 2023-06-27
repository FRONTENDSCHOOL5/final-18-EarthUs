import styled from "styled-components";

import qrcode from "../../../assets/images/qrcode.svg";

const QrCodeWrap = styled.aside`
  position: fixed;
  right: calc(50% - var(--size-max-width) - 3rem);
  top: 50%;
  width: 15rem;
  height: 15rem;
  z-index: 100;
  transform: translateY(-50%);
  background: url(${qrcode}) no-repeat center top / contain;
  @media (max-width: 1140px) {
    display: none;
  }
`;

export default QrCodeWrap;
