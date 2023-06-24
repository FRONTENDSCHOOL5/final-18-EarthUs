import React from "react";
import { useNavigate } from "react-router-dom";

import Blank from "../../components/blank/Blank";
import { HOME } from "../../utils/config";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <Blank btn="홈으로 이동" onClick={() => navigate(HOME)}>
      페이지를 찾을 수 없습니다. :&#40;
    </Blank>
  );
}
