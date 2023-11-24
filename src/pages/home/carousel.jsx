import styled from "styled-components";
import React, { useState } from "react";
import tagData from "data/tagData.json";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { GiMuscleUp } from "react-icons/gi";
import SvgBox from "components/svgbox";

function Carousel() {
  // const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postsFirestoreState);
  const [activeTag, setActiveTag] = useState("");

  const onClickTagNameHandler = (post) => {
    console.log(post.hashtag);
    setActiveTag(post.hashtag);
  };

  return (
    <StCarouselBox>
      {tagData.map((post) => {
        return (
          <StCarouselWrapper>
            <StCarouselImgWrapper key={uuid()} onClick={() => onClickTagNameHandler(post)}>
              <img src={post.image} alt="{post.hashtag}"></img>
              <StIcon />
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
  width: 1000px;
  margin: 1rem auto;
  padding: 10px;
  display: flex;
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
    display: flex;
    align-items: center;
    justify-content: center;
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

  ${StCarouselImgWrapper}:hover & {
    opacity: 1;
  }
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
  }

  &:hover {
    & ${StCarouselImgWrapper} img {
      opacity: 0;
    }
    & ${StCarouselImgWrapper}::before {
      opacity: 1;
    }

    & h2 {
      background-color: ${({ theme }) => theme.color.baseLight};
      color: ${({ theme }) => theme.color.white};
    }
  }
`;
