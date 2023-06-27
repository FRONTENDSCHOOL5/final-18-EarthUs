/* eslint-disable consistent-return */
import styled, { css } from "styled-components";

const ProfileFeedWrap = styled.article`
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

const FeedView = styled.div`
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
      img {
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 0.25rem;
      }
      a {
        flex: 0 1 calc((100% - 2rem) / 3);
        display: inline-block;
        position: relative;
        span {
          position: absolute;
          right: 0.5rem;
          top: 0.5rem;
        }
      }
    `}
`;

const ViewBtn = styled.button`
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

export { ProfileFeedWrap, FeedView, ViewBtn };
