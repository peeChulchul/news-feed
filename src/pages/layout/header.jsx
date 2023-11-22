import React from "react";
import styled from "styled-components";
import theme from "styles/theme";
import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { AUTH } from "fb/myfirebase";

export default function Header() {
  // Login Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const modalBackgound = useRef();

  const ModalOpenOnclickHandler = event => {
    if (event.target === modalBackgound.current) {
      setModalOpen(false);
      setModalOpen2(false);
    }
  }

  // 회원가입
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(AUTH, email, password)
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  }
  
  // 사용자 인증정보 확인하기
  const user = AUTH.currentUser;

  // 이메일로 로그인하기
  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(AUTH, email, password)
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  }

  // 로그아웃하기
  const logOut = (event) => {
    event.preventDefault();
  }
  return <>
    <StHeader>
      <StTitle>하루<br />건강</StTitle>
      <StInput type="text" placeholder="Enter a search" ></StInput>
      <StLoginBtn onClick={() => {setModalOpen(true)}}>Log in</StLoginBtn>
      <StSignupBtn onClick={() => {setModalOpen2(true)}}>Sign up</StSignupBtn>
    </StHeader>
    <div>
    {
        modalOpen &&
        <StModalContainer ref={modalBackgound} onClick={ModalOpenOnclickHandler}>
          <StModalContent>
            <StLoginModalTitle>로그인</StLoginModalTitle>
            <StModalLoginInput
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            required
            placeholder="이메일을 입력해주세요"/>
            <StModalLoginInput
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            required
            placeholder="비밀번호를 입력해주세요"/>
            <StModalLonInBtn onClick={signIn}>로그인</StModalLonInBtn>
            <StModalSignupBtn>회원가입</StModalSignupBtn>
            <StModalGoogleBtn>Sign in Google</StModalGoogleBtn>
          </StModalContent>
        </StModalContainer>
      }
    </div>
    <div>
      {
        modalOpen2 &&
        <StModalContainer ref={modalBackgound} onClick={ModalOpenOnclickHandler}>
      <StModalContent>
        <StModalSignupTitle>회원가입</StModalSignupTitle>
        <StModalLoginInput placeholder="이름 입력"/>
        <StModalLoginInput
        type="email"
        value={email}
        name="email"
        onChange={onChange}
        required
        placeholder="사용할 이메일 입력"/>
        <StModalLoginInput
        type="password"
        value={password}
        name="password"
        onChange={onChange}
        required
        placeholder="사용할 비밀번호 입력"/>
        <StModalLoginInput placeholder="비밀번호 다시한번 확인"/>
        <StModalLonInBtn onClick={signUp}>회원가입</StModalLonInBtn>
        <StModalSignupBtn>로그인</StModalSignupBtn>
        <StModalGoogleBtn>Sign in Google</StModalGoogleBtn>
      </StModalContent>
    </StModalContainer>
      }
    </div>
  </>
};

const StHeader = styled.header`
  height: 100px;
  width: 1200px;
  margin: 0 auto;
  border: 2px solid ${theme.color.black};

  display: flex;
`
const StTitle = styled.h1`
  font-size: ${theme.fontSize.xxl};
  padding: 1.4rem 1.5rem;
`

const StInput = styled.input`
  width: 500px;
  height: 40px;
  margin: auto;
  border-radius: 25px;
  padding-left: ${theme.spacing.lg};
`

const StLoginBtn = styled.button`
  width: 110px;
  height: 40px;
  margin: auto 0;
  border-radius: 20px;
  border: 1px solid ${theme.color.black};
  background-color: ${theme.color.white};

  cursor: pointer;
`
const StSignupBtn = styled.button`
  width: 110px;
  height: 40px;
  margin: auto 1.5rem auto 0.5rem;
  border-radius: 20px;
  background-color: ${theme.color.success};
  color: ${theme.color.white};

  cursor: pointer;
`
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
`
const StModalContent = styled.div`
  background-color: ${theme.color.white};
  width: 300px;
  height: 400px;
`
const StLoginModalTitle = styled.div`
  font-size: ${theme.fontSize.xxxl};
  font-weight: bold;
  margin: 65px 80px 20px 98px;
`
const StModalLoginInput = styled.input`
  width: 250px;
  height: 40px;
  margin: 5px 23px;
`
const StModalLonInBtn = styled.button`
  background-color: ${theme.color.white};
  border: 1px solid ${theme.color.black};
  width: 250px;
  height: 40px;
  margin: 5px 23px;

  cursor: pointer;
`
const StModalSignupBtn = styled.span`
  border-bottom: 1px solid ${theme.color.black};
  margin-left: 222px;
  font-size: ${theme.fontSize.sm};

  cursor: pointer;
`
const StModalGoogleBtn = styled.button`
  background-color: ${theme.color.success};
  color: ${theme.color.white};
  width: 250px;
  height: 40px;
  margin: 10px 23px;

  cursor: pointer;
`
const StModalSignupTitle = styled.div`
font-size: ${theme.fontSize.xxxl};
font-weight: bold;
margin: 20px 85px 20px 85px;
`