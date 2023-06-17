import React from "react";
import { useNavigate } from "react-router-dom";

import { Notice, SearchButton } from "./blank.style";

export default function Blank() {
  const navigate = useNavigate();
  return (
    <>
      <Notice>유저를 검색해 팔로우 해보세요!</Notice>
      <SearchButton
        size="cta"
        variant="primary"
        type="button"
        onClick={() => navigate("/search")}
      >
        유저 검색하기
      </SearchButton>
    </>
  );
}
