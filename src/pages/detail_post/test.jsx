import React, { useState } from "react";
import styled from "styled-components";
import Hashtag from "components/hashtag";
import { v4 as uuid } from "uuid";
function Test({ data }) {
  const { displayName, content, imgs, category, hashtag, postid, uid } = data;
  const [currentImg, setCurrentImg] = useState(
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.aitimes.kr%2Fnews%2FarticleView.html%3Fidxno%3D27617&psig=AOvVaw1Ihi6HRg5-04ihcfx0XSDA&ust=1700920267779000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPjOtPXj3IIDFQAAAAAdAAAAABAJ"
  );

  const onClickSubImg = (imgURL) => {
    // setCurrentImg(imgURL)
    console.log(imgURL);
  };

  return (
    <StWrap>
      <div className="row">nickname</div>
      <StImgWrap>
        <img src={currentImg} alt="" />
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
        {/* {hashtag.map((n) => {

        })} */}
      </div>
      <div className="row"></div>
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
  height: 20rem;
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
