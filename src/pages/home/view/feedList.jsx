import React from "react";
import styled from "styled-components";
import FeedCard from "../feedCard";

function FeedList() {
  return (
    <StListWrapper>
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </StListWrapper>
  );
}

export default FeedList;

const StListWrapper = styled.ul`
  width: 1000px;
  background-color: ${({ theme }) => theme.color.white};
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;
