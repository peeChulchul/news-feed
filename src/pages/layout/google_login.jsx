import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setUsersFirestore } from "redux/modules/usersFirestoreState";
import { FcGoogle } from "react-icons/fc";

export default function Googlelogin({ setModalOpen }) {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const dispatch = useDispatch();

  // 자동로그인 방지
  provider.setCustomParameters({
    prompt: "select_account"
  });

  function handleGoogleLogin() {
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { email, uid, photoURL = "", displayName } = result.user;

        dispatch(setUsersFirestore({ email, uid, photoURL, displayName, user_liked: [], user_posts: [] }));

        alert("로그인에 성공하였습니다.");
        setModalOpen(false);
        return;
      })
      .catch((err) => {
        console.log(err);
        alert("로그인에 실패하였습니다.");
      });
  }

  return (
    <StModalGoogleBtn onClick={handleGoogleLogin}>
      <FcGoogle />
      <StModalGoogleText>Sign in with Google</StModalGoogleText>
    </StModalGoogleBtn>
  );
}

const StModalGoogleBtn = styled.button`
  font-size: 30px;
  background-color: ${({ theme }) => theme.color.white};
  width: 250px;
  height: 40px;
  margin: 10px 80px 0 75px;
  padding: 5px 45px 5px 45px;
  display: flex;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.color.success};
`;
const StModalGoogleText = styled.p`
  font-size: 14px;
  width: 170px;
  margin-left: 10px;
  margin-top: 6px;
  color: grey;
`;
