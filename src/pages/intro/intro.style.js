import styled from "styled-components";

const LogoImg = styled.img`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SignWrap = styled.section`
  position: fixed;
  bottom: 76px;
  left: 50%;
  transform: translateX(-50%);
`;

const P = styled.p`
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-gray-76);
`;

const ButtonList = styled.ul`
  margin: 24px 0;

  li {
    display: flex;
    gap: 8px;
    justify-content: center;
  }

  button {
    width: 64px;
    height: 64px;
    border-radius: 50%;

    &:nth-child(1) {
      background-color: #fde500;

      img {
        filter: invert(12%) sepia(13%) saturate(1767%) hue-rotate(314deg)
          brightness(91%) contrast(95%);
      }
    }
    &:nth-child(2) {
      background-color: #4285f4;

      img {
        filter: invert(98%) sepia(5%) saturate(861%) hue-rotate(217deg)
          brightness(115%) contrast(100%);
      }
    }
    &:nth-child(3) {
      background-color: #000;
    }
  }
`;

const Links = styled.div`
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-gray-46);
  position: relative;

  a:nth-child(1)::after {
    content: "|";
    margin-left: 8px;
  }
  a:nth-child(2) {
    margin-left: 8px;
  }
`;

export { LogoImg, SignWrap, P, ButtonList, Links };
