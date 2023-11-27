import React from "react";
import styled from "styled-components";

const StBox = styled.div`
  font-size: ${({ $fontSize, theme }) => ($fontSize ? $fontSize : theme.fontSize.xl)};
  color: ${({ $color }) => $color};
  width: ${({ $width }) => ($width ? $width : "")};
  height: ${({ $height }) => ($height ? $height : "")};
  cursor: ${({ $pointer }) => ($pointer ? "pointer" : "")};
  svg {
    fill: ${({ $fill }) => $fill};
  }
`;

export default function SvgBox({ children, width, height, fill, color, fontSize, pointer }) {
  return (
    <StBox $width={width} $height={height} $fill={fill} $color={color} $fontSize={fontSize} $pointer={pointer}>
      {children}
    </StBox>
  );
}
