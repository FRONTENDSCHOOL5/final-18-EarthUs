import styled, { keyframes } from "styled-components";

// * 타이틀 나타내기
const floatAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
`;

// * sayno 나타내기
const bounceInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(0px, 100px) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translate(0px, -50px) scale(1.2);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
    opacity: 1;
  }
`;

// * 전구 깜빡임
const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// * think 나타내기
const jumpAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(15px, 0px);
  }
  50% {
    transform: translate(15px, -30px);
  }
  100% {
    opacity: 1;
    transform: translate(15px, -20px);
  }
`;

// * 테두리 그리기
const strokeAnimation = keyframes`
  0% {
    stroke-dashoffset: 25%;
    stroke-dasharray: 0 50%;
    fill: rgba(142, 194, 138, 0);
    stroke: #ffc73c;
    stroke-width: 2;
  }
  70% {
    fill: rgba(142, 194, 138, 0);
    stroke: #ffc73c;
  }
  80% {
    fill: rgba(142, 194, 138, 0);
    stroke: #ffc73c;
  }
  100% {
    stroke-dashoffset: -25%;
    stroke-dasharray: 50% 0;
    stroke: #ffc73c;
    stroke-width: 0;
  }
`;

const SectionWrap = styled.section`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  text-align: center;
`;

const H2 = styled.h2`
  font-size: var(--font-size-title);
  color: var(--color-black);
  animation: ${floatAnimation} 1s ease-in-out;
  margin: 0 0 1rem;
`;

const P = styled.p`
  font-size: var(--font-size-xl);
  color: #333;
  opacity: 0;
  transform: translateY(50px);
  filter: blur(2px);
  animation: ${floatAnimation} 1s ease-in-out forwards;
  animation-delay: 0.4s;
`;

// * ImgSection 공통 스타일
const ImgSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 156.68px 0 104.05px 0;
`;

const ImgSectionOne = styled(ImgSection)`
  .sayno {
    position: absolute;
    transform: translate(0px, 0px);
    animation: ${bounceInAnimation} 1s ease forwards;
    animation-timing-function: cubic-bezier(0.85, -0.18, 0.14, 1.03);
    animation-delay: 1.7s;
    opacity: 0;
    animation-fill-mode: forwards;
  }

  .ani1 {
    animation: ${strokeAnimation} 1.5s 1 alternate;
  }
`;

const ImgSectionTwo = styled(ImgSection)`
  .light {
    opacity: 0;
    animation: ${blinkAnimation} 0.5s cubic-bezier(0.94, 0.04, 0.58, 1) 1;
    animation-delay: 3s;
    animation-fill-mode: forwards;
  }

  .green {
    transform: translate(0px, 10px);
  }
`;

const Bulb = styled.div`
  position: absolute;

  .think {
    position: absolute;
    opacity: 0;
    transform: translate(15px, -20px);
    animation: ${jumpAnimation} 1s;
    animation-delay: 1.8s;
    animation-fill-mode: forwards;
  }

  .ani1,
  .ani2,
  .ani3,
  .ani4,
  .ani5,
  .ani6,
  .ani7,
  .ani8,
  .ani9,
  .ani10,
  .ani11,
  .ani12,
  .ani13 {
    animation: ${strokeAnimation} 1.5s 1 alternate;
    animation-fill-mode: forwards;
  }
`;

export { SectionWrap, H2, P, ImgSectionOne, ImgSectionTwo, Bulb };
