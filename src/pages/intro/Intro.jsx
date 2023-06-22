import React from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import ImgLogo from "../../assets/images/logo.svg";
import ImgFacebook from "../../assets/images/sns-facebook.svg";
import ImgGoogle from "../../assets/images/sns-google.svg";
import ImgKaKao from "../../assets/images/sns-kakao.svg";
import modalConfigState from "../../recoil/modalConfigAtom";
import modalState from "../../recoil/modalStateAtom";
import { SIGN_IN, SIGN_UP } from "../../utils/config";

import { LogoImg, SignWrap, P, ButtonList, Links } from "./intro.style";

export default function Intro() {
  const setModalOpen = useSetRecoilState(modalState);
  const setModalConfig = useSetRecoilState(modalConfigState);

  // SNS 간편 로그인 모달
  const setSnsLoginConfirm = () => {
    setModalConfig({
      type: "confirm",
      title: "SNS 간편 로그인",
      body: "준비중",
      buttons: [
        {
          label: "닫기",
          onClick: () => setModalOpen(false),
        },
      ],
    });
    setModalOpen(true);
  };

  return (
    <>
      <LogoImg src={ImgLogo} alt="얼스어스" />
      <SignWrap>
        <P>SNS 계정으로 간편 로그인</P>
        <ButtonList>
          <li>
            <button type="button" onClick={setSnsLoginConfirm}>
              <img src={ImgKaKao} alt="카카오톡 계정으로 로그인" />
            </button>
            <button type="button" onClick={setSnsLoginConfirm}>
              <img src={ImgFacebook} alt="페이스북 계정으로 로그인" />
            </button>
            <button type="button" onClick={setSnsLoginConfirm}>
              <img src={ImgGoogle} alt="구글 계정으로 로그인" />
            </button>
          </li>
        </ButtonList>
        <Links>
          <Link to={SIGN_IN}>이메일로 로그인</Link>
          <Link to={SIGN_UP}>회원가입</Link>
        </Links>
      </SignWrap>
    </>
  );
}
