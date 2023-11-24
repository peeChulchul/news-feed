import React, { useEffect } from "react";
import Header from "pages/layout/view/header";
import Footer from "pages/layout/view/footer";
import Sidebar from "pages/layout/view/sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { AUTH, usersCollection } from "fb/myfirebase";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { onSnapshot, query } from "firebase/firestore";
import { subscribeCurrentUser, subscribeusersFirestore } from "redux/modules/usersFirestoreState";

export default function Layout({ children }) {
  const dispatch = useDispatch();

  const { users, currentUser } = useSelector((modules) => modules.usersFirestoreState);

  console.log(users);
  console.log(currentUser);

  useEffect(() => {
    const userSubscribe = onAuthStateChanged(AUTH, async (user) => {
      if (user) {
        const { uid } = user;
        // 로그인한 유저가 존재할경우
        dispatch(subscribeCurrentUser(uid));
        // 해당유저가 이미 DB에 저장된경우 DB에 저장하지않아야함
        // current유저 값을 해당 유저의 데이터로 변경해줘야함
        // 해당유저가 DB에 없는경우 DB에 유저정보 저장이필요(회원가입시 해당로직추가 필요)
      } else {
        // 로그인한 유저가 없음
        // currentUser값을 null로 변경해야함
        dispatch(subscribeCurrentUser(null));
      }
    });
    //클린업
    return () => userSubscribe;
  }, []);

  useEffect(() => {
    // posts컬렉션 을 실시간 수신대기 (구독)
    const q = query(usersCollection);
    const dbSubscribe = onSnapshot(q, async (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
      dispatch(subscribeusersFirestore(result));
    });

    // 클린업
    return () => dbSubscribe;
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
