/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import A11yHidden from "../../../components/common/a11yHidden/A11yHidden";
import useApiQuery from "../../../hooks/useApiQuery";
import useImgMutationHook from "../../../hooks/useImageUploader";
import { SIGN_UP } from "../../../utils/config";

import {
  Img,
  ImgFrame,
  ProfileImgSection,
  ProfileImgInput,
  Label,
} from "./ProfileUpload.style";

export default function ProfileImageField({
  setProfileImage,
  profileImage,
  imgPre,
}) {
  // * 프로필 수정 페이지일 경우, 기존 유저 정보 불러오기
  const { pathname } = useLocation();

  if (pathname !== SIGN_UP) {
    const { data } = useApiQuery("/user/myinfo", "get");
    useEffect(() => {
      if (data) {
        setProfileImage(data && data.user.image);
      }
    }, [data]);
  }

  // * 이미지 업로드 처리
  const { mutation: uploadProfileImage, image } =
    useImgMutationHook("/image/uploadfile");

  const handleImgUpload = e => {
    // 취소 눌렀을 경우
    if (e.target.files.length === 0) {
      return;
    }

    const uploadImageFile = e.target.files[0];

    // 이미지 파일 크기
    if (uploadImageFile.size > 10000000) {
      alert("10MB 이하 이미지를 넣어주세요");
      return;
    }

    // 이미지 파일 확장자명
    const fileNamesplitedArr = uploadImageFile.name.split(".");
    const fileExtension = fileNamesplitedArr[fileNamesplitedArr.length - 1];
    const fileExtensions = ["jpg", "gif", "png", "jpeg", "bmp", "tif", "heic"];

    if (!fileExtensions.includes(fileExtension)) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    uploadProfileImage.mutate(uploadImageFile);
  };

  // Enter 키 이벤트
  const handleOnKeyPress = e => {
    if (e.key === "Enter" || e.key === "") {
      e.preventDefault();
      e.target.click();
    }
  };

  useEffect(() => {
    if (image !== "") {
      setProfileImage(image);
    }
  }, [image]);

  return (
    <ProfileImgSection>
      <h2>
        <A11yHidden>이미지 등록</A11yHidden>
      </h2>
      <ImgFrame>
        <Img
          src={profileImage || (imgPre.current && imgPre.current.src)}
          className="imgFrame"
          alt="프로필 사진"
        />
      </ImgFrame>
      <Label htmlFor="image" tabIndex={0} onKeyDown={handleOnKeyPress} />
      <ProfileImgInput
        type="file"
        id="image"
        accept="image/*"
        onChange={handleImgUpload}
        tabIndex={-1}
      />
    </ProfileImgSection>
  );
}
