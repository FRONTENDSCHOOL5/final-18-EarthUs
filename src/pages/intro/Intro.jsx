import React from "react";
import { Link } from "react-router-dom";

import ImgLogo from "../../assets/images/logo.svg";
import ImgFacebook from "../../assets/images/sns-facebook.svg";
import ImgGoogle from "../../assets/images/sns-google.svg";
import ImgKaKao from "../../assets/images/sns-kakao.svg";
import A11yHidden from "../../components/common/a11yHidden/A11yHidden";
import useModal from "../../hooks/useModal";
import { SIGN_IN, SIGN_UP } from "../../utils/config";

import setSnsLoginConfirm from "./intro.modal";
import { LogoImg, SignWrap, P, ButtonList, Links } from "./intro.style";

export default function Intro() {
  const { setModal, setModalOpen } = useModal();

  return (
    <>
      <LogoImg src={ImgLogo} alt="얼스어스" />
      <SignWrap>
        <h2>
          <A11yHidden>로그인 또는 회원가입</A11yHidden>
        </h2>
        <P>SNS 계정으로 간편 로그인</P>
        <ButtonList>
          <li>
            <button
              type="button"
              onClick={e => setSnsLoginConfirm(e, setModal, setModalOpen)}
            >
              <img src={ImgKaKao} alt="카카오톡 계정으로 로그인" />
            </button>
            <button
              type="button"
              onClick={e => setSnsLoginConfirm(e, setModal, setModalOpen)}
            >
              <img src={ImgFacebook} alt="페이스북 계정으로 로그인" />
            </button>
            <button
              type="button"
              onClick={e => setSnsLoginConfirm(e, setModal, setModalOpen)}
            >
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
