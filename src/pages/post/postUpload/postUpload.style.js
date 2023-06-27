import styled, { css } from "styled-components";

import IconCamera from "../../../assets/images/camera.svg";
import Nodata from "../../../assets/images/no-data.svg";

export const InputPrevWrap = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const ImgLabel = styled.span`
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

      &::before {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url(${Nodata}) no-repeat center/100px 90px;
      }
    `};
`;

export const ImgUploadButton = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: 1rem 0;
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

  ${({ data }) =>
    !data &&
    css`
      position: relative;
      float: right;
      inset: 0;
    `};
`;
