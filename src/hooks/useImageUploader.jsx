/* eslint-disable no-console */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import BASE_URL from "../config";

export default function useImageUploader(apiUrl) {
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(""); // create a local state

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
      const apiImg = `${BASE_URL}/${data.filename}`; // get the image URL from the response
      setImage(apiImg); // update the image state with the new URL
    },
  });

  return { mutation, image }; // return the image state alongside the mutation
}

// ✅ Usage
// 1. 사용 시 이미지 미리보기 구현을 위해 setImageFile useState 추가.
// 2. 사용 시 'uploadSampleImage' 네이밍은 용도에 맞도록 변경해서 사용.

// const [imageFile, setImageFile] = useState(null);

// const { mutation: uploadSampleImage, image } =
//   useImgMutationHook(
// "/image/sample"    // API 주소
// );
// const handleImgChange = e => {
//   const uploadImageFile = e.target.files[0];
//   setImageFile(uploadImageFile);

//   uploadSampleImage.mutate(uploadImageFile);
// };
