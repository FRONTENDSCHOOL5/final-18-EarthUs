/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import A11yHidden from "../../../components/common/a11yHidden/A11yHidden";
import ImagePrev from "../../../components/common/imagePrev/ImagePrev";
import Input from "../../../components/common/input/Input";
import useApiQuery from "../../../hooks/useApiQuery";
import useImgMutationHook from "../../../hooks/useImageUploader";

import { InputPrevWrap, ImgLabel, ImgUploadButton } from "./postUpload.style";

const PostImageField = React.memo(function PostImageField({
  editImageData,
  setEditImageData,
  POST_EDIT,
}) {
  const { pathname } = useLocation();
  const { postId } = useParams();

  const [apiImg, setApiImg] = useState([]);

  // * 게시물 수정 페이지일 경우, 기존 유저 정보 불러오기
  const { data: apiData } = useApiQuery(
    `/post/${postId}`,
    "get",
    {},
    pathname === POST_EDIT,
  );
  useEffect(() => {
    if (apiData) {
      if (apiData && apiData.post && apiData.post.image) {
        setApiImg(apiData.post.image.split(","));
      }
    }
  }, [apiData]);

  // * 이미지 업로드 Hook 호출
  const { mutation: uploadPostImage, image } =
    useImgMutationHook("/image/uploadfiles");

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

  // 이미지 업로드 성공 시 데이터 저장
  useEffect(() => {
    if (image) {
      setApiImg(image.split(","));
      setEditImageData(image);
    }
  }, [image, pathname]);

  // * 이미지 삭제
  const handleDelete = selectImgFile => {
    setApiImg(apiImg.filter(img => img !== selectImgFile));
    setEditImageData(image);
    console.log(editImageData);
  };

  return (
    <>
      <InputPrevWrap>
        {apiImg.length > 0 &&
          apiImg.map((imgUrl, idx) => (
            <ImagePrev
              // eslint-disable-next-line react/no-array-index-key
              key={uuidv4()}
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
        tabIndex={-1}
        noMargin
      >
        <A11yHidden>이미지 등록</A11yHidden>
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
    </>
  );
});

export default PostImageField;
