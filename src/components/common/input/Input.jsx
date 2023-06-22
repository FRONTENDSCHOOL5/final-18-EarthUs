/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { StyledField, StyledInput, StyledLabel } from "./input.style";
import InputError from "./InputError";

export default function Input({
  type,
  id,
  value,
  label,
  placeholder,
  maxLength,
  minLength,
  onChange,
  error,
  children,
  ...props
}) {
  const handleChange = e => {
    onChange(e);
  };

  const fieldClass = error ? "error" : "";

  return (
    <StyledField>
      <StyledLabel htmlFor={id}>
        {label}
        {children}
      </StyledLabel>
      <StyledInput
        type={type}
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        value={value}
        onChange={handleChange}
        className={fieldClass}
        {...props}
      />
      {error && <InputError>{error}</InputError>}
    </StyledField>
  );
}

// ✅ Usage
// 1. 버튼 활성화 상태 관리
// const [disabledBtn, setDisabledBtn] = useState(pathname === SAMPLE_UPLOAD);

// 2. 인풋필드 상태 저장
// const [sample, setSample] = useState("");

// 3. 오류 메시지 상태 저장
// const [sampleError, setSampleError] = useState("");

// 4. 유효성 검사 실패 시 className을 추가해 border-bottom-color 변경
// <Input
//  type="text"
//  id="sample"
//  value={sample}
//  error={sampleError}
//  onChange={validationFields} // 유효성 검사 함수명 고정
//  label="샘플"
//  placeholder="샘플 안내문구"
/// >

// 5. 버튼 조건식
// <Button
//   type="submit"
//   size="cta"
//   variant={disabledBtn ? "disabled" : "primary"}
// >
//   {pathname === SAMPLE_UPLOAD ? "저장" : "수정"}
// </Button>
