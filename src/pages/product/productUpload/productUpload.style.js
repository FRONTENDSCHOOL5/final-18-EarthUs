import styled, { css } from "styled-components";

import IconCamera from "../../../assets/images/camera.svg";
import Input from "../../../components/common/input/Input";
import { NO_IMAGE } from "../../../utils/config";

const InputFile = styled(Input)`
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const ImgLabel = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  margin: 8px 0 40px;

  ${({ data }) =>
    data &&
    css`
      width: 100%;
      aspect-ratio: 3/2;
      display: inline-block;
      position: relative;
      background-color: var(--color-bg);
      border: 0.5px solid var(--color-light);
      border-radius: 10px;
      overflow: hidden;
    `};
`;

const Img = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${props =>
    props.src === NO_IMAGE &&
    css`
      width: 50px;
      height: 45px;
      object-fit: contain;
    `};
`;

const ImgUploadButton = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--color-primary);
  cursor: pointer;
  transition: all 0.4s ease-out;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: url(${IconCamera}) no-repeat center/1.5rem;
    filter: invert(100%) sepia(0%) saturate(7491%) hue-rotate(183deg)
      brightness(99%) contrast(97%);
  }

  &:hover {
    filter: brightness(0.9);
  }

  &:focus-visible {
    outline: #000 solid 2px;
  }
`;

export { InputFile, ImgLabel, Img, ImgUploadButton };
