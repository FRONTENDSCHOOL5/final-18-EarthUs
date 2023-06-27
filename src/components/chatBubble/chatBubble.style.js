import styled from "styled-components";

export const BringArticle = styled.article`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const BringMessage = styled.div`
  background-color: var(--color-white);
  margin-left: 9px;
  min-height: 42px;
  padding: 12px;
  border: 1px solid #c4c4c4;
  border-radius: 0px 10px 10px 10px;
  color: var(--color-black);
  font-size: var(--font-size-xs);
  font-weight: 400;
`;

export const SendArticle = styled.article`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 10px;
`;

export const SendMessage = styled.div`
  background-color: var(--color-primary);
  min-height: 42px;
  padding: 12px;
  border: 1px solid var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-xs);
  font-weight: 400;
  max-width: 50%;
  border-radius: 10px 0px 10px 10px;
`;

export const MessageTime = styled.div`
  color: var(--color-gray-76);
  font-size: var(--font-size-micro);
  margin: 6px;
`;

export const StyledMessageTime = styled.div`
  max-width: 66%;
  display: flex;
  align-items: flex-end;
`;

export const BringMessageTime = styled.div`
  color: var(--color-gray-76);
  font-size: var(--font-size-micro);
  margin: 6px;
`;
