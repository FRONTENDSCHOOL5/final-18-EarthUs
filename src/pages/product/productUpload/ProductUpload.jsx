/* eslint-disable no-alert */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import Button from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import useApiMutation from "../../../hooks/useApiMutation";
import useApiQuery from "../../../hooks/useApiQuery";
import useImageUploader from "../../../hooks/useImageUploader";
import userDataAtom from "../../../recoil/userDataAtom";
import {
  getProductDetailPath,
  getProductEditPath,
  PRODUCT_UPLOAD,
  NO_IMAGE,
} from "../../../utils/config";

import {
  InputFile,
  ImgLabel,
  ImgUploadButton,
  Img,
} from "./productUpload.style";

export default function ProductUpload() {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [userData] = useRecoilState(userDataAtom);
  const myName = userData ? userData.accountname.trim().toLowerCase() : "";
  const PRODUCT_DETAIL = getProductDetailPath(myName);
  const PRODUCT_EDIT = getProductEditPath(productId);

  // 버튼 활성화 상태 관리
  const [disabledBtn, setDisabledBtn] = useState(pathname === PRODUCT_UPLOAD);

  // 인풋필드 상태 저장
  const [itemImage, setItemImage] = useState(NO_IMAGE);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

  // 오류 메시지 상태 저장
  const [itemNameError, setItemNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [linkError, setLinkError] = useState("");

  // * 게시물 유효성 검사
  const validationFields = e => {
    const currentValue = e.target.value;
    const itemNameRegExp =
      /^[가-힣a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+$/;
    const spclCharRegExp = /^[가-힣a-zA-Z0-9~.,_%+\(\)]+$/;
    const linkRegExp =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?$/;

    switch (e.target.id) {
      case "itemName":
        setItemName(currentValue);
        if (currentValue === "") {
          setItemNameError("상품명을 작성해주세요.");
          setDisabledBtn(true);
        } else if (!itemNameRegExp.test(currentValue)) {
          setItemNameError("자음 또는 모음, 공백으로 설정이 불가합니다.");
          setDisabledBtn(true);
        } else if (!spclCharRegExp.test(currentValue)) {
          setItemNameError("특수문자는 .,~_%+()만 사용 가능합니다.");
          setDisabledBtn(true);
        } else if (currentValue.length < 2) {
          setItemNameError("2글자 이상 작성해주세요.");
          setDisabledBtn(true);
        } else {
          setItemNameError("");
          setDisabledBtn(false);
        }
        break;

      case "price":
        setPrice(currentValue);
        if (currentValue === "") {
          setPriceError("가격을 작성해주세요.");
          setDisabledBtn(true);
        } else if (currentValue < 100) {
          setPriceError("100원 이하는 설정이 불가합니다.");
          setDisabledBtn(true);
        } else {
          setPriceError("");
          setDisabledBtn(false);
        }
        break;

      case "link":
        setLink(currentValue);
        if (currentValue === "") {
          setLinkError("URL을 작성해주세요.");
          setDisabledBtn(true);
        } else if (!linkRegExp.test(currentValue)) {
          setLinkError("URL을 확인해주세요.");
          setDisabledBtn(true);
        } else {
          setLinkError("");
          setDisabledBtn(false);
        }
        break;

      default:
        break;
    }
    return null;
  };

  // 이미지 업로드 Hook 호출
  const { mutation: uploadProfileImage, image } =
    useImageUploader("/image/uploadfile");

  // 이미지 업로드
  const handleImgChange = e => {
    // 취소 눌렀을 경우
    if (e.target.files.length === 0) {
      return;
    }

    const imageFile = e.target.files[0];

    // 이미지 파일 크기
    if (imageFile.size > 10000000) {
      alert("10MB 이하 이미지를 넣어주세요");
      return;
    }

    // 이미지 파일 확장자명
    const fileNamesplitedArr = imageFile.name.split(".");
    const fileExtension = fileNamesplitedArr[fileNamesplitedArr.length - 1];
    const fileExtensions = ["jpg", "gif", "png", "jpeg", "bmp", "tif", "heic"];

    if (!fileExtensions.includes(fileExtension)) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    uploadProfileImage.mutate(imageFile);
  };

  useEffect(() => {
    if (image !== "") {
      setItemImage(image);
    }
  }, [image]);

  // 상품 등록
  const uploadProduct = useApiMutation(
    "/product",
    "post",
    {
      // price는 parseInt를 사용해서 숫자로 변경
      product: {
        itemName,
        price: parseInt(price, 10),
        link,
        itemImage,
      },
    },
    {
      onSuccess: () => {
        console.log("요청에 성공했습니다");
        navigate(PRODUCT_DETAIL);
      },
    },
  );

  const imgPre = useRef(null);

  if (pathname === PRODUCT_EDIT) {
    const { data } = useApiQuery(`/product/detail/${productId}`, "get");
    useEffect(() => {
      if (data) {
        imgPre.current.src = data.product.itemImage;
        setItemImage(data && data.product.itemImage);
        setItemName(data && data.product.itemName);
        setPrice(data && data.product.price);
        setLink(data && data.product.link);
      }
    }, [data]);
  }

  // 상품 수정
  const editProduct = useApiMutation(
    `/product/${productId}`,
    "put",
    {
      product: {
        itemName,
        price: parseInt(price, 10),
        link,
        itemImage,
      },
    },
    {
      onSuccess: () => {
        console.log("요청에 성공했습니다");
        navigate(-1);
      },
    },
  );

  const handleSubmit = e => {
    e.preventDefault();

    if (pathname === PRODUCT_UPLOAD) {
      uploadProduct.mutate();
    } else if (pathname === PRODUCT_EDIT) {
      editProduct.mutate();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputFile type="file" id="itemImage" onChange={e => handleImgChange(e)}>
        이미지 등록
        <ImgLabel>
          <Img src={itemImage} alt="상품 이미지" ref={imgPre} />
          {/* 접근성 */}
          <ImgUploadButton
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
      </InputFile>

      <Input
        type="text"
        id="itemName"
        value={itemName}
        error={itemNameError}
        onChange={validationFields}
        label="상품명"
        placeholder="2~15자 이내여야 합니다."
        maxLength={10}
        minLength={2}
        required
      />
      <Input
        type="number"
        id="price"
        value={price}
        error={priceError}
        onChange={validationFields}
        // e, E, +, - 입력 방지
        onKeyDown={e =>
          ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
        }
        onWheel={e => {
          // 마우스휠로 값 변경되는 것 방지
          e.target.blur();
          // 포커스 잃지 않게
          setTimeout(() => {
            e.target.focus();
          }, 0);
        }}
        label="가격"
        placeholder="숫자만 입력 가능합니다"
        min={100}
        max={999999999}
        required
      />
      <Input
        type="url"
        id="link"
        value={link}
        error={linkError}
        onChange={validationFields}
        label="판매 링크"
        placeholder="URL을 입력해주세요."
        required
      />
      <Button
        type="submit"
        size="cta"
        variant={
          !disabledBtn && itemName && price && link ? "primary" : "disabled"
        }
      >
        {pathname === PRODUCT_UPLOAD ? "저장" : "수정"}
      </Button>
    </form>
  );
}
