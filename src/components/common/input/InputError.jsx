import React from "react";

import errorImage from "../../../assets/images/error.svg";

import { ErrorTextStyle, ErrorImg } from "./inputError.style";

export default function ErrorMessage({ children }) {
  return (
    <ErrorTextStyle>
      <ErrorImg className="errorIcon" src={errorImage} />
      {children}
    </ErrorTextStyle>
  );
}

// 유효성 검사 후 ErrorMessage Component 호출

// 1. 초기값 세팅
// const [accountId, setAccountId] = useState("");

// 2. 오류 메시지 상태 저장
//   const [errorMessage, setErrorMessage] = useState("");

// 3. 유효성 검사
// const onChangedId = e => { ...
//     if (!idRegExp.test(currentId)) {
//       setErrorMessage("영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.");
//     } else {
//       setErrorMessage("");
//     }
//   };

// 4. 상태 업데이트
// <Input ...
// onChange={e => setName(e.target.value)}
// >

// 5. ErrorMessage Component 호출
// {errorMessage && <InputError>{errorMessage}</InputError>}
