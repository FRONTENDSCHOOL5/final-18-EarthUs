import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const Cards = styled.article`
  display: flex;
  flex-direction: column;
  gap: var(--size-gap);
  max-width: 100%;
  overflow: hidden;
`;

const CardWrapper = css`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.5rem;
  background: var(--color-bg);
  border: 1px solid var(--color-light);
  overflow: hidden;
  object-fit: cover;
  position: relative;
`;

export const FigureWrap = styled.figure`
  position: relative;
  margin: 0;
  figcaption {
    margin: var(--size-gap) 0;
    strong {
      display: block;
    }
  }

  .swiper-container {
    ${CardWrapper}
    .swiper-pagination {
      .swiper-pagination-bullet {
        width: 1rem;
        height: 1rem;
        opacity: 0.5;
      }
      .swiper-pagination-bullet-active {
        opacity: 1;
        background: var(--color-primary);
      }
    }
  }
`;

export const ImgWrap = styled.div`
  ${CardWrapper}
`;

export const Img = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  position: relative;
  ${({ hasError }) =>
    hasError &&
    css`
      width: 100;
      height: 90px;
      object-fit: contain;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `};
`;

export const PostLink = styled(Link)`
  position: relative;
`;

export const Content = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-gray-46);
  margin: 24px 0;
  strong {
    display: block;
    font-size: var(--font-size-md);
    color: var(--color-gray-2);
    margin: 0 0 0.5rem;
  }
`;

export const Reaction = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--size-gap);
  align-items: center;

  img {
    filter: invert(80%) sepia(0%) saturate(7467%) hue-rotate(168deg)
      brightness(89%) contrast(96%);
  }

  span {
    margin-left: 4px;
    font-size: var(--font-size-xs);
    color: var(--color-gray-76);
  }
`;

export const Time = styled.p`
  font-size: var(--font-size-xs);
  color: var(--color-gray-76);
`;

export const LayerIcon = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 10;
`;
