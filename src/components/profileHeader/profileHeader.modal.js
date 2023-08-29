/* eslint-disable react/react-in-jsx-scope */
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import ImgKaKao from "../../assets/images/sns-kakao.svg";

import {
  ShareButtons,
  KakaoShareButton,
  UrlShareButton,
} from "./profileHeader.style";

const currentUrl = window.location.href;

function copyCurrentUrl() {
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      console.log("URL 복사 성공!");
    })
    .catch(err => {
      console.error("URL 복사 실패: ", err);
    });
}

// 공유하기 confirm
export default function setShareConfirm(
  e,
  setModal,
  setModalOpen,
  handleKakaoButton,
) {
  e.stopPropagation();
  setModal(
    "confirm",
    "공유하기",
    [
      {
        label: "닫기",
        onClick: () => setModalOpen(false),
      },
    ],
    <ShareButtons>
      <KakaoShareButton onClick={() => handleKakaoButton()} type="button">
        <img src={ImgKaKao} alt="카카오톡 공유" />
      </KakaoShareButton>
      <FacebookShareButton url={currentUrl}>
        <FacebookIcon size={48} round borderRadius={24} />
      </FacebookShareButton>
      <TwitterShareButton url={currentUrl}>
        <TwitterIcon size={48} round borderRadius={24} />
      </TwitterShareButton>
      <UrlShareButton onClick={() => copyCurrentUrl()}>URL</UrlShareButton>
    </ShareButtons>,
  );
}
