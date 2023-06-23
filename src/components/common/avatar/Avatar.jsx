import React from "react";

import { NO_PROFILE_IMAGE } from "../../../utils/config";

import { Avatars, Img } from "./avatar.style";

export default function Avatar({ profileImg, size }) {
  return (
    <Avatars size={size}>
      <Img
        src={profileImg}
        alt="프로필 이미지"
        onError={e => {
          e.target.onerror = null;
          e.target.src = NO_PROFILE_IMAGE;
          e.target.style.width = "24px";
          e.target.style.height = "24px";
        }}
      />
    </Avatars>
  );
}
