import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AUTH } from "fb/myfirebase";

export default function Signup({ setModalType }) {
  // 닉네임, 이메일, 비밀번호, 비밀번호 확인
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // 오류 메세지 상태
  const [nameMessage, setNameMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [confirmPasswordMessage, setconfirmPasswordMessage] = useState('')

  // 유효성 검사
  const [isName, setIsName] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isConfirmPassword, setIsConfirmPassword] = useState(false)

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
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  // 닉네임
  const onChangeName = useCallback((event) => {
    setName(event.target.value);
    if (event.target.value.length < 2 || event.target.value.length > 5) {
      setNameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
      setIsName(false);
    } else {
      setNameMessage("올바른 형식입니다.");
      setIsName(true);
    }
  }, [])

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(AUTH, email, password);
      console.log(userCredential);
      alert("회원가입이 완료되었습니다.");
    } catch (error) {
      console.log(error);
      alert("빈 칸을 모두 채워주세요.")
    }
  };

  return (
    <StModalContent>
      <StModalSignupTitle>회원가입</StModalSignupTitle>
      <StModalLoginInput
        type="text"
        value={name}
        name="name"
        onChange={onChangeName}
        placeholder="닉네임" />
        {
          name.length > 0 &&
          <span className={`message ${isName ? 'success' : 'error'}`}>
          {nameMessage}
          </span>
        }
      <StModalLoginInput
        type="email"
        value={email}
        name="email"
        onChange={onChange}
        required
        placeholder="이메일"
      />
      <StModalLoginInput
        type="password"
        value={password}
        name="password"
        onChange={onChange}
        required
        placeholder="비밀번호"
      />
      <StModalLoginInput
        type="password"
        value={confirmPassword}
        name="confirmPassword"
        onChange={onChange}
        placeholder="비밀번호 확인" />
      <StModalLonInBtn onClick={signUp}>회원가입</StModalLonInBtn>
      <StModalSignupBtn onClick={() => setModalType("login")}>로그인</StModalSignupBtn>
      <StModalGoogleBtn>Sign in Google</StModalGoogleBtn>
    </StModalContent>
  );
}

const StModalContent = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  width: 300px;
  height: 400px;
`;
const StModalLoginInput = styled.input`
  width: 250px;
  height: 40px;
  margin: 5px 23px;
`;
const StModalLonInBtn = styled.button`
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
  width: 250px;
  height: 40px;
  margin: 5px 23px;

  cursor: pointer;
`;
const StModalSignupBtn = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.color.black};
  margin-left: 240px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  cursor: pointer;
`;
const StModalGoogleBtn = styled.button`
  background-color: ${({ theme }) => theme.color.success};
  color: ${({ theme }) => theme.color.white};
  width: 250px;
  height: 40px;
  margin: 10px 23px;

  cursor: pointer;
`;
const StModalSignupTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: bold;
  margin: 20px 85px 20px 85px;
`;
