import styled, { css } from "styled-components";

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  margin-top: 48px;
`;

export const H2 = styled.h2`
  font-size: var(--font-size-title);
  font-weight: 600;
  color: var(--color-black);
  text-align: center;
`;

export const P = styled.p`
  font-size: var(--font-size-md);
  font-weight: 400;
  color: var(--color-gray-76);
  text-align: center;
`;

export const ProfileImgInput = styled.input`
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

export const Label = styled.label`
  position: absolute;
  top: 70%;
  left: 83%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 20px;
  z-index: 2;
`;

export const ImgAddBtn = styled.button`
  position: absolute;
  top: 70%;
  left: 83%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 20px;
  background-color: var(--color-primary);
`;

export const ImgBtn = styled.img`
  &.cameraIcon {
    filter: invert(95%) sepia(0%) saturate(0%) hue-rotate(140deg)
      brightness(104%) contrast(107%);
  }
`;

export const ImgFrame = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-light);
  border-radius: 110px;
`;

export const Img = styled.img`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${props =>
    props.src === "https://api.mandarin.weniv.co.kr/1687097552358.png" &&
    css`
      transform: scale(0.6);
      object-fit: none;
    `};
`;

export const ProfileImgSection = styled.section`
  position: relative;
`;

export const ProfileTitleSection = styled.section`
  margin: 36.33px 0 24px 0;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
