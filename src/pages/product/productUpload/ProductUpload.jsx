/* eslint-disable no-alert */
/* eslint-disable no-useless-escape */
/* eslint-disable no-case-declarations */
/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import Button from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import InputError from "../../../components/common/input/InputError";
import useApiMutation from "../../../hooks/useApiMutation";
import useApiQuery from "../../../hooks/useApiQuery";
import useImageUploader from "../../../hooks/useImageUploader";
import userDataAtom from "../../../recoil/userDataAtom";

import {
  InputFile,
  InputNumber,
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

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [itemImage, setItemImage] = useState(
    "https://api.mandarin.weniv.co.kr/1687097552358.png",
  );

  // 오류 메시지 상태 저장
  const [errorMessage, setErrorMessage] = useState(false);
  const [itemNameError, setItemNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [linkError, setLinkError] = useState("");

  // input value 변경
  // 유효성 검사
  const handleInputChange = e => {
    switch (e.target.type) {
      case "text":
        setItemName(e.target.value);

        const itemNameRegExp = /^[가-힣a-zA-Z0-9]+$/;
        if (!itemNameRegExp.test(e.target.value)) {
          setErrorMessage(true);
          setItemNameError("자음 또는 모음으로 상품명 설정이 불가합니다.");
        } else {
          setErrorMessage(false);
          setItemNameError("");
        }

        break;

      case "number":
        setPrice(e.target.value);

        if (e.target.value < 100) {
          setErrorMessage(true);
          setPriceError("100원 이상으로 적어주세요.");
        } else {
          setErrorMessage(false);
          setPriceError("");
        }

        break;

      case "url":
        setLink(e.target.value);

        const linkRegExp =
          /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?$/;
        if (!linkRegExp.test(e.target.value)) {
          setErrorMessage(true);
          setLinkError("URL을 확인해주세요.");
        } else {
          setErrorMessage(false);
          setLinkError("");
        }

        break;

      default:
        break;
    }
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
      },
    },
  );

  const imgPre = useRef(null);

  if (pathname === `/product/${productId}/edit`) {
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
      },
    },
  );

  const handleUploadProduct = e => {
    e.preventDefault();

    if (pathname === "/product/upload") {
      uploadProduct.mutate();
    } else if (pathname === `/product/${productId}/edit`) {
      editProduct.mutate();
    }
  };

  return (
    <form onSubmit={handleUploadProduct}>
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
        maxLength={10}
        minLength={2}
        value={itemName || ""}
        onChange={e => handleInputChange(e)}
        onBlur={() => setErrorMessage("")}
        className={`${itemNameError ? "error" : ""} ${
          itemName ? "filled" : ""
        }`}
        placeholder="2~15자 이내여야 합니다."
        isRequired
      >
        상품명
      </Input>
      <InputNumber
        type="number"
        id="price"
        min={100}
        max={999999999}
        value={price || ""}
        onChange={e => handleInputChange(e)}
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
        onBlur={() => setErrorMessage("")}
        className={`${priceError ? "error" : ""} ${price ? "filled" : ""}`}
        placeholder="숫자만 입력 가능합니다."
        isRequired
      >
        가격
      </InputNumber>
      <Input
        type="url"
        id="link"
        value={link || ""}
        onChange={e => handleInputChange(e)}
        onBlur={() => setErrorMessage("")}
        className={`${linkError ? "error" : ""} ${link ? "filled" : ""}`}
        placeholder="URL을 입력해주세요."
        isRequired
      >
        판매 링크
      </Input>
      {errorMessage && itemNameError && (
        <InputError>{itemNameError}</InputError>
      )}
      {errorMessage && priceError && <InputError>{priceError}</InputError>}
      {errorMessage && linkError && <InputError>{linkError}</InputError>}
      {pathname === "/product/upload" ? (
        <Button
          type="submit"
          size="cta"
          variant={
            !errorMessage && itemName && price && link ? "primary" : "disabled"
          }
          onClick={() => navigate(`/product/${myName}`)}
        >
          저장
        </Button>
      ) : (
        <Button
          type="submit"
          size="cta"
          variant="primary"
          onClick={() => navigate(-1)}
        >
          저장
        </Button>
      )}
    </form>
  );
}
