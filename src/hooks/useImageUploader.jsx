/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import imageCompression from "browser-image-compression";

import { BASE_URL } from "../utils/config";

/**
 * @returns API서버에 이미지 전달
 * @example
 * const { mutation: uploadSampleImage, image } =useImgMutationHook(apiUrl);
 */
export default function useImageUploader(apiUrl) {
  const [image, setImage] = useState("");

  // ! 이미지를 서버에 전송
  const executeImageUpload = async files => {
    // 서버에 전송될 데이터를 담는 역할을 하는 인스턴스 생성.
    const formData = new FormData();

    // 이미지가 파일인지 배열인지 확인 후 조건식 실행
    const filesArray = Array.isArray(files) ? files : [files];

    // 이미지 최대 압축 용량, 해상도 옵션 지정
    const compressOption = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1040,
    };

    // Promise.all을 사용해 배열의 모든 파일 압축을 병렬로 실행
    const compressedFiles = await Promise.all(
      filesArray.map(async file => {
        // browser-image-compression 라이브러리를 사용해 파일 압축
        const compressedBlob = await imageCompression(file, compressOption);
        // 압축된 파일을 새로운 File 객체로 생성
        const compressedFile = new File([compressedBlob], file.name, {
          type: file.type,
          lastModified: file.lastModified,
        });
        return compressedFile;
      }),
    );

    // 압축된 파일들을 formData에 추가
    compressedFiles.forEach(compressedFile => {
      formData.append("image", compressedFile);
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
      console.log("이미지 등록에 성공했습니다.:", { ...data });

      // ! 이미지가 배열인지 확인 후 조건식 실행
      let filenames;
      if (Array.isArray(data)) {
        filenames = data.map(d => d.filename);
      } else {
        filenames = [data.filename];
      }

      // ! 이미지 주소를 BASE_URL과 조합해서 image 상태에 저장.
      const apiImg = filenames
        .map(filename => `${BASE_URL}/${filename}`)
        .join(",");
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
