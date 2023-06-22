/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import A11yHidden from "../../../components/common/a11yHidden/A11yHidden";
import Button from "../../../components/common/button/Button";
import ImagePrev from "../../../components/common/imagePrev/ImagePrev";
import Input from "../../../components/common/input/Input";
import TextArea from "../../../components/common/textArea/TextArea";
import useApiMutation from "../../../hooks/useApiMutation";
import useApiQuery from "../../../hooks/useApiQuery";
import useImageUploader from "../../../hooks/useImageUploader";
import { getPostEditPath, POST_UPLOAD } from "../../../utils/config";

import { InputPrevWrap, ImgLabel, ImgUploadButton } from "./postUpload.style";

export default function PostUpload() {
  const { pathname } = useLocation();
  const { postId } = useParams();
  const navigate = useNavigate();
  const POST_EDIT = getPostEditPath(postId);

  // 데이터 패치
  const [apiImg, setApiImg] = useState([]);
  const [editImageData, setEditImageData] = useState("");

  // 인풋필드 상태 저장
  const [disabledBtn, setDisabledBtn] = useState(pathname === POST_UPLOAD);
  const [content, setContent] = useState("");

  // 오류 메시지 상태 저장
  const [contentError, setContentError] = useState("");

  // * 게시물 수정 시 이전 정보 출력
  const { data: apiData } = useApiQuery(
    `/post/${postId}`,
    "get",
    {},
    pathname === POST_EDIT,
  );

  useEffect(() => {
    if (apiData) {
      setApiImg(apiData.post.image.split(","));
      setContent(apiData.post.content);
      pathname === POST_EDIT && setEditImageData(apiData.post.image);
    }
  }, [apiData]);

  // * 게시물 유효성 검사
  const validationFields = e => {
    const currentValue = e.target.value;
    switch (e.target.id) {
      case "content":
        setContent(currentValue);
        if (currentValue.length < 1) {
          setContentError("내용 또는 이미지를 입력해주세요.");
          setDisabledBtn(true);
        } else {
          setContentError("");
          setDisabledBtn(false);
        }
        break;
      default:
        break;
    }
    return null;
  };

  // * 이미지 업로드 Hook 호출
  const { mutation: uploadPostImage, image } =
    useImageUploader("/image/uploadfiles");

  // * 이미지 업로드
  const handleImgChange = e => {
    const imageFile = e.target.files[0];
    const imageFiles = Array.from(e.target.files);

    // 취소 눌렀을 경우 업로드 실행 중단
    if (e.target.files.length === 0) {
      return;
    }

    // 이미지 파일 크기 제한
    if (imageFiles.some(file => file.size > 10000000)) {
      alert("10MB 이하 이미지를 넣어주세요");
      return;
    }

    // 이미지 파일 개수 제한
    if (imageFiles.length > 3) {
      alert("3개 이하의 파일을 업로드 하세요");
      return;
    }
    // 이미지 파일 확장자명 제한
    const fileNamesplitedArr = imageFile.name.split(".");
    const fileExtension = fileNamesplitedArr[fileNamesplitedArr.length - 1];
    const fileExtensions = ["jpg", "gif", "png", "jpeg", "bmp", "tif", "heic"];

    if (
      imageFiles.some(
        file => !fileExtensions.includes(file.name.split(".").pop()),
      )
    ) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
    uploadPostImage.mutate(imageFiles);
  };

  useEffect(() => {
    if (image) {
      setApiImg(image.split(","));
      pathname === POST_EDIT && setEditImageData(image);
    }
  }, [image, pathname === POST_EDIT]);

  // 이미지 수정 없이 게시글만 변경하는 경우 state 전달
  const editPostMutation = useApiMutation(
    `/post/${postId}`,
    "PUT",
    { post: { content, image: image || editImageData } },
    {
      onSuccess: data => {
        console.log("게시물 수정이 완료되었습니다.");
        navigate(`/profile/${data.post.author.accountname}`);
      },
    },
  );

  // * 게시물 업로드 Hook 호출
  const uploadPostMutation = useApiMutation(
    "/post",
    "POST",
    { post: { content, image } },
    {
      onSuccess: data => {
        console.log("게시물 등록이 완료되었습니다.");
        navigate(`/profile/${data.post.author.accountname}`);
      },
    },
  );

  // * 이미지 삭제
  const handleDelete = selectImgFile => {
    setApiImg(apiImg.filter(img => img !== selectImgFile));
  };

  // * 게시물 업로드
  const handleUploadPost = e => {
    e.preventDefault();

    if (pathname === POST_UPLOAD) {
      uploadPostMutation.mutate();
    } else if (pathname === POST_EDIT) {
      editPostMutation.mutate();
    }
  };

  return (
    <section>
      <h2>
        <A11yHidden>게시물 이미지 등록</A11yHidden>
      </h2>
      <form onSubmit={handleUploadPost}>
        <InputPrevWrap>
          {apiImg.length > 0 &&
            apiImg.map((imgUrl, idx) => (
              <ImagePrev
                // eslint-disable-next-line react/no-array-index-key
                key={`${imgUrl}-${idx}`}
                src={imgUrl}
                alt={`${idx + 1}번째 이미지`}
                event={() => handleDelete(imgUrl)}
              />
            ))}
        </InputPrevWrap>
        <Input
          className="itemImage"
          type="file"
          id="itemImage"
          onChange={e => handleImgChange(e)}
          multiple
          data={!apiImg.length ? "data" : ""}
        >
          {/* 이미지 등록 */}
          <ImgLabel data={!apiImg.length ? "data" : ""}>
            {/* 접근성 */}
            <ImgUploadButton
              data={apiImg.length < 1 ? "data" : ""}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  e.target.click();
                }
              }}
            />
          </ImgLabel>
        </Input>
        <TextArea
          type="text"
          id="content"
          value={content}
          error={contentError}
          onChange={validationFields}
          label="내용"
          placeholder="내용을 입력하세요."
          required
        />
        <Button
          type="submit"
          size="cta"
          variant={disabledBtn ? "disabled" : "primary"}
        >
          {pathname === POST_UPLOAD ? "저장" : "수정"}
        </Button>
      </form>
    </section>
  );
}
