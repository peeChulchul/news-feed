import React, { useEffect, useState } from "react";
import Header from "pages/layout/view/header";
import Footer from "pages/layout/view/footer";
import Sidebar from "pages/layout/view/sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { AUTH, DB } from "fb/myfirebase";
import { useDispatch, useSelector } from "react-redux";
import { subscribeAUth } from "redux/modules/authState";
import { doc, getDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { subscribeFirestore } from "redux/modules/firestoreState";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((modules) => modules.firestoreState);
  const { user } = useSelector((modules) => modules.authState);

  useEffect(() => {
    // posts컬렉션 을 실시간 수신대기 (구독)
    const q = query(collection(DB, "posts"));
    const dbSubscribe = onSnapshot(q, async (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
        // setTestT((prev) => [...prev, doc.data()]);
      });
      dispatch(subscribeFirestore(result));
    });

    // 클린업
    return () => dbSubscribe;
  }, [dispatch]);

  useEffect(() => {
    const userSubscribe = onAuthStateChanged(AUTH, async (user) => {
      if (user) {
        // 로그인한 유저가 존재할경우
        dispatch(subscribeAUth(user));
      } else {
        // 로그인한 유저가 없음
        dispatch(subscribeAUth(user));
      }
    });
    //클린업
    return () => userSubscribe;
  }, [dispatch]);

  return (
    <>
      <Header />

      <Sidebar />
      <>{children}</>
      <Footer />
    </>
  );
}
