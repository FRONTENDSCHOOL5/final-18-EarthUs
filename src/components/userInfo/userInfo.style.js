/* eslint-disable consistent-return */
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Users = styled.article`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;

  ${({ isSearch }) =>
    isSearch &&
    css`
      margin-bottom: 24px;
    `}

  mark::before,
  mark::after {
    clip-path: inset(100%);
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  mark::before {
    content: " [강조 시작] ";
  }

  mark::after {
    content: " [강조 끝] ";
  }

  .highlight {
    background-color: transparent;
    color: var(--color-primary);
  }

  div {
    flex-grow: 1;

    strong {
      font-size: var(--font-size-md);
      font-weight: normal;
    }

    p {
      font-size: var(--font-size-xs);
      color: var(--color-gray-76);
    }
  }

  button {
    flex-shrink: 0;
  }
`;

const UserHeader = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
  ${({ disabled }) => {
    if (disabled) {
      return css`
        pointer-events: none;
        cursor: auto;
      `;
    }
  }}
`;

export { Users, UserHeader };
