import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Camera from "../../../assets/images/camera.svg";
import Nodata from "../../../assets/images/no-data.svg";
import Button from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import InputError from "../../../components/common/input/InputError";
import useApiMutation from "../../../hooks/useApiMutation";

import {
  FormStyle,
  H2,
  P,
  ImgAddBtn,
  ImgBtn,
  ImgFrame,
  ProfileImgSection,
  ProfileTitleSection,
  Div,
  ProfileImgInput,
  Label,
} from "./ProfileUpload.style";

// pathname 조건부 렌더링
export default function ProfileUpload() {
  const { pathname } = useLocation();
  const { account } = useParams();

  const showContent = pathname === `/profile/${account}/upload`;

  // 초기값 세팅 - 사용자 이름, 계정 ID, 소개
  const [username, setUserName] = useState("");
  const [accountname, setAccountId] = useState("");
  const [intro, setIntro] = useState("");
  const [image, setImage] = useState(Nodata);

  // 오류 메시지 상태 저장
  const [errorMessage, setErrorMessage] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [accountNameError, setAccountNameError] = useState("");

  // 사용자 이름 검사
  const onChangedName = e => {
    const currentUserName = e.target.value;
    setUserName(currentUserName);
    const userNameRegExp = /^[가-힣a-zA-Z\s]*$/;

    if (!userNameRegExp.test(currentUserName)) {
      setUserNameError("자음 또는 모음으로 이름 설정이 불가합니다.");
    } else {
      setUserNameError("");
    }
  };

  // 계정 ID 검사
  const onChangedId = e => {
    const currentId = e.target.value;
    setAccountId(currentId);
    const idRegExp = /^[a-zA-Z0-9._]*$/;

    if (!idRegExp.test(currentId)) {
      setAccountNameError("영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.");
    } else {
      setAccountNameError("");
    }
  };

  // 이미지 업로드 처리
  const handleImgUpload = e => {
    const uploadedImage = e.target.files[0];
    setImage(URL.createObjectURL(uploadedImage));
  };

  // 회원가입 API 호출
  const uploadProfile = useApiMutation(
    "/user",
    "post",
    { user: { username, accountname, intro, image } },
    {
      onSuccess: () => {
        console.warn("요청에 성공했습니다.");
      },
      onError: error => {
        const apiError = error.response.data.message;
        setErrorMessage(apiError);
        console.warn("요청에 실패했습니다.");
      },
    },
  );

  // 프로필 수정 api 호출
  const settingProfile = useApiMutation(
    "/user",
    "put",
    { user: { username, accountname, intro, image } },
    {
      onSuccess: () => {
        console.warn("요청에 성공했습니다.");
      },
      onError: error => {
        const apiError = error.response.data.message;
        setErrorMessage(apiError);
        console.warn("요청에 실패했습니다.");
      },
    },
  );

  const handleSubmit = e => {
    e.preventDefault();

    if (pathname === `/profile/${account}/upload`) {
      uploadProfile.mutate();
    } else if (pathname === `/profile/${account}/edit`) {
      settingProfile.mutate();
    }
  };

  return (
    <section>
      <Div>
        {showContent && (
          <ProfileTitleSection className="title">
            <H2>프로필 설정</H2>
            <P>나중에 언제든지 변경할 수 있습니다.</P>
          </ProfileTitleSection>
        )}
        <ProfileImgSection>
          <ImgFrame
            src={image || Nodata}
            className="imgFrame"
            alt="프로필 사진"
          />
          <Label htmlFor="image" />
          <ProfileImgInput
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImgUpload}
          />
          <ImgAddBtn type="submit">
            <ImgBtn
              src={Camera}
              className="cameraIcon"
              alt="프로필 사진 추가하기"
            />
          </ImgAddBtn>
        </ProfileImgSection>
      </Div>

      <FormStyle onSubmit={handleSubmit}>
        <Input
          type="text"
          id="username"
          placeholder="2~10자 이내여야 합니다."
          value={username}
          maxLength={10}
          minLength={2}
          onChange={onChangedName}
          className={`${userNameError ? "error" : ""} ${
            username ? "filled" : ""
          }`}
          isRequired
        >
          사용자 이름
        </Input>
        <Input
          type="text"
          id="accountname"
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          value={accountname}
          onChange={onChangedId}
          className={`${accountNameError ? "error" : ""} ${
            accountname ? "filled" : ""
          }`}
          isRequired
        >
          계정 ID
        </Input>
        <Input
          type="text"
          id="intro"
          placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
          value={intro}
          onChange={e => setIntro(e.target.value)}
          className={intro ? "filled" : ""}
        >
          소개
        </Input>
        {userNameError && <InputError>{userNameError}</InputError>}
        {accountNameError && <InputError>{accountNameError}</InputError>}
        {errorMessage && <InputError>{errorMessage}</InputError>}
        <Button size="cta" variant="primary">
          저장
        </Button>
      </FormStyle>
    </section>
  );
}
