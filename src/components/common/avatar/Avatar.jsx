import React from "react";

import Avatars from "./avatar.style";

export default function Avatar({ profileImg, size }) {
  return (
    <Avatars size={size}>
      <img src={profileImg} alt="프로필 이미지" />
    </Avatars>
  );
}
