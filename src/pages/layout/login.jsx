import { AUTH } from "fb/myfirebase";
import React, { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import Googlelogin from "./google_login";
import Githublogin from "./github_login";

export default function Login({ setModalType, setModalOpen, modalClose, modalBackgroundOnclickHandler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const logIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(AUTH, email, password);
      console.log(userCredential);
      alert("로그인에 성공하였습니다.");
      // 로그인 성공하면 모달창 닫히게
      setModalOpen(false);
    } catch (error) {
      console.log(error);
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <StModalContent onSubmit={logIn}>
      <StModalCloseBtn ref={modalClose} onClick={modalBackgroundOnclickHandler}>x</StModalCloseBtn>
      <StLoginModalTitle>로그인</StLoginModalTitle>
      <StModalLoginInput
        type="email"
        value={email}
        name="email"
        onChange={onChange}
        required
        placeholder="이메일을 입력해주세요"
      />
      <StModalLoginInput
        type="password"
        value={password}
        name="password"
        onChange={onChange}
        required
        autoComplete="off"
        placeholder="비밀번호를 입력해주세요"
      />
      <StModalLonInBtn disabled={!(email && password)}>로그인</StModalLonInBtn>
      <StModalSignupBtn onClick={() => setModalType("signup")}>회원가입</StModalSignupBtn>
      <StLoginBtns>
      <Googlelogin setModalOpen={setModalOpen} />
      <Githublogin setModalOpen={setModalOpen} />
      </StLoginBtns>
    </StModalContent>
  );
}

const StModalContent = styled.form`
  background-color: ${({ theme }) => theme.color.white};
  width: 400px;
  height: 500px;

  z-index: 100;
`;
const StModalCloseBtn = styled.div`
  background-color: green;
  font-size: 20px;

  cursor: pointer;
`;
const StLoginModalTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: bold;
  margin: 65px 160px 20px 150px;
`;
const StModalLoginInput = styled.input`
  width: 250px;
  height: 40px;
  margin: 5px 50px 0 75px;
`;
const StModalLonInBtn = styled.button`
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
  width: 250px;
  height: 40px;
  margin: 5px 50px 0 75px;

  cursor: pointer;
`;
const StModalSignupBtn = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.color.black};
  margin-left: 280px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  background-color: green;
  cursor: pointer;
`;
const StLoginBtns = styled.div`
  display: flex;
`