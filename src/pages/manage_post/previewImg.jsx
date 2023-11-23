import React from "react";
import styled from "styled-components";
import { TiDelete } from "react-icons/ti";

function PreviewImg({ src }) {
  return (
    <StImgWrap>
      <img src={src} alt="" />
      <StDeleteIcon />
    </StImgWrap>
  );
}

const StImgWrap = styled.div`
  max-width: 10rem;
  width: 100%;
  overflow: hidden;
  position: relative;
  transition: ${({ theme }) => theme.animation.transition};
  cursor: pointer;

  & img {
    width: 100%;
  }

  &:hover img {
    filter: blur(2px) brightness(0.5);
  }
`;

const StDeleteIcon = styled(TiDelete)`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  fill: #6c757d;
  transform: translateX(-50%) translateY(-50%);
`;

export default PreviewImg;
