import React, { useEffect } from "react";
import Header from "pages/layout/view/header";
import Footer from "pages/layout/view/footer";
import Sidebar from "pages/layout/view/sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { AUTH, postsCollection, usersCollection } from "fb/myfirebase";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { onSnapshot, query } from "firebase/firestore";
import { subscribeCurrentUser, subscribeusersFirestore } from "redux/modules/usersFirestoreState";
import { getAuth, updateProfile } from "firebase/auth";
import Spinner from "components/spinner";

export default function Layout({ children }) {
  const dispatch = useDispatch();

  const { users, currentUser, loading } = useSelector((modules) => modules.usersFirestoreState);

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
  }, [users, dispatch]);

  useEffect(() => {
    // posts컬렉션 을 실시간 수신대기 (구독)
    const q = query(postsCollection);
    const dbSubscribe = onSnapshot(q, async (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
      console.log(result);
      // result.sort((a, b) => b.timesteamp.seconds - a.timesteamp.seconds);
      dispatch(subscribeusersFirestore(result));
    });

    // 클린업
    return () => dbSubscribe;
  }, [dispatch]);

  return (
    <StContainer>
      <Header />
      <Sidebar />
      <StMain>{children}</StMain>
      <Footer />
    </StContainer>
  );
}

const StMain = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 100px;
`;

const StContainer = styled.div``;
