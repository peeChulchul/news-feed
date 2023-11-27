import React from "react";
import styled from "styled-components";
import { BsSuitHeartFill } from "react-icons/bs";

const LikeBox = styled.div`
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : "")};
  width: ${({ $width }) => ($width ? $width : "")};
  height: ${({ $height }) => ($height ? $height : "")};
`;

export default function Likeicon({ color, width, height, fontSize }) {
  return (
    <LikeBox $color={color} $fontSize={fontSize} $width={width} $height={height}>
      <BsSuitHeartFill />
    </LikeBox>
  );
}