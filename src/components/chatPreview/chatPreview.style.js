import styled from "styled-components";

export const Article = styled.article`
  margin-top: 24px;
`;

export const Section = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

export const BlueRound = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  left: 1px;
  top: 1px;
  background-color: #3fa9f5;
  border-radius: 10px;
  z-index: 20;
`;

export const Div = styled.article`
  flex: 1 0 0;
`;

export const Strong = styled.h3`
  font-size: var(--font-size-md);
  font-weight: 400;
  color: var(--color-black);
`;

export const P = styled.p`
  font-size: var(--font-size-xs);
  font-weight: 400;
  color: var(--color-gray-76);
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`;

export const Time = styled.time`
  font-size: var(--font-size-xs);
  font-weight: 400;
  color: var(--color-gray-76);
`;
