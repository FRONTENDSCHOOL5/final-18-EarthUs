/* eslint-disable no-unused-expressions */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import ImgEarth from "../../assets/images/earth.svg";
import ImgLogoName from "../../assets/images/logo-name.svg";
import userDataAtom from "../../recoil/userDataAtom";
import { HOME, ONBOARDING } from "../../utils/config";

import { SplashBg, ImgWrap, LogoNameImg, EarthImg } from "./splash.style";

export default function Splash() {
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();

  userData.token
    ? setTimeout(() => {
        navigate(HOME);
      }, 5000)
    : setTimeout(() => {
        navigate(ONBOARDING);
      }, 5000);

  return (
    <>
      <SplashBg />
      <ImgWrap>
        <LogoNameImg src={ImgLogoName} alt="얼스어스 로고 이미지" />
        <EarthImg src={ImgEarth} alt="웃고있는 지구" />
      </ImgWrap>
    </>
  );
}
