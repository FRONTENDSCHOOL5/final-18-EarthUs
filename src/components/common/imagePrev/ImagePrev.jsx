import React from "react";

import A11yHidden from "../a11yHidden/A11yHidden";

import ImgPrevWrap from "./imagePrev.style";

export default function ImagePrev({ src, alt, event }) {
  return (
    <ImgPrevWrap>
      <img src={src} alt={alt} />
      <button type="button" onClick={event}>
        <A11yHidden>삭제</A11yHidden>
      </button>
    </ImgPrevWrap>
  );
}
