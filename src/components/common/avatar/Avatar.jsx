import React from "react";

import { Avatars, Img } from "./avatar.style";

export default function Avatar({ profileImg, size }) {
  return (
    <Avatars size={size}>
      <Img src={profileImg} alt="프로필 이미지" />
    </Avatars>
  );
}
