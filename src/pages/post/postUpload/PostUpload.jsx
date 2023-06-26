/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import A11yHidden from "../../../components/common/a11yHidden/A11yHidden";
import Button from "../../../components/common/button/Button";
import TextArea from "../../../components/common/textArea/TextArea";
import useApiMutation from "../../../hooks/useApiMutation";
import useApiQuery from "../../../hooks/useApiQuery";
import useValidations from "../../../hooks/useValidations";
import {
  getPostEditPath,
  POST_UPLOAD,
  NO_PROFILE_IMAGE,
} from "../../../utils/config";

import PostImageField from "./PostImageField";

export default function PostUpload({ profileImage, setProfileImage }) {
  const { pathname } = useLocation();
  const { postId } = useParams();
  const navigate = useNavigate();
  const POST_EDIT = getPostEditPath(postId);

  const [editImageData, setEditImageData] = useState(NO_PROFILE_IMAGE);
  const [disabledBtn, setDisabledBtn] = useState(pathname === POST_UPLOAD);

  // * 게시물 유효성 검사
  // 유효성 검사 객체 생성
  const contentObj = useValidations(
    "내용 또는 이미지를 입력해주세요.",
    /.+/,
    "",
  );

  // 유효성 검사 실행
  const inputs = [contentObj];
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
  }, [contentObj]);

  // * 게시물 수정 시 이전 정보 출력
  const { data } = useApiQuery(
    `/post/${postId}`,
    "get",
    {},
    pathname === POST_EDIT,
  );

  useEffect(() => {
    if (data) {
      contentObj.validate(data.post.content);
      pathname === POST_EDIT && setEditImageData(data.post.image);
    }
  }, [data]);

  // 이미지 수정 없이 게시글만 변경하는 경우 state 전달
  const editPostMutation = useApiMutation(
    `/post/${postId}`,
    "PUT",
    {
      post: {
        content: contentObj.value,
        image: editImageData,
      },
    },
    {
      onSuccess: ({ post }) => {
        console.log("게시물 수정이 완료되었습니다.");
        navigate(`/profile/${post.author.accountname}`);
      },
      onerror: error => {
        console.warn(
          "게시물 수정 요청에 실패했습니다.",
          error.response.data.message,
        );
      },
    },
  );

  // * 게시물 업로드 Hook 호출
  const uploadPostMutation = useApiMutation(
    "/post",
    "POST",
    {
      post: {
        content: contentObj.value,
        image: editImageData,
      },
    },
    {
      onSuccess: ({ post }) => {
        console.log("게시물 등록이 완료되었습니다.");
        navigate(`/profile/${post.author.accountname}`);
      },
    },
  );

  // * 게시물 업로드
  const handleUploadPost = e => {
    e.preventDefault();
    validationFields();

    console.log("clicked");
    if (pathname === POST_UPLOAD) {
      uploadPostMutation.mutate();
    } else if (pathname === POST_EDIT) {
      editPostMutation.mutate();
    }
  };

  return (
    <section>
      <h2>
        <A11yHidden>게시물 작성</A11yHidden>
      </h2>
      <PostImageField
        POST_EDIT={POST_EDIT}
        editImageData={editImageData}
        setEditImageData={setEditImageData}
      />
      <form onSubmit={handleUploadPost}>
        <TextArea
          type="text"
          id="content"
          value={contentObj.value}
          error={contentObj.error}
          onChange={contentObj.onChange}
          maxLength={500}
          label="내용"
          placeholder="내용을 입력하세요."
          required
        />
        <Button
          type="submit"
          size="cta"
          variant="primary"
          disabled={disabledBtn && "disabled"}
        >
          {pathname === POST_UPLOAD ? "저장" : "수정"}
        </Button>
      </form>
    </section>
  );
}
