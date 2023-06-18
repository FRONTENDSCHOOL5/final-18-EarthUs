/* eslint-disable no-unused-vars */
import styled, { keyframes, css } from "styled-components";

// Define keyframes for animations
const slideUp = keyframes`
  from {
    transform: translateY(100%); // start from the bottom
  }
  to {
    transform: translateY(0); // end at the current position
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0); // start from the current position
  }
  to {
    transform: translateY(100%); // end at the bottom
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Dialog = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 2px 40px rgba(0, 0, 0, 0.15);
  padding: 2rem 0 0;
  text-align: center;
  position: relative;
  color: var(--color-black);
  backdrop-filter: blur(4px);
  z-index: 1000;
  h2 {
    font-size: var(--font-size-xl);
  }
  p {
    margin: 0 0 0.5rem;
    font-size: var(--font-size-md);
    color: var(--color-gray-76);
  }

  /* Apply animation based on type of modal */
  ${({ type }) => {
    switch (type) {
      case "confirm":
        return css`
          width: min(80%, 18rem);
          animation: ${props => (props.open ? fadeIn : fadeOut)} 0.25s ease-out;
          > :not(div) {
            padding: 0 0 0.75rem;
          }
          div {
            width: 100%;
            display: flex;
            gap: 0;
            border-top: 1px solid var(--color-light);
            button {
              flex: 1 0 0;
              padding: 0.75rem 0;
              font-size: var(--font-size-md);
              + button {
                border-left: 1px solid var(--color-light);
              }
              &:last-of-type {
                color: var(--color-primary);
              }
            }
          }
        `;
      case "bottomSheet":
        return css`
          position: fixed;
          bottom: 0;
          margin: 0 calc(var(--size-gap) * -1);
          width: min(100%, var(--size-max-width));
          padding: 1rem 0;
          border-radius: 12px 12px 0 0;
          animation: ${props => (props.open ? slideUp : slideDown)} 0.25s
            ease-out;
          h2 {
            margin: 2rem 0 0;
          }
          p {
            margin: 1rem 0 0;
          }
          div {
            padding: 1rem 0;
            button {
              width: 100%;
              display: block;
              padding: 1rem;
              :hover {
                background: var(--color-light);
              }
            }
          }
          &::before {
            content: "";
            position: absolute;
            width: 50px;
            height: 4px;
            top: 1rem;
            left: 50%;
            transform: translate(-50%);
            background: var(--color-light);
            border-radius: 4px;
          }
        `;
      default:
        return "";
    }
  }}
`;

export { ModalContainer, Dialog };
