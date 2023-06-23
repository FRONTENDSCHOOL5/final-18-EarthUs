import styled, { css } from "styled-components";

import { NO_PROFILE_IMAGE } from "../../../utils/config";

const Avatars = styled.article`
  position: relative;
  background: var(--color-bg);
  width: ${props => (props.size === 40 ? "40px" : "64px")};
  height: ${props => (props.size === 40 ? "40px" : "64px")};
  border-radius: 50%;
  border: 1px solid var(--color-light);
  overflow: hidden;
  flex-shrink: 0;
`;

const Img = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${props =>
    props.src === NO_PROFILE_IMAGE &&
    css`
      width: 24px;
      height: 24px;
      object-fit: contain;
    `};
`;

export { Avatars, Img };

// ✅ Usage
// <Avatar profileImg={이미지 주소} size={40} />
// <Avatar profileImg={이미지 주소} size={64} />
