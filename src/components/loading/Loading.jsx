import React from "react";

import ImgEarth from "../../assets/images/earth.svg";

import LoadingImg from "./loading.style";

export default function Loading() {
  return (
    <LoadingImg>
      <img src={ImgEarth} alt="웃고있는 지구" />
      <img src={ImgEarth} alt="웃고있는 지구" />
      <img src={ImgEarth} alt="웃고있는 지구" />
    </LoadingImg>
  );
}
