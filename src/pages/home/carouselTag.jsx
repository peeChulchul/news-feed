import React from "react";
import styled from "styled-components";
import tagData from "data/tagData.json";
import { v4 as uuid } from "uuid";
// import { useDispatch, useSelector } from "react-redux";

function CarouselTag() {
  // const dispatch = useDispatch();
  // const { posts } = useSelector((state) => state.firestoreState);

  return (
    <StCarouselTagWrapper>
      {tagData.map((item) => {
        return (
          <StCarouselTag key={uuid()}>
            <img src={item.image} alt="{item.workout}"></img>
            <h2>{item.hashtag}</h2>
          </StCarouselTag>
        );
      })}
    </StCarouselTagWrapper>
  );
}

export default CarouselTag;

const StCarouselTagWrapper = styled.div`
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

const StCarouselTag = styled.figure`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
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
