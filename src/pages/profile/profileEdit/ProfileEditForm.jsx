/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import Button from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import useApiMutation from "../../../hooks/useApiMutation";
import useApiQuery from "../../../hooks/useApiQuery";
import useValidations from "../../../hooks/useValidations";
import { FormStyle } from "../profileUpload/ProfileUpload.style";

export default function ProfileFormField({
  setUserData,
  pathname,
  navigate,
  profileImage,
}) {
  // * 게시물 유효성 검사
  // 버튼 활성화 상태 관리
  const [disabledBtn, setDisabledBtn] = useState(false);

  // 정규식 패턴
  const userNameObj = useValidations(
    "자음 또는 모음으로 이름 설정이 불가합니다.",
    /^[가-힣a-zA-Z\s]*$/,
    "",
  );
  const accountNameObj = useValidations(
    "영문 소문자, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.",
    /^[a-z0-9._]*$/,
    "",
  );
  const introObj = useValidations({});

  // 유효성 검사 실행
  const inputs = [userNameObj, accountNameObj];
  const validationFields = () => {
    let valid = true;
    inputs.forEach(input => {
      if (input.error || !input.value) {
        valid = false;
      }
    });
    setDisabledBtn(!valid);
  };

  // 유효성 검사 실행할 의존성 배열 지정
  useEffect(() => {
    validationFields();
  }, [userNameObj, accountNameObj]);

  // * 프로필 수정 페이지일 경우, 기존 유저 정보 불러오기
  const { data } = useApiQuery("/user/myinfo", "get");
  useEffect(() => {
    if (data) {
      userNameObj.validate(data.user.username);
      accountNameObj.validate(data.user.accountname);
      introObj.validate(data.user.intro);
    }
  }, [data, pathname]);

  // * 프로필 수정 api 호출
  const editProfile = useApiMutation(
    "/user",
    "put",
    {
      user: {
        username: userNameObj.value,
        accountname: accountNameObj.value,
        intro: introObj.value,
        image: profileImage,
      },
    },
    {
      onSuccess: ({ user }) => {
        console.warn("프로필 수정이 완료되었습니다.");
        setUserData(user);
        navigate(`/profile/${user.accountname}`);
      },
      onError: error => {
        console.warn(
          "프로필 수정 요청에 실패했습니다.",
          error.response.data.message,
        );
        accountNameObj.setError(error.response.data.message);
      },
    },
  );

  // 핸들러 함수 실행
  const handleSubmit = e => {
    e.preventDefault();
    validationFields();
    editProfile.mutate();
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
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
        variant="primary"
        disabled={disabledBtn && "disabled"}
      >
        수정
      </Button>
    </FormStyle>
  );
}
