import styled, { createGlobalStyle, css } from "styled-components";

import camera from "../../../assets/images/camera.svg";

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
  justify-content: space-between;
  padding: 0 var(--size-gap);
  gap: 0.5rem;
  background-color: var(--color-white);
  border-top: 1px solid var(--color-light);
`;

export const TextInput = styled.input`
  width: 70%;
  flex: 1 0 0;

  &::placeholder {
    color: var(--color-dark);
    font-size: var(--font-size-xs);
  }
`;

export const Section = styled.section`
  position: relative;
  display: flex;
`;

export const ImgSection = styled.section`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  flex: 0 1 2.5rem;
  border-radius: 50%;
`;

export const ImgInput = styled.input`
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid #0ff;
`;

export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: var(--color-light);
  border-radius: 50%;
  ::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: url(${camera}) no-repeat center / 1.5rem;
    filter: invert(1);
  }
`;
