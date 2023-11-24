import React from "react";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setUsersFirestore } from "redux/modules/usersFirestoreState";

export default function Githublogin({ setModalOpen }) {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  const dispatch = useDispatch();

  // 자동로그인 방지
  provider.setCustomParameters({
    prompt: "select_account"
  });

  function handleGithubLogin() {
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((result) => {
        console.log(result);
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { email, uid, photourl = "", displayName = "" } = result.user;

        dispatch(setUsersFirestore({ email, uid, photourl, displayName, user_liked: [], user_posts: [] }));

        alert("로그인에 성공하였습니다.");
        setModalOpen(false);
        return;
      })
      .catch((err) => {
        console.log(err);
        alert("로그인에 실패하였습니다.");
      });
  }

  return <StModalGithubBtn onClick={handleGithubLogin}>Sign in Github</StModalGithubBtn>;
}

const StModalGithubBtn = styled.button`
  background-color: ${({ theme }) => theme.color.success};
  color: ${({ theme }) => theme.color.white};
  width: 250px;
  height: 40px;
  margin: 5px 80px 0 75px;

  cursor: pointer;
`;
