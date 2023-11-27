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
            하루
            <br />
            건강
          </StTitle>
          <StInput type="text" placeholder="Enter a search"></StInput>
          <AuthBtns setModalOpen={setModalOpen} setModalType={setModalType} />
        </StHeaderContainer>
      </StHeader>
      {modalOpen && <Modal modalType={modalType} setModalOpen={setModalOpen} setModalType={setModalType} />}
    </>
  );
}

const StHeader = styled.header`
  height: 100px;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.color.black};
  display: flex;
  background-color: ${({ theme }) => theme.color.white};
  position: fixed;
  z-index: 10;
  top: 0;
`;
const StHeaderContainer = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  max-width: 1200px;
`;
const StTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  padding: 1.4rem 1.5rem;
  cursor: pointer;
`;

const StInput = styled.input`
  width: 500px;
  height: 40px;
  margin: auto;
  border-radius: 25px;
  padding-left: ${({ theme }) => theme.spacing.lg};
`;
