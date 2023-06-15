import styled from "styled-components";

import iconAvatar from "../../../assets/images/user.svg";

const Avatars = styled.article`
  position: relative;
  background: var(--color-bg);
  width: ${props => (props.size === 40 ? "40px" : "64px")};
  height: ${props => (props.size === 40 ? "40px" : "64px")};
  border-radius: 50%;
  border: 1px solid var(--color-light);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: url(${iconAvatar}) no-repeat center/1.5rem;
    filter: invert(100%) sepia(75%) saturate(803%) hue-rotate(263deg)
      brightness(126%) contrast(67%);
  }

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Avatars;

// ✅ Usage
// <Avatar profileImg={이미지 주소} size={40} />
// <Avatar profileImg={이미지 주소} size={64} />
