import React, { useState } from "react";
import styled from "styled-components";
import theme from "styles/theme";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AUTH } from "fb/myfirebase";

export default function Signup({ setModalType }) {
  console.log(setModalType);
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

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(AUTH, email, password);
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StModalContent>
      <StModalSignupTitle>회원가입</StModalSignupTitle>
      <StModalLoginInput placeholder="이름 입력" />
      <StModalLoginInput
        type="email"
        value={email}
        name="email"
        onChange={onChange}
        required
        placeholder="사용할 이메일 입력"
      />
      <StModalLoginInput
        type="password"
        value={password}
        name="password"
        onChange={onChange}
        required
        placeholder="사용할 비밀번호 입력"
      />
      <StModalLoginInput placeholder="비밀번호 다시한번 확인" />
      <StModalLonInBtn onClick={signUp}>회원가입</StModalLonInBtn>
      <StModalSignupBtn onClick={() => setModalType("login")}>로그인</StModalSignupBtn>
      <StModalGoogleBtn>Sign in Google</StModalGoogleBtn>
    </StModalContent>
  );
}

const StModalContent = styled.div`
  background-color: ${theme.color.white};
  width: 300px;
  height: 400px;
`;
const StModalLoginInput = styled.input`
  width: 250px;
  height: 40px;
  margin: 5px 23px;
`;
const StModalLonInBtn = styled.button`
  background-color: ${theme.color.white};
  border: 1px solid ${theme.color.black};
  width: 250px;
  height: 40px;
  margin: 5px 23px;

  cursor: pointer;
`;
const StModalSignupBtn = styled.span`
  border-bottom: 1px solid ${theme.color.black};
  margin-left: 222px;
  font-size: ${theme.fontSize.sm};

  cursor: pointer;
`;
const StModalGoogleBtn = styled.button`
  background-color: ${theme.color.success};
  color: ${theme.color.white};
  width: 250px;
  height: 40px;
  margin: 10px 23px;

  cursor: pointer;
`;
const StModalSignupTitle = styled.div`
  font-size: ${theme.fontSize.xxxl};
  font-weight: bold;
  margin: 20px 85px 20px 85px;
`;
