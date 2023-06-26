import styled, { css } from "styled-components";

export const StyledField = styled.div`
  width: 100%;
  position: relative;
  min-height: 8rem;
  ${({ noMargin }) =>
    noMargin &&
    css`
      min-height: auto;
    `}
`;

export const StyledLabel = styled.label`
  font-family: "LINE Seed KR";
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-gray-76);
`;

export const StyledInput = styled.input`
  display: flex;
  width: min(100%, var(--size-max-width));
  height: 52px;
  color: var(--color-black);
  border-bottom: solid var(--color-dark) 2px;
  margin-bottom: 1rem;

  &::placeholder {
    color: var(--color-dark);
    font-family: "LINE Seed KR";
    font-size: var(--font-size-md);
  }

  &[type="file"] {
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }

  &[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  // 값이 입력되거나 포커스 상태일 때
  &.filled,
  &:focus {
    border-bottom-color: var(--color-primary);
  }

  // 에러 클래스가 되었을 때
  &.error {
    border-bottom-color: var(--color-error);
  }
`;
