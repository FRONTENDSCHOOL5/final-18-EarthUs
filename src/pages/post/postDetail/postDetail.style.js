import styled from "styled-components";

const Line = styled.div`
  margin-top: 36px;
  border-top: 1px solid var(--color-light);
  margin: 24px -16px;
`;

const CommentList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  scroll-margin-top: 80px;
`;

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

const CommentInput = styled.article`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  max-width: var(--size-max-width);
  width: 100%;
  margin-left: calc(-1 * var(--size-gap));
  padding: 8px var(--size-gap) 31px;
  background-color: var(--color-white);
  border-top: 1px solid var(--color-light);
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;

  input {
    flex-grow: 1;
  }

  button {
    flex-shrink: 0;
  }
`;

export { CommentList, Comments, Line, CommentInput };
