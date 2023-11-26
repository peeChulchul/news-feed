import React from "react";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setUsersFirestore } from "redux/modules/usersFirestoreState";
import { IoLogoGithub } from "react-icons/io";

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

  return (
    <StModalGithubBtn onClick={handleGithubLogin}>
     <IoLogoGithub /><StModalGithubText>Sign in with Github</StModalGithubText>
    </StModalGithubBtn>
  )
}

const StModalGithubBtn = styled.button`
  font-size: 30px;
  background-color: ${({ theme }) => theme.color.white};
  width: 250px;
  height: 40px;
  margin: 10px 80px 0 75px;
  padding: 3px 45px 5px 45px;
  display: flex;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.color.black};;
`;
const StModalGithubText = styled.p`
  font-size: 14px;
  width: 170px;
  margin-left: 10px;
  margin-top: 8px;
  color: grey;
`