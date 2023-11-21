import React from "react";
import styled from "styled-components";
import FeedCard from "components/feedCard";

function FeedList() {
  return (
    <StListWrapper>
      <FeedCard />
    </StListWrapper>
  );
}

export default FeedList;

const StListWrapper = styled.ul`
  width: 1000px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
