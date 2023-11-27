import React from "react";
import styled, { keyframes } from "styled-components";

function Spinner() {
  return <StSpinner></StSpinner>;
}

const StRotation = keyframes`
  0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}  
`;

const StSpinner = styled.span`
  width: 100%;
  height: 100%;
  border: 10px solid ${({ theme }) => theme.color.baseLight};
  border-bottom-color: ${({ theme }) => theme.color.baseDark};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${StRotation} 1s linear infinite;
`;

export default Spinner;
