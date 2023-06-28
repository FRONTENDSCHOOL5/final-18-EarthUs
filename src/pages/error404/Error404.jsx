import React from "react";
import { useNavigate } from "react-router-dom";

import Blank from "../../components/blank/Blank";
import { SIGN_IN } from "../../utils/config";

export default function Error404() {
  const navigate = useNavigate();

  const token = localStorage.getItem("privateData");

  return (
    <Blank
      btn={token ? "홈으로 이동하기" : "로그인으로 이동하기"}
      onClick={() => (token ? navigate("/") : navigate(SIGN_IN))}
    >
      {token
        ? "페이지를 찾을 수 없습니다. :("
        : "로그인 이후 접근 가능한 페이지입니다. :("}
    </Blank>
  );
}
