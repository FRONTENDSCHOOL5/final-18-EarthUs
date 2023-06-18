import styled from "styled-components";

const Cards = styled.article`
  display: flex;
  flex-direction: column;
  gap: var(--size-gap);
  max-width: 100%;
  overflow: hidden;
  .imgWrap {
    max-width: 100%;
    aspect-ratio: 1/1;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid var(--color-light);
    background: var(--color-bg);
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Content = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-gray-46);
  strong {
    display: block;
    font-size: var(--font-size-lg);
    color: var(--color-gray-2);
    margin: 0 0 0.5rem;
  }
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

export { Cards, Content, Reaction, Time };
