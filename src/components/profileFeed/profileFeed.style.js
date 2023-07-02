/* eslint-disable consistent-return */
import styled, { css } from "styled-components";

export const ProfileFeedWrap = styled.article`
  width: 100%;
  padding: 1.5rem 0;

  header {
    margin: 0;
    text-align: right;

    h2 {
      margin: 0;
    }
  }
`;

export const FeedView = styled.div`
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;

  > article {
    flex: 1 0 100%;
  }
  ${({ currentMode }) =>
    currentMode === "grid" &&
    css`
      gap: 1rem;
      a {
        flex: 1 0 calc((100% - 2rem) / 3);
        width: 100%;
        height: 100%;
        aspect-ratio: 1/1;
        border-radius: 0.5rem;
        background: var(--color-bg);
        border: 1px solid var(--color-light);
        overflow: hidden;
        object-fit: cover;
        position: relative;

        span {
          position: absolute;
          right: 0.5rem;
          top: 0.5rem;
          img {
            border: none;
          }
        }
      }
    `}
`;

export const Img = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;

  ${({ hasError }) =>
    hasError &&
    css`
      width: 100px;
      height: 90px;
      object-fit: contain;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `}
`;

export const ViewBtn = styled.button`
  display: inline-block;
  width: 3rem;
  height: 3rem;
  background: url(${props => props.icon}) no-repeat center/1.5rem;
  filter: invert(0.7);

  ${({ active }) =>
    active &&
    css`
      filter: invert(0);
    `}
`;
