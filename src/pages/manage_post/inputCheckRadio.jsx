import React from "react";
import styled from "styled-components";
function InputCheckRadio({ listData, checkedData, type, name, onChange }) {
  const checked = (type, value) => {
    if (type === "radio") {
      return checkedData === value;
    } else {
      return [...checkedData].includes(value);
    }
  };
  return (
    <>
      {listData.map((n, i) => {
        return (
          <span key={`input__${type}-${name}-${i}`}>
            <StInput
              type={type}
              name={name}
              id={`input__${type}-${name}-${i}`}
              value={n}
              defaultChecked={checked(type, n)}
              onChange={onChange}
            />
            <label htmlFor={`input__${type}-${name}-${i}`}>{n}</label>
          </span>
        );
      })}
    </>
  );
}

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

export default InputCheckRadio;
