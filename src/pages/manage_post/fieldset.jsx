import React from "react";
import styled from "styled-components";
function Fieldset({ legend, children }) {
  return (
    <StFieldset>
      {legend ? <StLegend>{legend}</StLegend> : null}
      {children}
    </StFieldset>
  );
}

const StFieldset = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const StLegend = styled.legend`
  font-size: ${(props) => props.theme.fontSize.lg};
  margin-bottom: 1rem;
  font-weight: bold;
`;

export default Fieldset;
