import styled from "styled-components";

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
  margin-bottom: 24px;

  &::placeholder {
    color: var(--color-dark);
    font-family: "LINE Seed KR";
    font-size: var(--font-size-md);
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
