import React, { useState } from "react";
import styled from "styled-components";
import Hashtag from "components/hashtag";
import { v4 as uuid } from "uuid";
import { GrPrevious, GrNext } from "react-icons/gr";
import ListOption from "components/listOption";
function DetailPostContent({ data }) {
  const { displayName, content, imgs, category, hashtag, postid, uid } = data;
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const onClickSubImg = (index) => {
    setCurrentImgIndex(index);
  };

  const showNextImg = (boolean) => {
    if (boolean) {
      const nextImgIndex = currentImgIndex + 1;
      nextImgIndex >= imgs.length ? setCurrentImgIndex(0) : setCurrentImgIndex(nextImgIndex);
    } else {
      const preImgIndex = currentImgIndex - 1;
      preImgIndex < 0 ? setCurrentImgIndex(imgs.length - 1) : setCurrentImgIndex(preImgIndex);
    }
  };

  return (
    <StWrap>
      <StRow className="header">
        <div>{displayName}</div>
        <ListOption />
      </StRow>
      <StRow className="center">
        <StImgWrap $bgImg={imgs[currentImgIndex].url}>
          {/* <img src={imgs[currentImgIndex].url} alt="" /> */}
          {imgs.length > 1 && (
            <>
              <StImgControler className="left" onClick={() => showNextImg(false)}>
                <GrPrevious />
              </StImgControler>
              <StImgControler className="right" onClick={() => showNextImg(true)}>
                <GrNext />
              </StImgControler>
            </>
          )}
        </StImgWrap>
      </StRow>
      <StRow className="center">
        {imgs.map((n, i) => {
          return (
            <StSubImgWrap
              className={currentImgIndex === i ? "active" : null}
              onClick={() => onClickSubImg(i)}
              key={uuid()}
            >
              <img src={n.url} alt="" />
            </StSubImgWrap>
          );
        })}
      </StRow>

      <StRow>
        <Hashtag hashtag={"true"} content={category} color={"white"} $fontcolor={"base"} />
        {hashtag.map((n) => {
          return <Hashtag hashtag={"true"} content={n} color={"base"} $fontcolor={"white"} key={uuid()} />;
        })}
      </StRow>
      <StRow>
        <p>{content}</p>
      </StRow>
      <StRow className="comment">
        <h1>댓글 0개</h1>
        <ul>
          <li>현재 댓글기능은 지원하지 않습니다.</li>
        </ul>
      </StRow>
    </StWrap>
  );
}

const StWrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg} 0px;
`;

const StRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.base};

  &.center {
    justify-content: center;
    align-items: center;
  }

  &.header {
    justify-content: space-between;
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  &.comment {
    flex-direction: column;
    & h1 {
      font-size: ${({ theme }) => theme.fontSize.lg};
      font-weight: bold;
      margin-bottom: ${({ theme }) => theme.spacing.base};
    }

    & ul {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing.base};
    }
  }
`;

const StIconWrap = styled.span`
  cursor: pointer;
  position: relative;
  &:hover {
    color: ${({ theme }) => theme.color.base};
  }
`;

const StImgWrap = styled.figure`
  position: relative;
  padding-bottom: 70%;
  width: 100%;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    background-image: url(${(props) => props.$bgImg});

    background-size: cover;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }
`;
// const StImgWrap = styled.figure`
//   width: 800px;
//   height: 600px;
//   text-align: center;
//   position: relative;
//   overflow: hidden;

//   &::before {
//     content: "";
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 150%;
//     height: 150%;
//     background-position: center;
//     background-image: url(${(props) => props.$bgImg});
//     z-index: -1;
//     filter: blur(30px) brightness(0.5);
//   }

//   & img {
//     height: 100%;
//   }
// `;

const StImgControler = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  line-height: 0;
  padding: 1rem;
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.color.white};
  border: 3px solid rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: ${({ theme }) => theme.animation.transition};

  &.left {
    left: ${({ theme }) => theme.spacing.base};
  }

  &.right {
    right: ${({ theme }) => theme.spacing.base};
  }

  &:hover {
    border: 3px solid white;
  }
`;

const StSubImgWrap = styled.figure`
  height: 100px;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: ${({ theme }) => theme.animation.transition};
  cursor: pointer;
  filter: brightness(0.5);

  & img {
    width: auto;
    height: 100%;
  }

  &:hover,
  &.active {
    filter: brightness(1);
  }
`;

export default DetailPostContent;
