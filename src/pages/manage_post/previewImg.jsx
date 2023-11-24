import React from "react";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";

function PreviewImg({ src, newFileName, onDeleteImg }) {
  return (
    <StImgWrap
      onClick={() => {
        onDeleteImg(newFileName);
      }}
    >
      <img src={src} alt="" />
      <StDeleteIcon />
    </StImgWrap>
  );
}

const StDeleteIcon = styled(MdDeleteForever)`
  position: absolute;
  visibility: hidden;
  top: 50%;
  left: 50%;
  font-size: 50px;
  fill: ${({ theme }) => theme.color.danger};
  transform: translateX(-50%) translateY(-50%);
`;

const StImgWrap = styled.div`
  width: 8rem;
  height: 6rem;
  overflow: hidden;
  position: relative;
  transition: ${({ theme }) => theme.animation.transition};
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 1em;

  & img {
    width: 100%;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }

  &:hover img {
    filter: brightness(0.5);
  }

  &:hover ${StDeleteIcon} {
    visibility: visible;
  }
`;

export default PreviewImg;
