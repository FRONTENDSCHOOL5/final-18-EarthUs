import styled from "styled-components";

import share from "../../assets/images/share.svg";

const ProfileHeaderWrap = styled.article`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  h2 {
    flex: 0 1 0;
    order: 2;
  }
  h3 {
    font-size: var(--font-size-xxl);
    display: inline-block;
  }
  ul {
    flex: 1 0 calc(100% - (4rem + 2rem));
    overflow: hidden;
    li {
      margin: 0 0;
      font-size: var(--font-size-md);
      span {
        color: var(--color-black);
      }
    }
  }
  .share {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    h3 {
      flex: 1 1 calc(100% - 2.5rem);
      span {
        color: var(--color-primary);
        font-size: var(--font-size-sm);
        display: block;
        font-weight: 400;
      }
    }
    button {
      width: 2.5rem;
      height: 2.5rem;
      vertical-align: top;
      background: url(${share}) no-repeat center / 1.5rem;
      filter: invert(0.7);
    }
  }
  .intro {
    margin: 0.25rem 0;
    color: var(--color-gray-76);
  }
  .follow {
    font-weight: 400;
    display: flex;
    a {
      font-size: var(--font-size-xs);
      color: var(--color-gray-76);
      display: inline-block;
      + a {
        padding: 0 0.5rem;
      }
      strong {
        vertical-align: middle;
        font-size: var(--font-size-lg);
        color: var(--color-black);
        padding: 0 0.25rem;
      }
    }
  }
`;

const ProfileButtonArea = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  Button {
    flex: 1 0 calc(50% - 0.5rem);
  }
`;

const ShareButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 32px var(--size-gap);
`;

const KakaoShareButton = styled.button`
  background-color: #fde500;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  img {
    filter: invert(12%) sepia(13%) saturate(1767%) hue-rotate(314deg)
      brightness(91%) contrast(95%);
  }
`;

const UrlShareButton = styled.button`
  user-select: none;
  border: 0;
  padding: 0;
  background-color: var(--color-secondary);
  color: var(--color-white);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: var(--font-size-md);
  font-weight: 700;
`;

export {
  ProfileHeaderWrap,
  ProfileButtonArea,
  ShareButtons,
  KakaoShareButton,
  UrlShareButton,
};
