import React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Hashtag from "components/hashtag";
import { IoMdHeartEmpty } from "react-icons/io";
import Avatar from "components/avatar";
import { useNavigate } from "react-router";

function FeedCard({ feed }) {
  const navigate = useNavigate();

  const onClickFeedHandler = () => {
    navigate(`/posts/${feed.uid}/${feed.postid}`);
  };

  const timestamp =
    feed.timesteamp === null ? "대기중" : feed.timesteamp.toDate().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

  return (
    <StCardWrapper onClick={onClickFeedHandler}>
      <StFeedInfo>
        <StUserInfo>
          <Avatar src={feed?.photoURL} />
          <div>
            <h2>{feed.displayName}</h2>
            <p>
              <span>{timestamp}</span> {feed.like}
            </p>
          </div>
        </StUserInfo>
        <StLikeIcon>
          <IoMdHeartEmpty />
        </StLikeIcon>
      </StFeedInfo>
      <StFeedImg>
        <img src={feed.imgs[0].url} alt="피드이미지" />
      </StFeedImg>
      <StContentWarapper>
        <StTagBox>
          {
            <Hashtag
              hashtag={false}
              content={feed.category}
              size={"sm"}
              key={uuid()}
              color={"base"}
              $fontcolor={"white"}
            />
          }
          {feed.hashtag.map((tag) => {
            return <Hashtag hashtag={true} content={tag} size={"sm"} key={uuid()} $fontcolor={"baseDark"} />;
          })}
        </StTagBox>
        <p>{feed.content}</p>
      </StContentWarapper>
    </StCardWrapper>
  );
}

export default FeedCard;

const StCardWrapper = styled.li`
  background-color: #e0dddd;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;

const StFeedImg = styled.figure`
  padding-bottom: 80%;
  position: relative;

  border-radius: 5px;
  & img {
    position: absolute;
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
    font-size: 1rem;
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
    color: ${({ theme }) => theme.color.black};
    font-weight: 400;
  }
`;

const StContentWarapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0.75rem 0;
  gap: 0.75rem;
  & p {
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StLikeIcon = styled.div`
  font-size: 23px;
`;

const StTagBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
