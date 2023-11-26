import React, { useState } from "react";
import styled from "styled-components";
import Hashtag from "components/hashtag";
import { v4 as uuid } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrPrevious, GrNext } from "react-icons/gr";
function Test({ data }) {
  const { displayName, content, imgs, category, hashtag, postid, uid } = data;
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const onClickSubImg = (index) => {
    setCurrentImgIndex(index);
  };

  const showNextImg = (boolean) => {
    if (boolean) {
      const nextImgIndex = currentImgIndex + 1;
      nextImgIndex >= imgs.length ? setCurrentImgIndex(0) : setCurrentImgIndex(nextImgIndex);
    }
    const preImgIndex = currentImgIndex - 1;
    preImgIndex < 0 ? setCurrentImgIndex(imgs.length - 1) : setCurrentImgIndex(preImgIndex);
  };

  return (
    <StWrap>
      <StRow className="header">
        <div>{displayName}</div>
        <div>
          <StIconWrap>
            <MdDelete />
          </StIconWrap>
          <StIconWrap>
            <FaEdit />
          </StIconWrap>
        </div>
      </StRow>
      <StRow className="center">
        <StImgWrap backgroundImg={imgs[currentImgIndex].url}>
          <img src={imgs[currentImgIndex].url} alt="" />

          <StImgControler className="left" onClick={() => showNextImg(false)}>
            <GrPrevious />
          </StImgControler>
          <StImgControler className="right" onClick={() => showNextImg(true)}>
            <GrNext />
          </StImgControler>
        </StImgWrap>
      </StRow>
      <StRow className="center">
        {imgs.map((n, i) => {
          return (
            <StSubImgWrap className={currentImgIndex === i ? "active" : null} onClick={() => onClickSubImg(i)}>
              <img src={n.url} alt="" />
            </StSubImgWrap>
          );
        })}
      </StRow>

      <StRow>
        <Hashtag hashtag={"true"} content={category} color={"white"} fontColor={"base"} />
        {hashtag.map((n) => {
          return <Hashtag hashtag={"true"} content={n} color={"base"} fontColor={"white"} key={uuid()} />;
        })}
      </StRow>
      <StRow>
        <p>{content}</p>
      </StRow>
      <StRow className="direction-col ">
        <h1>댓글 0개</h1>
        <ul>
          <li>현재 댓글기능은 지원하지 않습니다.</li>
        </ul>
      </StRow>
    </StWrap>
  );
}

const StWrap = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 3px solid red;
`;

const StRow = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.base};

  &.center {
    justify-content: center;
    align-items: center;
  }

  &.header {
    justify-content: space-between;
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  &.direction-col {
    flex-direction: column;
  }
`;

const StIconWrap = styled.span`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const StImgWrap = styled.figure`
  width: 800px;
  height: 600px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 150%;
    height: 150%;
    background-position: center;
    background-image: url(${({ backgroundImg }) => backgroundImg});
    z-index: -1;
    filter: blur(30px) brightness(0.5);
  }

  & img {
    height: 100%;
  }
`;

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
  cursor: pointer;

  &.left {
    left: ${({ theme }) => theme.spacing.base};
  }

  &.right {
    right: ${({ theme }) => theme.spacing.base};
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

export default Test;
