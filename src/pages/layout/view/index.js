import React, { useEffect } from "react";
import Header from "pages/layout/view/header";
import Footer from "pages/layout/view/footer";
import Sidebar from "pages/layout/view/sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { AUTH, DB, postsCollection } from "fb/myfirebase";
import { useDispatch, useSelector } from "react-redux";
import { subscribeAUth } from "redux/modules/authState";
import { doc, getDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import {
  addFirestore,
  deleteFirestore,
  setFirestore,
  subscribePostsFirestore
} from "redux/modules/postsFirestoreState";
import styled from "styled-components";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((modules) => modules.postsFirestoreState);

  console.log("포스트", posts);
  console.log("유저", AUTH.currentUser);

  useEffect(() => {
    // posts컬렉션 을 실시간 수신대기 (구독)
    const q = query(postsCollection);
    const dbSubscribe = onSnapshot(q, async (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
      dispatch(subscribePostsFirestore(result));
    });

    // 클린업
    return () => dbSubscribe;
  }, [dispatch]);

  useEffect(() => {
    const userSubscribe = onAuthStateChanged(AUTH, async (user) => {
      if (user) {
        // 로그인한 유저가 존재할경우
        // dispatch(subscribeAUth(user));
      } else {
        // 로그인한 유저가 없음
        // dispatch(subscribeAUth(user));
      }
    });
    //클린업
    return () => userSubscribe;
  }, []);

  return (
    <StContainer id={"test"}>
      <Header />
      {/* <div style={{ cursor: "pointer" }} onClick={() => dispatch(deleteFirestore({ postid: "8UXTwYBBNYYBMikZH0rT" }))}>
        테스트버튼 삭제
      </div> */}
      <StBox id={"Box"}>
        <Sidebar />
        <>{children}</>
      </StBox>

      <Footer />
    </StContainer>
  );
}

const StBox = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const StContainer = styled.div``;
