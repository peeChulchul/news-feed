import React from "react";
import styled from "styled-components";
import FeedCard from "./feedCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function FeedList({ activeTag }) {
  const { posts } = useSelector((state) => state.postsFirestoreState);
  const { currentUser } = useSelector((state) => state.usersFirestoreState);
  const { category, userid } = useParams();

  return (
    <StListWrapper>
      {userid ? (
        <StFeedList>
          {posts
            .filter((feed) => feed.uid === currentUser.uid)
            .map((feed) => (
              <div>
                <FeedCard feed={feed} key={feed.postid} />
              </div>
            ))}
        </StFeedList>
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
      {/* <StFeedList>
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
      </StFeedList> */}
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
