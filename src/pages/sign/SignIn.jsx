/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import Button from "../../components/common/button/Button";
import Input from "../../components/common/input/Input";
import useApiMutation from "../../hooks/useApiMutation";
import privateDataAtom from "../../recoil/privateDataAtom";
import userDataAtom from "../../recoil/userDataAtom";
import { getProfileDetailPath, SIGN_UP } from "../../utils/config";

import { H2, SignUpLink } from "./sign.style";

export default function SignIn() {
  const navigate = useNavigate();

  // 버튼 활성화 상태 관리
  const [disabledBtn, setDisabledBtn] = useState(true);

  // 인풋필드 상태 저장
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 오류 메시지 상태 저장
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");

  // * 유저데이터를 가져오기 위한 userDataAtom 사용
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [privateData, setPrivateData] = useRecoilState(privateDataAtom);

  // * userData가 변경되면 로컬스토리지 데이터 갱신
  useEffect(() => {
    if (
      userData &&
      JSON.stringify(userData) !== localStorage.getItem("userData")
    ) {
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("privateData", JSON.stringify(privateData));
      console.table(userData, privateData);
    }
  }, [userData]);

  // * 로그인 API 호출
  const signIn = useApiMutation(
    "/user/login",
    "post",
    { user: { email, password } },
    {
      onSuccess: data => {
        console.log("요청에 성공했습니다.");
        setPwError(data.message); // "아이디 또는 비밀번호가 일치하지 않습니다."
        setUserData(data.user);
        setPrivateData(data.user.token);
        navigate(getProfileDetailPath(data.user.accountname)); // 로그인 시 프로필 페이지로 이동
      },
    },
  );

  // * 로그인 입력값 유효성 검사
  const validationFields = e => {
    const currentValue = e.target.value;

    switch (e.target.id) {
      case "email":
        setEmail(currentValue);
        if (currentValue === "") {
          setEmailError("이메일을 입력해주세요.");
          setDisabledBtn(true);
        } else {
          setEmailError("");
          setDisabledBtn(false);
        }
        break;

      case "password":
        setPassword(currentValue);
        if (currentValue === "") {
          setPwError("비밀번호를 입력해주세요.");
          setDisabledBtn(true);
        } else {
          setPwError("");
          setDisabledBtn(false);
        }
        break;

      default:
        break;
    }
    return null;
  };

  // * 로그인 실행
  const handleSignIn = async e => {
    e.preventDefault();
    signIn.mutate();
  };

  return (
    <section>
      <H2>로그인</H2>
      <SignUpLink to={SIGN_UP}>처음 오셨다면 간편 회원가입 하세요!</SignUpLink>
      <form onSubmit={handleSignIn}>
        <Input
          type="text"
          id="email"
          value={email}
          error={emailError}
          onChange={validationFields}
          label="아이디"
          placeholder="이메일을 입력하세요."
          required
          className={
            emailError === "이메일을 입력해주세요." ||
            pwError === "이메일 또는 비밀번호가 일치하지 않습니다."
              ? "error"
              : ""
          }
        />
        <Input
          type="password"
          id="password"
          value={password}
          error={pwError}
          onChange={validationFields}
          label="비밀번호"
          placeholder="비밀번호를 입력하세요."
          required
        />
        <Button
          size="cta"
          variant={!disabledBtn && email && password && "primary"}
          disabled={disabledBtn || !email || !password}
          type="submit"
        >
          로그인
        </Button>
      </form>
    </section>
  );
}
