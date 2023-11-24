import React, { useEffect } from "react";
import Header from "pages/layout/view/header";
import Footer from "pages/layout/view/footer";
import Sidebar from "pages/layout/view/sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { AUTH } from "fb/myfirebase";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { subscribeAUth } from "redux/modules/authState";

export default function Layout({ children }) {
  const dispatch = useDispatch();

  const { users, currentUser } = useSelector((modules) => modules.usersFirestoreState);

  useEffect(() => {
    const userSubscribe = onAuthStateChanged(AUTH, async (user) => {
      if (user) {
        // 로그인한 유저가 존재할경우
        dispatch(subscribeAUth(user));
        // 해당유저가 이미 DB에 저장된경우 DB에 저장하지않아야함
        // current유저 값을 해당 유저의 데이터로 변경해줘야함
        // 해당유저가 DB에 없는경우 DB에 유저정보 저장이필요(회원가입시 해당로직추가 필요)
      } else {
        // 로그인한 유저가 없음
        // currentUser값을 null로 변경해야함
        dispatch(subscribeAUth(user));
      }
    });
    //클린업
    return () => userSubscribe;
  }, []);

  return (
    <StContainer id={"test"}>
      <Header />
      <StMain id={"Box"}>
        <Sidebar />
        <>{children}</>
      </StMain>

      <Footer />
    </StContainer>
  );
}

const StMain = styled.main`
  width: 100%;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const StContainer = styled.div``;
