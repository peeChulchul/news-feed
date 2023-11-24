import React from "react";
import styled from "styled-components";
import FeedCard from "../feedCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function FeedList() {
  // const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.firestoreState);
  const { category } = useParams();

  return (
    <StListWrapper>
      <StFeedList>
        {category
          ? posts
              .filter((feed) => feed.category === category)
              .map((feed) => {
                return <FeedCard feed={feed} />;
              })
          : posts.map((feed) => {
              return <FeedCard feed={feed} />;
            })}
        {category
          ? posts
              .filter((feed) => feed.category === category)
              .map((feed) => {
                return <FeedCard feed={feed} />;
              })
          : posts.map((feed) => {
              return <FeedCard feed={feed} />;
            })}
      </StFeedList>
    </StListWrapper>
  );
}

export default FeedList;

const StListWrapper = styled.ul`
  width: 1000px;
  background-color: ${({ theme }) => theme.color.white};
  margin: 30px auto;
  display: flex;
  justify-content: center;
`;

const StFeedList = styled.div`
  width: 850px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
`;
