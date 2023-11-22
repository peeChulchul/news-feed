import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { useThrottle } from "utils/usethrottle";

const StContainer = styled.div`
  position: relative;
  background-color: transparent;
  color: ${({ theme }) => theme.color.white};
`;
const StHeader = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ $height }) => ($height ? $height : "32px")};
  padding: ${({ $padding }) => ($padding ? `${$padding}` : "0.5rem")};
  gap: ${({ $gap, theme }) => ($gap ? $gap : theme.spacing.base)};
  margin-bottom: ${({ $gap, theme }) => ($gap ? `calc(${$gap} / 2)` : theme.spacing.base)};
  background-color: ${({ $bg }) => $bg};
  border-radius: ${({ $borderRadius }) => ($borderRadius ? $borderRadius : "8px")};
  h1 {
    flex: 1;
  }
`;

const StButton = styled.div`
  font-size: ${({ $iconSize, theme }) => ($iconSize ? $iconSize : theme.fontSzie.base)};
  color: ${({ $bg }) => $bg};
  filter: brightness(0.6);
  transform: ${({ $active }) => $active && `rotate(180deg)`};
  transition: transform 0.5s linear;
`;

const StContentsWrapper = styled.div`
  height: 0;
  overflow: hidden;
  max-height: ${({ $active, $childrenHeight }) => ($active ? `${$childrenHeight}px` : "0px")};
  height: 100%;
  transition: all 0.5s linear;
  overflow: hidden;
`;
export function Accordion({ title, height, btnIcon, padding, children, iconSize, gap, bg, borderRadius }) {
  const [active, setActive] = useState(false);
  const [childrenHeight, setChildrenHeight] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const childrenHeight = ref.current.children[0].clientHeight;
    setChildrenHeight(childrenHeight);
  }, []);

  const onClickAccordion = useThrottle(() => {
    setActive((prev) => !prev);
  }, 500);

  return (
    <StContainer>
      <StHeader
        $borderRadius={borderRadius}
        $bg={bg}
        $gap={gap}
        $padding={padding}
        $height={height}
        onClick={onClickAccordion}
      >
        <StButton $bg={bg} $iconSize={iconSize}>
          {btnIcon}
        </StButton>
        <h1>{title}</h1>
        <StButton $active={active} $bg={bg} $iconSize={iconSize}>
          <IoIosArrowDown />
        </StButton>
      </StHeader>
      <StContentsWrapper $childrenHeight={childrenHeight} ref={ref} $active={active}>
        {children}
      </StContentsWrapper>
    </StContainer>
  );
}

export function AccordionChildren() {}
