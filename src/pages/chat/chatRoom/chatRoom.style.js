import { createGlobalStyle, css } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${props =>
    props.chatRoom &&
    css`
      html body #root {
        background-color: #efefef;
      }
    `}
`;

export const MessageSection = styled.section`
  position: fixed;
  bottom: 0;
  height: 56px;
  z-index: 1000;
  max-width: var(--size-max-width);
  width: 100%;
  margin-left: calc(-1 * var(--size-gap));
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--color-white);
  border-top: 1px solid var(--color-light);
`;

export const TextInput = styled.input`
  width: 70%;
  margin-left: 36px;

  &::placeholder {
    color: var(--color-dark);
    font-family: "LINE Seed KR";
    font-size: var(--font-size-xs);
  }
`;

export const Section = styled.section`
  position: relative;
  display: flex;
`;

export const ImgSection = styled.section`
  position: relative;
`;

export const ImgInput = styled.input`
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

export const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 20px;
  z-index: 2;
`;

export const ImgAddBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 20px;
  background-color: var(--color-light);
`;

export const ImgBtn = styled.img`
  &.cameraIcon {
    filter: invert(95%) sepia(0%) saturate(0%) hue-rotate(140deg)
      brightness(104%) contrast(107%);
  }
`;
