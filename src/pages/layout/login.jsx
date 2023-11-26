import { AUTH } from "fb/myfirebase";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import Googlelogin from "./google_login";
import Githublogin from "./github_login";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setUsersFirestore } from "redux/modules/usersFirestoreState";

export default function Login({ setModalType, setModalOpen, modalBackground, modalBackgroundOnclickHandler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
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
      const {
        user: { uid, photourl = "", displayName = "" }
      } = await signInWithEmailAndPassword(AUTH, email, password);

      dispatch(setUsersFirestore({ email, uid, photourl, displayName, user_liked: [], user_posts: [] }));
      console.log(dispatch);
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
      <StModalCloseBtn>
        <IoCloseCircleOutline ref={modalBackground} onClick={modalBackgroundOnclickHandler} />
      </StModalCloseBtn>
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
      <StLine>--------------- 다른 계정으로 로그인 ---------------</StLine>
      <Googlelogin setModalOpen={setModalOpen} />
      <Githublogin setModalOpen={setModalOpen} />
    </StModalContent>
  );
}

const StModalContent = styled.form`
  background-color: ${({ theme }) => theme.color.white};
  width: 400px;
  height: 620px;

  z-index: 100;
`;
const StModalCloseBtn = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin: 10px;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  float: right;
`;
const StLoginModalTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: bold;
  margin: 135px 145px 20px 155px;
`;
const StModalLoginInput = styled.input`
  width: 250px;
  height: 40px;
  margin: 5px 80px 0 75px;
`;
const StModalLonInBtn = styled.button`
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
  width: 250px;
  height: 40px;
  margin: 5px 80px 0 75px;

  cursor: pointer;
`;
const StModalSignupBtn = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.color.black};
  margin-left: 280px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  cursor: pointer;
`;
const StLine = styled.div`
  font-size: 13px;
  color: grey;
  margin: 30px 77px 10px 78px;
`