import React from "react";
import styled from "styled-components";

function Hashtag({ hashtag, content, active, size, onClick, color, $fontcolor }) {
  return (
    <StHashtag
      $fontcolor={$fontcolor}
      color={color}
      className={active && "hashtag-active"}
      size={size}
      onClick={onClick || null}
    >
      {hashtag && "#"}
      {content}
    </StHashtag>
  );
}

const StHashtag = styled.span`
  background-color: ${({ theme, color }) => theme.color[color]};
  display: inline-block;
  padding: 0.5em 1em;
  outline: 1px solid ${({ theme }) => theme.color.base};
  border-radius: 1em;
  transition: ${({ theme }) => theme.animation.transition};
  color: ${({ theme, $fontcolor }) => theme.color[$fontcolor]};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize[props?.size] || props.theme.fontSize.base};

  &:hover {
    background-color: ${({ theme }) => theme.color.baseLight};
    color: ${({ theme }) => theme.color.white};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.baseDark};
    color: ${(props) => props.theme.color.white};
  }

  &.hashtag-active {
    background-color: ${({ theme }) => theme.color.base};
    color: ${({ theme }) => theme.color.white};
  }

  &.hashtag-active:active {
    background-color: ${({ theme }) => theme.color.baseDark};
    color: ${({ theme }) => theme.color.white};
  }
`;

export default Hashtag;
