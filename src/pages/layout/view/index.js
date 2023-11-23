import React, { useEffect } from "react";
import Header from "pages/layout/view/header";
import Footer from "pages/layout/view/footer";
import Sidebar from "pages/layout/view/sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { AUTH } from "fb/myfirebase";

export default function Layout({ children }) {
  useEffect(() => {
    const userSubscribe = onAuthStateChanged(AUTH, (user) => {
      if (user) {
        // 로그인한 유저가 존재할경우
        console.log(user);
      } else {
        // 로그인한 유저가 없음
        console.log(user);
      }
    });
    //클린업
    return () => userSubscribe;
  }, []);

  return (
    <>
    <Header />
    <div style={{ height: "1000vh" }}>
      <Sidebar />
      <div style={{ width: "500px", height: "500px", backgroundColor: "black" }}>테스트</div>
      <>{children}</>
      <Footer />
    </div>
    </>
  );
};