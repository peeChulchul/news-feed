import React from "react";
import styled from "styled-components";
import { IoMdHeartEmpty } from "react-icons/io";
import Avatar from "components/avatar";
import FeedHashtag from "./feedHashtag";

function FeedCard({ feed }) {
  return (
    <StCardWrapper onClick={() => alert("안녕")}>
      <StFeedInfo>
        <StUserInfo>
          <Avatar />
          <div>
            <h2>{feed.postid}</h2>
            <p>
              <span>like</span> {feed.like}
            </p>
          </div>
        </StUserInfo>
        <StLikeIcon>
          <IoMdHeartEmpty />
        </StLikeIcon>
      </StFeedInfo>
      <StFeedImg>
        <img src={feed.imgs} alt="피드이미지"></img>
      </StFeedImg>
      <StContentWarapper>
        <FeedHashtag hashtag={feed.hashtag} />
        <p>{feed.content}</p>
      </StContentWarapper>
    </StCardWrapper>
  );
}

export default FeedCard;

const StCardWrapper = styled.li`
  width: 270px;
  background-color: #e0dddd;
  border-radius: 8px;
  padding: 1rem;
  flex: 0;
  cursor: pointer;
`;

const StFeedImg = styled.figure`
  width: 240px;
  height: 200px;
  background-color: ${({ theme }) => theme.color.disable};
  overflow: hidden;
  border-radius: 5px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StFeedInfo = styled.div`
  margin: 10px 0 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & p {
    font-size: 0.7rem;
  }
  & h2 {
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

const StUserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 7px;
  & div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  & span {
    color: ${({ theme }) => theme.color.base};
    font-weight: 700;
  }
`;

const StContentWarapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0.75rem 0;
  gap: 0.75rem;
  & p {
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StLikeIcon = styled.div`
  font-size: 23px;
`;
