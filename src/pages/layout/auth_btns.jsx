import React, { useState } from "react";
import styled from "styled-components";

export default function AuthBtns({ setModalOpen, setModalType }) {
  return (
    <>
      <StLoginBtn
        onClick={() => {
          setModalOpen(true);
          setModalType("login");
        }}
      >
        Log in
      </StLoginBtn>

      <StSignupBtn
        onClick={() => {
          setModalOpen(true);
          setModalType("signup");
        }}
      >
        Sign up
      </StSignupBtn>
    </>
  );
}

const StLoginBtn = styled.button`
  width: 110px;
  height: 40px;
  margin: auto 0;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};

  cursor: pointer;
`;
const StSignupBtn = styled.button`
  width: 110px;
  height: 40px;
  margin: auto 1.5rem auto 0.5rem;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.success};
  color:${({ theme }) => theme.color.white};

  cursor: pointer;
`;
