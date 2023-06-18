import styled from "styled-components";

const ProdDetailWrap = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  h2 {
    font-size: 1.5rem;
    flex: 1 0 100%;
  }
  > div {
    flex: 0 1 calc(50% - 0.5rem);
  }
  p {
    > span {
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      min-height: 3rem;
    }
  }
  button + button {
    margin: 0 0 0 0.25rem;
  }
`;

export default ProdDetailWrap;
