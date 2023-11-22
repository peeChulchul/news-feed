import React from "react";
import styled from "styled-components";
import tagData from "data/tagData.json";
import { v4 as uuid } from "uuid";

function CarouselTag() {
  return (
    <StCarouselTagWrapper>
      {tagData.map((item) => {
        return (
          <StCarouselTag key={uuid()}>
            <img src={item.image} alt="{item.workout}"></img>
            <div>{item.workout}</div>
          </StCarouselTag>
        );
      })}
    </StCarouselTagWrapper>
  );
}

export default CarouselTag;

const StCarouselTagWrapper = styled.div`
  width: 800px;
  height: 80px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
`;

const StCarouselTag = styled.figure`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
