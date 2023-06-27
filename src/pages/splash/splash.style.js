import styled from "styled-components";

const SplashBg = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(100%, var(--size-max-width));
  height: 100vh;
  background-color: var(--color-tertiary);
`;

const ImgWrap = styled.div`
  position: relative;
  top: 30vh;
  width: fit-content;
  margin: 0 auto;
`;

const LogoNameImg = styled.img`
  animation: fadein 2s linear;
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const EarthImg = styled.img`
  position: absolute;
  right: 4px;
  bottom: 4px;
  animation: rotation 4s ease-in-out;
  @keyframes rotation {
    0% {
      opacity: 0;
      transform: translateX(200%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%) rotate(-360deg);
    }
  }
`;

export { SplashBg, ImgWrap, LogoNameImg, EarthImg };
