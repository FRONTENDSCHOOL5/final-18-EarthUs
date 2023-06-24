/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import Button from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import useApiMutation from "../../../hooks/useApiMutation";
import useValidations from "../../../hooks/useValidations";
import { SIGN_IN } from "../../../utils/config";

import ProfileImageField from "./ProfileImageField";
import ProfileTitle from "./ProfileTitle";
import { FormStyle } from "./ProfileUpload.style";

export default function ProfileFormField({
  navigate,
  profileImage,
  setProfileImage,
}) {
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [step, setStep] = useState(1);

  // * 게시물 유효성 검사
  // 유효성 검사 객체 생성
  const emailObj = useValidations(
    "이메일을 형식에 맞게 입력해주세요.",
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  );
  const passwordObj = useValidations(
    "영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.",
    /^[a-zA-Z0-9._]{6,}$/,
  );
  const userNameObj = useValidations(
    "자음 또는 모음으로 이름 설정이 불가합니다.",
    /^[가-힣a-zA-Zs]*$/,
  );
  const accountNameObj = useValidations(
    "영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.",
    /^[a-zA-Z0-9._]*$/,
  );
  const introObj = useValidations({});

  // 유효성 검사 실행
  const step1Inputs = [emailObj, passwordObj];
  const step2Inputs = [userNameObj, accountNameObj, introObj];

  const validationFields = stepInputs => {
    let valid = true;
    stepInputs.forEach(input => {
      if (input.error || !input.value) {
        valid = false;
      }
    });
    setDisabledBtn(!valid);
  };

  // 유효성 검사 실행할 의존성 배열 지정
  useEffect(() => {
    if (step === 1) {
      validationFields(step1Inputs);
    } else if (step === 2) {
      validationFields(step2Inputs);
    }
  }, [step, emailObj, passwordObj, userNameObj, accountNameObj, introObj]);

  // * 회원가입 API 호출
  const uploadProfileMutation = useApiMutation(
    "/user",
    "post",
    {
      user: {
        email: emailObj.value,
        password: passwordObj.value,
        username: userNameObj.value,
        accountname: accountNameObj.value,
        intro: introObj.value,
        image: profileImage,
      },
    },
    {
      onSuccess: data => {
        console.warn("프로필 등록이 완료되었습니다.");
        navigate(SIGN_IN);
      },
      onError: error => {
        console.warn(
          "프로필 등록 요청에 실패했습니다.",
          error.response.data.message,
        );
        accountNameObj.setError(error.response.data.message);
      },
    },
  );

  // * 이메일 검증 API 호출
  const emailValidMutation = useApiMutation(
    "/user/emailvalid",
    "post",
    {
      user: {
        email: emailObj.value,
      },
    },
    {
      onSuccess: data => {
        if (data.message === "사용 가능한 이메일 입니다.") {
          setStep(step + 1);
        } else if (data.message === "이미 가입된 이메일 주소 입니다.") {
          emailObj.setError(data.message);
        }
      },
      onError: error => {
        console.warn("잘못된 접근입니다.");
        emailObj.setError(error.response.data.message);
      },
    },
  );

  // 핸들러 함수 실행
  const handleSubmit = e => {
    e.preventDefault();
    validationFields(step2Inputs);
    uploadProfileMutation.mutate();
  };

  return (
    <>
      {step === 1 && (
        <>
          <ProfileTitle subject="이메일 회원가입" />
          <ProfileImageField
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
          <Input
            type="text"
            id="email"
            value={emailObj.value}
            error={emailObj.error}
            onChange={emailObj.onChange}
            label="아이디"
            placeholder="이메일을 입력하세요."
            required
          />
          <Input
            type="password"
            id="password"
            value={passwordObj.value}
            error={passwordObj.error}
            onChange={passwordObj.onChange}
            label="비밀번호"
            placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
            required
          />
          <Button
            type="button"
            size="cta"
            onClick={() => emailValidMutation.mutate()}
            variant={!disabledBtn ? "primary" : "disabled"}
          >
            다음
          </Button>
        </>
      )}

      {step === 2 && (
        <FormStyle onSubmit={handleSubmit}>
          <ProfileTitle
            subject="프로필 설정"
            description="나중에 언제든지 변경할 수 있습니다."
          />
          <ProfileImageField
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
          <Input
            type="text"
            id="username"
            value={userNameObj.value}
            error={userNameObj.error}
            onChange={userNameObj.onChange}
            label="사용자 이름"
            placeholder="2~10자 이내여야 합니다."
            maxLength={10}
            minLength={2}
            required
          />
          <Input
            type="text"
            id="accountname"
            value={accountNameObj.value}
            error={accountNameObj.error}
            onChange={accountNameObj.onChange}
            label="계정 ID"
            placeholder="내용을 입력하세요."
            required
          />
          <Input
            type="text"
            id="intro"
            value={introObj.value}
            onChange={introObj.onChange}
            label="소개"
            placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
          />
          <Button
            type="submit"
            size="cta"
            variant={!disabledBtn ? "primary" : "disabled"}
          >
            회원가입
          </Button>
        </FormStyle>
      )}
    </>
  );
}
