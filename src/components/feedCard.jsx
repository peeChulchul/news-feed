import React from "react";
import styled from "styled-components";

function FeedCard() {
  return <CardWrapper>FeedCard</CardWrapper>;
}

export default FeedCard;

const CardWrapper = styled.li`
  width: 300px;
  height: 350px;
  background-color: ${({ theme }) => theme.color.base};
  border-radius: 8px;
  margin: 20px;
`;
