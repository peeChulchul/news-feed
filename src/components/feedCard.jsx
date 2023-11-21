import React from "react";
import styled from "styled-components";
import { SlUserFollowing } from "react-icons/sl";
import { FcLike } from "react-icons/fc";
import { CgGym } from "react-icons/cg";

function FeedCard() {
  let now = new Date();

  return (
    <CardWrapper>
      <StFeedImg>
        <img src="https://image.ytn.co.kr/general/jpg/2020/1130/202011300700017010_d.jpg" alt="피드이미지"></img>
      </StFeedImg>
      <StFeedInfo>
        <div>
          <p>{String(now.toLocaleString())}</p>
          <h2>sweet_potato</h2>
        </div>
        <StAvatar>
          <img
            src="https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
            alt="프로필이미지"
          ></img>
        </StAvatar>
      </StFeedInfo>
      <StFeedLike>
        <div>
          <CgGym />
          <h3>15</h3>
        </div>
        <div>
          <SlUserFollowing />
          <h3>1,000</h3>
        </div>
        <div>
          <FcLike />
          <h3>300</h3>
        </div>
      </StFeedLike>
    </CardWrapper>
  );
}

export default FeedCard;

const CardWrapper = styled.li`
  width: 280px;
  height: 350px;
  background-color: ${({ theme }) => theme.color.baseLight};
  border-radius: 8px;
  margin: 20px;
`;

const StFeedImg = styled.figure`
  width: 260px;
  height: 170px;
  background-color: ${({ theme }) => theme.color.disable};
  overflow: hidden;
  margin: 10px auto;
  border-radius: 5px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StFeedInfo = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  & p {
    font-size: 0.75rem;
  }
  & h2 {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const StAvatar = styled.figure`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StFeedLike = styled.section`
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & div {
    width: 70px;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;
