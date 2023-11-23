import React from "react";
import styled from "styled-components";
import CarouselTag from "../carouselTag";

function Carousel({ feeds }) {
  return (
    <StCarouselBox>
      <CarouselTag feeds={feeds}></CarouselTag>
    </StCarouselBox>
  );
}

export default Carousel;

const StCarouselBox = styled.div`
  width: 1000px;
  margin: 1rem auto;
  padding: 10px;
  background-color: ${({ theme }) => theme.color.disable};
  display: flex;
  justify-content: center;
`;
