/* eslint-disable no-constant-condition */
import React, { useEffect, useRef } from "react";

import InputError from "../input/InputError";

import TextAreaWrap from "./textarea.style";

export default function TextArea({
  type,
  id,
  value,
  placeholder,
  maxLength,
  minLength,
  onChange,
  error,
  ...props
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = e => {
    onChange(e);
  };

  const fieldClass = error ? "error" : "";

  return (
    <div>
      <TextAreaWrap
        ref={textareaRef}
        type={type}
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        value={value}
        onChange={handleChange}
        className={fieldClass}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      {error && <InputError>{error}</InputError>}
    </div>
  );
}
