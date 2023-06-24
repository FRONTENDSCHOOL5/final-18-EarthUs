import styled from "styled-components";

import Camera from "../../../assets/images/camera.svg";

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  > section {
    width: 100%;
  }
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
  top: calc(50% - 2rem);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3rem;
  height: 3rem;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  cursor: pointer;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: calc(50% + 1rem);
    left: calc(50% + 1rem);
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  &::before {
    background: var(--color-primary);
  }
  &::after {
    background: url(${Camera}) no-repeat center/1.5rem;
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
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 2.5rem;
`;

export const Img = styled.img`
  display: block;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

export const ProfileImgSection = styled.section`
  position: relative;
`;

export const ProfileTitleSection = styled.section`
  width: 100%;
  margin: 0 0 2.5rem;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
