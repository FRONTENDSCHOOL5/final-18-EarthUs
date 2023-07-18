import React, { useState } from "react";
import { Link } from "react-router-dom";

import layer from "../../assets/images/layer-image.svg";
import Nodata from "../../assets/images/no-data.svg";

import { Img } from "./View.style";

export default function GridView({ item }) {
  // * 이미지가 로드되지 않았을 때 onError 이벤트 핸들러 실행
  const [hasImageError, setHasImageError] = useState(false);
  const handleImgError = e => {
    e.target.onerror = null;
    e.target.src = Nodata;
    setHasImageError(true);
  };

  const { id, image } = item;
  // * 등록된 이미지가 1개 이상이라면 배열로 변환
  const multipartImages =
    typeof image === "string"
      ? image.trim().replace(/\s+/g, "").split(",")
      : [image];

  return (
    image && (
      <Link to={`/post/${id}/`} key={id}>
        <Img
          key={id}
          src={multipartImages[0]}
          alt=""
          onError={handleImgError}
          hasError={hasImageError}
        />
        {multipartImages.length > 1 && (
          <span>
            <img
              src={layer}
              alt={`${multipartImages.length}장의 게시물 이미지`}
            />
          </span>
        )}
      </Link>
    )
  );
}
