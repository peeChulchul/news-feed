import React, { useState } from "react";
import styled from "styled-components";
import tagData from "data/tagData.json";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";

function CarouselTag() {
  // const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.firestoreState);
  const [activeTag, setActiveTag] = useState(posts);

  const onClickTagNameHandler = (post) => {
    setActiveTag(post.hashtag);
  };

  //   }
  // };

  return (
    <StCarouselTagWrapper>
      {tagData.map((post) => {
        return (
          <StCarouselTag
            key={uuid()}
            onClick={() => onClickTagNameHandler(post)}
            $activeTag={activeTag === post.hashtag}
          >
            <figure>
              <img src={post.image} alt="{post.hashtag}"></img>
            </figure>
            <h2>{post.hashtag}</h2>
          </StCarouselTag>
        );
      })}
    </StCarouselTagWrapper>
  );
}

export default CarouselTag;

const StCarouselTagWrapper = styled.ul`
  width: 850px;
  height: 80px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
`;

const StCarouselTag = styled.li`
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
  & h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 500;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.baseDark};
    padding: 3px;
    border-radius: 7px;
  }
`;
