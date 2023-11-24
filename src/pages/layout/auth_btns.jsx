import { AUTH } from "fb/myfirebase";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function AuthBtns({ setModalOpen, setModalType }) {
  // const Test = useSelector((state) => state.authState)
  // console.log(Test);
  const { currentUser } = useSelector((modules) => modules.usersFirestoreState);

  const logOut = async (event) => {
    event.preventDefault();
    await signOut(AUTH);
  };

  return (
    <>
      {currentUser === null && (
        <StLogInOutBtn
          onClick={() => {
            setModalOpen(true);
            setModalType("login");
          }}
        >
          Log in
        </StLogInOutBtn>
      )}

      {currentUser !== null && <StLogInOutBtn onClick={logOut}>Log out</StLogInOutBtn>}

      {currentUser == null && (
        <StSignupBtn
          onClick={() => {
            setModalOpen(true);
            setModalType("signup");
          }}
        >
          Sign up
        </StSignupBtn>
      )}
    </>
  );
}

const StLogInOutBtn = styled.button`
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
  color: ${({ theme }) => theme.color.white};

  cursor: pointer;
`;
