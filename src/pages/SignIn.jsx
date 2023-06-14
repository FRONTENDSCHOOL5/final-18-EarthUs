/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import Button from "../components/common/button/Button";
import useApiMutation from "../hooks/useApiMutation";
import userDataAtom from "../recoil/userDataAtom";

export default function SignIn() {
  const navigate = useNavigate();

  // initialUserData에 로컬스토리지에 저장된 유저 데이터를 표시.
  const localStorageData = localStorage.getItem("userData");
  const initialUserData = localStorageData
    ? JSON.parse(localStorageData)
    : userDataAtom.default;
  const [userData, setUserData] = useRecoilState(userDataAtom);

  // mount시 로컬스토리지에 데이터가 있으면 userData에 저장.
  useEffect(() => {
    if (initialUserData) {
      setUserData(initialUserData);
    }
  }, []);

  // userData가 변경되면 로컬스토리지 데이터 갱신.
  useEffect(() => {
    if (
      userData &&
      JSON.stringify(userData) !== localStorage.getItem("userData")
    ) {
      localStorage.setItem("userData", JSON.stringify(userData));
      console.table(userData);
    }
  }, [userData]);

  // recoil을 사용해서 userDataAtom 변경
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUserLoginState = useSetRecoilState(userDataAtom);

  const postUserData = useApiMutation(
    "/user/login",
    "post",
    { user: { email, password } },
    {
      onSuccess: data => {
        console.log("요청에 성공했습니다.");
        setUserLoginState(data.user);
        navigate(`/profile/${data.user.accountname}`);
      },
    },
  );

  // console.log(userData.token);
  // * 입력값 핸들러
  const handleInputChange = (e, setInputChange) => {
    setInputChange(e.target.value);
  };

  // Email, Password 입력시 state 변경하는 Handler 함수
  // * 로그인 버튼 클릭시 비동기 통신 실행
  const handleSignIn = async e => {
    e.preventDefault();
    if (password.length < 6) {
      // eslint-disable-next-line no-alert
      alert("비밀번호는 6개 이상이어야 합니다");
      return;
    }
    if (email && password) {
      postUserData.mutate();
    }
  };

  // * 로그아웃 버튼 클릭시 로컬스토리지 데이터 삭제
  const handleSignOut = () => {
    localStorage.removeItem("userData");
    setUserData(userDataAtom.default);
  };

  return (
    <section>
      <h2>로그인</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">
            이메일
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => handleInputChange(e, setEmail)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            비밀번호
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => handleInputChange(e, setPassword)}
            />
          </label>
        </div>
        <Button size="sm" variant="primary" type="submit">
          로그인
        </Button>

        <Button
          size="sm"
          variant="white"
          type="button"
          onClick={e => handleSignOut(e)}
        >
          로그아웃
        </Button>

        <Button size="sm" variant="white" type="button">
          이메일로 회원가입
        </Button>
      </form>
    </section>
  );
}
