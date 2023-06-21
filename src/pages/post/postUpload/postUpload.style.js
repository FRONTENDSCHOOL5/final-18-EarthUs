import styled, { css } from "styled-components";

import IconCamera from "../../../assets/images/camera.svg";
import Nodata from "../../../assets/images/no-data.svg";
import Input from "../../../components/common/input/Input";

const PostUploadWrap = styled.section`
  width: 100%;
  height: 100%;
`;

const InputPrevWrap = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const InputFile = styled(Input)`
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  label {
    height: 200px;
    background: #0f0;
  }
  // 값이 입력되거나 포커스 상태일 때
  &.filled,
  &:focus {
    border-bottom-color: var(--color-primary);
  }

  // 에러 클래스가 되었을 때
  &.error {
    border-bottom-color: var(--color-error);
  }
`;

const ImgLabel = styled.div`
  position: relative;
  padding: 1.5rem 0;
  min-height: 4rem;
  ${({ data }) =>
    data &&
    css`
      width: 100%;
      height: 20rem;
      display: inline-block;
      position: relative;
      aspect-ratio: 3/2;
      margin: 8px 0 40px;
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

  ${({ data }) =>
    !data &&
    css`
      position: relative;
      float: right;
      inset: 0;
    `};
`;

export { PostUploadWrap, InputFile, ImgLabel, ImgUploadButton, InputPrevWrap };
