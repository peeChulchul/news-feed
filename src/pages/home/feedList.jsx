import React from "react";
import styled from "styled-components";
import FeedCard from "./feedCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function FeedList({ activeTag }) {
  const { posts, loading } = useSelector((state) => state.postsFirestoreState);
  const { currentUser } = useSelector((state) => state.usersFirestoreState);
  const { category, userid } = useParams();

  return (
    <StListWrapper>
      {userid ? (
        <>
          {posts.filter((feed) => feed.uid === currentUser.uid).length > 0 && (
            <StFeedList>
              {posts
                .filter((feed) => feed.uid === currentUser.uid)
                .map((feed) => (
                  <div key={feed.postid}>
                    <FeedCard feed={feed} />
                  </div>
                ))}
            </StFeedList>
          )}

          {posts.filter((feed) => feed.uid === currentUser.uid).length === 0 && (
            <div>
              <h1 style={{ fontSize: 24, textAlign: "center", width: "100%" }}>작성한 글이 없어요! 🥲</h1>
            </div>
          )}
        </>
      ) : (
        <StFeedList>
          {category
            ? posts
                .filter((feed) => feed.category === category && (!activeTag || feed.hashtag.includes(activeTag)))
                .map((feed) => {
                  return (
                    <div key={feed.postid}>
                      <FeedCard feed={feed} />
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
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
`;

const StFeedList = styled.div`
  gap: 8px;
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(100px, 1fr));
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }
`;
