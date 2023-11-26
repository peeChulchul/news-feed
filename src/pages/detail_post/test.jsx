import React, { useState } from "react";
import styled from "styled-components";
import Hashtag from "components/hashtag";
import { v4 as uuid } from "uuid";
function Test({ data }) {
  const { displayName, content, imgs, category, hashtag, postid, uid } = data;
  const [currentImg, setCurrentImg] = useState(imgs[0]);

  const onClickSubImg = (imgURL) => {
    // setCurrentImg(imgURL)
    console.log(imgURL);
  };

  return (
    <StWrap>
      <div className="row">nickname</div>
      <StImgWrap>
        <img src={currentImg.url} alt="" />
      </StImgWrap>
      <div className="row">
        {imgs.map((n) => {
          return (
            <StSubImgWrap onClick={() => onClickSubImg(n)}>
              <img src={n.url} alt="" />
            </StSubImgWrap>
          );
        })}
      </div>
      <div className="row">
        <Hashtag hashtag={"true"} content={category} color={"white"} fontColor={"base"} />
        {hashtag.map((n) => {
          <Hashtag hashtag={"true"} content={n} color={"base"} fontColor={"white"} key={uuid()} />;
        })}
      </div>
      <div className="row">
        <p>{content}</p>
      </div>
    </StWrap>
  );
}

const StWrap = styled.div`
  width: 100%;
  &.row {
    display: flex;
    padding: ${({ theme }) => theme.spacing.base};
    gap: ${({ theme }) => theme.spacing.base};
  }
`;

const StImgWrap = styled.figure`
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StSubImgWrap = styled.figure`
  width: 8rem;
  height: 6rem;
  justify-content: center;
  align-items: center;

  & img {
    width: 100%;
  }
`;

export default Test;
