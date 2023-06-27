import { useState } from "react";

const useValidations = (
  invalid = "",
  regExp = /.*/,
  initialValue = "",
  initialError = "",
) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(initialError);

  const validate = newValue => {
    // 기본값이 있을 경우, 기본값으로 초기화
    setValue(newValue);

    // 공백 및 정규식 검사
    if (newValue === "" || !regExp.test(newValue)) {
      setError(invalid);
      return false;
    }

    // 명세 조건이 없는 경우 검사 통과
    setError("");
    return true;
  };

  const onChange = e => {
    const newValue = e.target.value;
    validate(newValue);
  };

  return {
    value,
    error,
    onChange,
    validate,
    setError,
  };
};
export default useValidations;
