import React from "react";

import { StyledInput, StyledLabel } from "./input.style";

export default function Input({
  type,
  id,
  placeholder,
  value,
  maxLength,
  minLength,
  onChange,
  children,
  className,
  isRequired = false,
}) {
  return (
    <>
      <StyledLabel htmlFor={id}>{children}</StyledLabel>
      <StyledInput
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        minLength={minLength}
        onChange={onChange}
        className={className}
        required={isRequired && true}
      />
    </>
  );
}

// 유효성 검사 실패 시 className을 추가해 border-bottom-color 변경
// className={errorMessage ? "error" : ""}
