import React from "react";
import styled from "styled-components";
import { useRef } from "react";
import { AUTH } from "fb/myfirebase";
import Login from "../login";
import Signup from "../signup";

export default function Modal({ modalType, setModalOpen, setModalType }) {
  // const modalBackgound = useRef();

  // 사용자 인증정보 확인하기
  const user = AUTH.currentUser;

  const modalClose = useRef();

  const modalBackgroundOnclickHandler = (event) => {
    if (event.target === modalClose.current) {
      setModalOpen(false);
    }
  };

  return (
    <div>
      <StModalContainer>
        {modalType === "login" && <Login setModalType={setModalType} setModalOpen={setModalOpen} modalClose={modalClose} modalBackgroundOnclickHandler={modalBackgroundOnclickHandler} />}
        {modalType === "signup" && <Signup setModalType={setModalType} setModalOpen={setModalOpen} modalClose={modalClose} modalBackgroundOnclickHandler={modalBackgroundOnclickHandler} />}
      </StModalContainer>
    </div>
  );
}

const StModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);

  z-index: 100;
`;

const StModalCloseBtn = styled.div`
  background-color: green;
`