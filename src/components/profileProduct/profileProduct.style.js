import styled from "styled-components";

import arrow from "../../assets/images/chevron-right.svg";

const ProfileProductList = styled.article`
  header {
    display: flex;
    align-items: center;
    h2 {
      margin: var(--size-gap) 0;
      font-size: var(--font-size-xl);
      display: inline-block;
      flex: 1 0 0;
    }
    a {
      display: inline-block;
      width: 2.5rem;
      height: 2.5rem;
      background: url(${arrow}) no-repeat center/1.5rem;
      filter: invert(0.7);
    }
  }
  .swiper-container {
    margin: 0 calc(var(--size-gap) * -1);
    .swiper-wrapper {
      figcaption {
        align-items: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .swiper-container {
        margin: 0;
      }
    }
  }
`;

export default ProfileProductList;
