import React from "react";
import styled from "styled-components";
import FeedCard from "./feedCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function FeedList({ activeTag }) {
  const { posts, loading } = useSelector((state) => state.postsFirestoreState);
  const { category } = useParams();

  console.log(loading);

  return (
    <StListWrapper>
      {loading ? (
        <>로딩중</>
      ) : (
        <StFeedList>
          {category
            ? posts
                .filter((feed) => feed.category === category && (!activeTag || feed.hashtag.includes(activeTag)))
                .map((feed) => {
                  return (
                    <div>
                      <FeedCard feed={feed} key={feed.postid} />
                    </div>
                  );
                })
            : posts
                .filter((feed) => !activeTag || feed.hashtag.includes(activeTag))
                .map((feed) => {
                  return <FeedCard feed={feed} key={feed.postid} />;
                })}
        </StFeedList>
      )}
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
