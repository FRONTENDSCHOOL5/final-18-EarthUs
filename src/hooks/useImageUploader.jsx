/* eslint-disable no-console */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import BASE_URL from "../utils/config";

export default function useImageUploader(apiUrl) {
  // image 주소를 저장할 state
  const [image, setImage] = useState("");

  const executeImageUpload = async file => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post(BASE_URL + apiUrl, formData);

    return response.data;
  };

  const mutation = useMutation(executeImageUpload, {
    onError: error => {
      console.error("이미지 등록에 실패했습니다.", error);
    },
    onSuccess: data => {
      console.log("이미지 등록에 성공했습니다.");
      console.table(data);
      console.table(data.filename);

      // 이미지 주소가 undefined일 경우에는 api 실행하지 않고 종료
      if (!data.filename) return;

      // 이미지 주소를 저장
      const apiImg = `${BASE_URL}/${data.filename}`;
      setImage(apiImg);
    },
  });

  return { mutation, image };
}

// ✅ Usage
// 1. 'uploadSampleImage' 네이밍은 용도에 맞도록 변경해서 사용.
// const { mutation: uploadSampleImage, image } =
//   useImgMutationHook(
// "/image/sample"    // API 주소 용도에 맞게 변경
// );

// 2. img 태그에 조건부 랜더링
// <img src={image || null} alt="이미지 설명"/>

// 3. input 태그에 onChange 이벤트 추가
// const handleImgChange = e => {
//   const uploadImageFile = e.target.files[0];
//   uploadSampleImage.mutate(uploadImageFile);
// };
