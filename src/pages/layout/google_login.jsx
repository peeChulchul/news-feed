import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from'styled-components'

export default function Googlelogin() {
    const provider = new GoogleAuthProvider();
  
    // 자동로그인 방지
    provider.setCustomParameters({
      prompt: 'select_account'
    });
  
    const auth = getAuth();
    function handleGoogleLogin() {
      signInWithPopup(auth, provider) // popup을 이용한 signup
        .then((result) => {
          console.log(result);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
        return user;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  return <StModalGoogleBtn onClick={handleGoogleLogin}>Sign in Google</StModalGoogleBtn>
}

const StModalGoogleBtn = styled.button`
  background-color: ${({ theme }) => theme.color.success};
  color: ${({ theme }) => theme.color.white};
  width: 250px;
  height: 40px;
  margin: 10px 23px;

  cursor: pointer;
`;