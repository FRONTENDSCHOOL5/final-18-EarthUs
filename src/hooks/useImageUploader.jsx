/* eslint-disable no-console */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { BASE_URL } from "../utils/config";

/**
 * @returns API서버에 이미지 전달
 * @example
 * const { mutation: uploadSampleImage, image } =useImgMutationHook(apiUrl);
 */
export default function useImageUploader(apiUrl) {
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState("");

  const executeImageUpload = async files => {
    const formData = new FormData();

    // ! 이미지가 파일인지 배열인지 확인 후 조건식 실행
    const filesArray = Array.isArray(files) ? files : [files];
    filesArray.forEach(file => {
      formData.append("image", file);
    });

    // axios로 formData 전송해서 응답 반환
    const response = await axios.post(BASE_URL + apiUrl, formData);
    return response.data;
  };

  const mutation = useMutation(executeImageUpload, {
    onError: error => {
      console.error("이미지 등록에 실패했습니다.", error);
    },
    onSuccess: data => {
      console.log("이미지 등록에 성공했습니다.");
      console.log("data:", { ...data });

      // ! 이미지가 배열인지 확인 후 조건식 실행
      let filenames;
      if (Array.isArray(data)) {
        filenames = data.map(d => d.filename);
        console.table("filenames:", filenames);
      } else {
        filenames = [data.filename];
        console.table("filename:", data.filename);
      }

      // 이미지 주소가 없으면 종료.
      if (!filenames.every(Boolean)) {
        console.log("이미지 주소를 찾을 수 없습니다.");
      }

      // ! 이미지 주소를 BASE_URL과 조합해서 image 상태에 저장.
      const apiImg = filenames
        .map(filename => `${BASE_URL}/${filename}`)
        .join(",");
      setImage(apiImg);
      console.log("image:", apiImg);
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
