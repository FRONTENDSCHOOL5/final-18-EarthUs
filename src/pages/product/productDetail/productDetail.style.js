import styled from "styled-components";

const ProdDetailWrap = styled.section`
  h2 {
    font-size: 1.5rem;
    flex: 1 0 100%;
  }
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    > div {
      width: min(100%, calc(50% - 0.5rem));
      flex: 0 1 calc(50% - 0.5rem);
      margin: 0;
    }
  }
  p {
    > span {
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      min-height: 3rem;
    }
  }
  button + button {
    margin: 0 0 0 0.25rem;
  }
  .swiper-wrapper {
    align-items: center;
    width: 100%;
    .swiper-slide {
      margin: 0;
      width: 100% !important;
    }
  }
`;

export default ProdDetailWrap;
