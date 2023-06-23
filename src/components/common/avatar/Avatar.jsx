import React from "react";

import { NO_PROFILE_IMAGE } from "../../../utils/config";

import { Avatars, Img } from "./avatar.style";

export default function Avatar({ profileImg, size }) {
  // * 이미지가 로드되지 않았을 때 onError 이벤트 핸들러 실행
  const handleImgError = e => {
    e.target.onerror = null;
    e.target.src = NO_PROFILE_IMAGE;
    e.target.style.width = "24px";
    e.target.style.height = "24px";
  };

  return (
    <Avatars size={size}>
      <Img src={profileImg} alt="프로필 이미지" onError={handleImgError} />
    </Avatars>
  );
}
