import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./modal";
import AuthBtns from "../auth_btns";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");

  const navigate = useNavigate();

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      return;
    } else {
      document.body.style.overflow = "auto";
      return;
    }
  }, [modalOpen]);

  return (
    <>
      <StHeader>
        <StHeaderContainer>
          <StTitle onClick={() => navigate("/")}>
            <p>하루</p>
            <p>건강</p>
          </StTitle>
          <StSearchWrap>
            <StInput type="text" placeholder="검색어를 입력해주세요." disabled></StInput>
            <AuthBtns setModalOpen={setModalOpen} setModalType={setModalType} />
          </StSearchWrap>
        </StHeaderContainer>
      </StHeader>
      {modalOpen && <Modal modalType={modalType} setModalOpen={setModalOpen} setModalType={setModalType} />}
    </>
  );
}

const StHeader = styled.header`
  padding: 15px 0;
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.color.black};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.white};
  position: fixed;
  z-index: 10;
  top: 0;
`;
const StHeaderContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  width: 100%;
  max-width: 1000px;
  padding: 0 10px;
`;
const StTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  cursor: pointer;
  word-break: keep-all;

  @media (max-width: 760px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;
const StSearchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 600px;
  width: 100%;
`;
const StInput = styled.input`
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  border: 1px solid black;
  padding: 15px 10px;

  @media (max-width: 760px) {
    padding: 10px;
  }
`;
