import styled from "styled-components";

const Users = styled.article`
  display: flex;
  gap: 8px;
  justify-content: space-between;

  a {
    display: flex;
    gap: 8px;
    flex-grow: 1;
  }

  div {
    flex-grow: 1;

    strong {
      font-size: var(--font-size-md);
      font-weight: normal;
    }

    p {
      font-size: var(--font-size-xs);
    }
  }
`;

export default Users;
