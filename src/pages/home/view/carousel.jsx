import React from "react";
import styled from "styled-components";

function Carousel() {
  return (
    <StCarouselBox>
      <Carousel></Carousel>
    </StCarouselBox>
  );
}

export default Carousel;

const StCarouselBox = styled.div`
  height: 80px;
  background-color: ${({ theme }) => theme.color.disable};
`;
