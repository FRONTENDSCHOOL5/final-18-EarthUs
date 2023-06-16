import styled from "styled-components";

const Headers = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  max-width: var(--size-max-width);
  width: 100%;
  height: var(--size-header);
  padding: 0 var(--size-gap);
  margin-left: calc(-1 * var(--size-gap));
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-light);
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    flex-grow: 1;
    margin-top: 2px;
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--color-black);
    line-height: var(--font-size-xl);
  }

  img {
    width: 24px;
    height: 24px;
    filter: invert(76%) sepia(7%) saturate(17%) hue-rotate(16deg)
      brightness(93%) contrast(89%);
  }
`;

const SearchInput = styled.input`
  flex-grow: 1;
  height: 40px;
  margin-left: 4px;
  padding-left: 16px;
  background: var(--color-bg);
  border-radius: 40px;

  &::placeholder {
    font-size: var(--font-size-sm);
    color: var(--color-gray-76);
    line-height: var(--font-size-sm);
  }
`;

export { Headers, SearchInput };
