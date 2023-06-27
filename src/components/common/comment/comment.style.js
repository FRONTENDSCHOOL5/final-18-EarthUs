import styled from "styled-components";

const Comments = styled.article`
  display: flex;
  gap: 8px;
  align-items: flex-start;

  div {
    flex-grow: 1;

    strong {
      font-size: var(--font-size-md);
      font-weight: normal;
    }

    span {
      margin-left: 6px;
      font-size: var(--font-size-micro);
      color: var(--color-gray-76);
    }

    p {
      font-size: var(--font-size-sm);
      color: var(--color-gray-46);
    }
  }

  button {
    flex-shrink: 0;
  }
`;

export default Comments;
