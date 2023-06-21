/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import Camera from "../../../assets/images/camera.svg";
import Button from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import InputError from "../../../components/common/input/InputError";
import useApiMutation from "../../../hooks/useApiMutation";
import useApiQuery from "../../../hooks/useApiQuery";
import useImgMutationHook from "../../../hooks/useImageUploader";
import userDataAtom from "../../../recoil/userDataAtom";
import {
  getProfileDetailPath,
  getProfileEditPath,
  getProfileUploadPath,
  NO_IMAGE,
} from "../../../utils/config";

import {
  FormStyle,
  H2,
  P,
  ImgAddBtn,
  ImgBtn,
  ImgFrame,
  Img,
  ProfileImgSection,
  ProfileTitleSection,
  Div,
  ProfileImgInput,
  Label,
} from "./ProfileUpload.style";

// pathname 조건부 렌더링
export default function ProfileUpload() {
  // 리코일 유저 데이터 저장
  const [userData] = useRecoilState(userDataAtom);
  const setUserLoginState = useSetRecoilState(userDataAtom);

  // 경로 설정
  const { account } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const PROFILE_DETAIL = getProfileDetailPath(account);
  const PROFILE_UPLOAD = getProfileUploadPath(account);
  const PROFILE_EDIT = getProfileEditPath(account);

  // 초기값 세팅 - 사용자 이름, 계정 ID, 소개
  const [username, setUserName] = useState("");
  const [accountname, setAccountId] = useState("");
  const [intro, setIntro] = useState("");
  const [profileImage, setProfileImage] = useState(NO_IMAGE);

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

  // 회원정보 수정 API 호출
  // * userData가 변경되면 로컬스토리지 데이터 갱신.
  useEffect(() => {
    if (
      userData &&
      JSON.stringify(userData) !== localStorage.getItem("userData")
    ) {
      localStorage.setItem("userData", JSON.stringify(userData));
      console.table(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (image !== "") {
      setProfileImage(image);
    }
  }, [image]);

  // 회원가입 API 호출
  const uploadProfile = useApiMutation(
    "/user",
    "post",
    { user: { username, accountname, intro, image: profileImage } },
    {
      onSuccess: data => {
        console.warn("프로필 등록이 완료되었습니다.");
        setUserLoginState(data.user);
        navigate(PROFILE_DETAIL);
      },
      onError: error => {
        const apiError = error.response.data.message;
        setErrorMessage(apiError);
        console.warn("요청에 실패했습니다.");
      },
    },
  );

  const imgPre = useRef(null);

  if (pathname === PROFILE_EDIT) {
    const { data } = useApiQuery("/user/myinfo", "get");
    useEffect(() => {
      if (data) {
        imgPre.current.src = data.user.image;
        setProfileImage(data && data.user.image);
        setUserName(data && data.user.username);
        setAccountId(data && data.user.accountname);
        setIntro(data && data.user.intro);
      }
    }, [data]);
  }

  // 프로필 수정 api 호출
  const settingProfile = useApiMutation(
    "/user",
    "put",
    { user: { username, accountname, intro, image: profileImage } },
    {
      onSuccess: data => {
        console.warn("프로필 수정이 완료되었습니다.");
        setUserLoginState(data.user);
        navigate(PROFILE_DETAIL);
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

    if (pathname === PROFILE_UPLOAD) {
      uploadProfile.mutate();
    } else if (pathname === PROFILE_EDIT) {
      settingProfile.mutate();
    }
  };

  // Enter 키 이벤트
  const handleOnKeyPress = e => {
    if (e.key === "Enter" || e.key === "") {
      e.preventDefault();
      e.target.click();
    }
  };

  return (
    <section>
      <Div>
        {pathname === PROFILE_UPLOAD && (
          <ProfileTitleSection className="title">
            <H2>프로필 설정</H2>
            <P>나중에 언제든지 변경할 수 있습니다.</P>
          </ProfileTitleSection>
        )}
        <ProfileImgSection>
          <ImgFrame>
            <Img
              src={image}
              className="imgFrame"
              alt="프로필 사진"
              ref={imgPre}
            />
          </ImgFrame>
          <Label htmlFor="image" tabIndex={0} onKeyDown={handleOnKeyPress} />
          <ProfileImgInput
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImgUpload}
          />
          {/* 접근성 */}
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
          className={`${userNameError ? "error" : ""} 
          ${username ? "filled" : ""}`}
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
          className={`${accountNameError ? "error" : ""} 
          ${accountname ? "filled" : ""}`}
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
