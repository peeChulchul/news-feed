import React from "react";
import styled from "styled-components";
function FieldsetCheckBox({ listData, type, legend }) {
  return (
    <StFieldset>
      {legend ? <StLegend>{legend}</StLegend> : null}
      {listData.map((n, i) => {
        return (
          <>
            <StInput type={type} name={`form__${type}`} id={`editorForm__${type}-${i}`} />
            <label htmlFor={`editorForm__${type}-${i}`}>{legend === "해시태그" ? `#${n}` : n}</label>
          </>
        );
      })}
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

const StInput = styled.input`
  display: none;
  & + label {
    display: inline-block;
    padding: 0.5rem 1rem;
    outline: 1px solid ${({ theme }) => theme.color.base};
    border-radius: 1em;
    transition: ${({ theme }) => theme.animation.transition};
    color: ${({ theme }) => theme.color.baseDark};
    cursor: pointer;
  }

  &:hover + label {
    background-color: ${({ theme }) => theme.color.baseLight};
    color: ${({ theme }) => theme.color.white};
  }

  &:active + label {
    background-color: ${({ theme }) => theme.color.baseDark};
    color: ${(props) => props.theme.color.white};
  }

  &:checked + label {
    background-color: ${({ theme }) => theme.color.base};
    color: ${({ theme }) => theme.color.white};
  }

  &:checked:active + label {
    background-color: ${({ theme }) => theme.color.baseDark};
    color: ${({ theme }) => theme.color.white};
  }
`;

export default FieldsetCheckBox;
