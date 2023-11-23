import React from "react";
import styled from "styled-components";
import { useState } from "react";

import Modal from "./modal";
import AuthBtns from "../auth_btns";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");

  return (
    <>
      <StHeader>
        <StTitle>
          하루
          <br />
          건강
        </StTitle>
        <StInput type="text" placeholder="Enter a search"></StInput>
        <AuthBtns setModalOpen={setModalOpen} setModalType={setModalType} />
      </StHeader>
      {modalOpen && <Modal modalType={modalType} setModalOpen={setModalOpen} setModalType={setModalType} />}
    </>
  );
}

const StHeader = styled.header`
  height: 100px;
  width: 1200px;
  margin: 0 auto;
  border: 2px solid ${({ theme }) => theme.color.black};
  display: flex;
`;
const StTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  padding: 1.4rem 1.5rem;
`;

const StInput = styled.input`
  width: 500px;
  height: 40px;
  margin: auto;
  border-radius: 25px;
  padding-left: ${({ theme }) => theme.spacing.lg};
`;