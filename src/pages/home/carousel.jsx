import styled from "styled-components";
import React from "react";
import tagData from "data/tagData.json";
import foodTagData from "data/foodTagData.json";
import { v4 as uuid } from "uuid";
import { GiMuscleUp } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Carousel({ setActiveTag }) {
  const { posts } = useSelector((state) => state.postsFirestoreState);
  const { category } = useParams();

  const onClickTagNameHandler = (post) => {
    setActiveTag(post.hashtag);
  };

  const tagsToDisplay = category === "오운완" ? tagData : category === "오식완" ? foodTagData : [];

  return (
    <StCarouselBox>
      {tagsToDisplay.map((post) => {
        return (
          <StCarouselWrapper key={uuid()}>
            <StCarouselImgWrapper onClick={() => onClickTagNameHandler(post)}>
              <img src={post.image} alt="{post.hashtag}"></img>
              <StIcon>
                <GiMuscleUp />
              </StIcon>
            </StCarouselImgWrapper>
            <h2>{post.hashtag}</h2>
          </StCarouselWrapper>
        );
      })}
    </StCarouselBox>
  );
}

export default Carousel;

const StCarouselBox = styled.ul`
  width: 100%;
  max-width: 100vw;
  padding-top: 10px;
  display: flex;
  overflow-x: auto;
  justify-content: center;
  gap: 20px;
`;

const StCarouselImgWrapper = styled.figure`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
    overflow: hidden;
    position: absolute;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.color.baseLight};
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    /* display: flex;
    align-items: center;
    justify-content: center; */
  }

  @media (max-width: 760px) {
    width: 60px;
    height: 60px;
  }
`;

const StIcon = styled(GiMuscleUp)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: ${({ theme }) => theme.color.white};
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const StCarouselWrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;

  & h2 {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 500;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.baseDark};
    padding: 4px 8px;
    border-radius: 10px;
    cursor: pointer;
  }

  &:hover {
    & ${StCarouselImgWrapper} img {
      opacity: 0;
    }
    & ${StCarouselImgWrapper}::before {
      opacity: 1;
    }

    & svg {
      opacity: 1;
    }

    & h2 {
      background-color: ${({ theme }) => theme.color.baseLight};
      color: ${({ theme }) => theme.color.white};
    }
  }
`;
