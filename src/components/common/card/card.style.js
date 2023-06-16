import styled from "styled-components";

const Cards = styled.article`
  display: flex;
  flex-direction: column;
  gap: var(--size-gap);
`;

const ImgWrap = styled.div`
  width: 100%;
  aspect-ratio: 3/2;
  border: 0.5px solid var(--color-light);
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-gray-46);
`;

const Reaction = styled.div`
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

const Time = styled.p`
  font-size: var(--font-size-xs);
  color: var(--color-gray-76);
`;

export { Cards, ImgWrap, Content, Reaction, Time };
