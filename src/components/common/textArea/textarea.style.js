import styled from "styled-components";

const TextAreaWrap = styled.textarea`
  width: 100%;
  outline: none;
  border: none;
  overflow: hidden;
  resize: none;
  white-space: "pre-wrap";
  padding: 0.5rem;
  border-bottom: solid var(--color-dark) 2px;
  font: inherit;
  letter-spacing: inherit;
  min-height: 10rem;
  max-height: calc(100vh - var(--size-header) - var(--size-tabBar) - 40rem);
  overflow-y: auto;

  &::placeholder {
    color: var(--color-dark);
    font-size: var(--font-size-md);
  }

  // 값이 입력되거나 포커스 상태일 때
  &.filled,
  &:focus {
    border-bottom: 2px solid var(--color-primary);
  }

  // 에러 클래스가 되었을 때
  &.error {
    border-bottom-color: var(--color-error);
  }
`;

export default TextAreaWrap;
