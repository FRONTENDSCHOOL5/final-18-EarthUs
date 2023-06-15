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
        required
      />
    </>
  );
}
