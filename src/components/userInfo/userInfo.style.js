/* eslint-disable consistent-return */
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Users = styled.article`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;

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
  flex-grow: 1;
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
