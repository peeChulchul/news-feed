import React, { useEffect } from "react";
import Header from "pages/layout/view/header";
import Footer from "pages/layout/view/footer";
import Sidebar from "pages/layout/view/sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { AUTH, DB, postsCollection } from "fb/myfirebase";
import { useDispatch, useSelector } from "react-redux";
import { subscribeAUth } from "redux/modules/authState";
import { doc, getDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { addFirestore, setFirestore, subscribeFirestore } from "redux/modules/firestoreState";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((modules) => modules.firestoreState);
  const { user } = useSelector((modules) => modules.authState);

  console.log("포스트", posts);
  console.log("유저", user);

  useEffect(() => {
    // posts컬렉션 을 실시간 수신대기 (구독)
    const q = query(postsCollection);
    const dbSubscribe = onSnapshot(q, async (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
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
      <div style={{ cursor: "pointer" }} onClick={() => dispatch(addFirestore())}>
        테스트버튼 (ADD로 포스트추가)
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() =>
          dispatch(
            setFirestore({
              content: "수정된테스트입니다.",
              uid: "수정된테스트입니다.",
              like: 0,
              category: "오운완",
              imgs: [
                "https://social-phinf.pstatic.net/20140224_181/1393220729495a3K5P_JPEG/1393220562345-1.jpg",
                "https://social-phinf.pstatic.net/20220426_269/1650948892717mHyp9_JPEG/829D6050-7839-4E0D-A53D-50BB6E4DD7ED.jpeg"
              ],
              hashtag: ["헬스", "복싱"],
              postid: "001-001"
            })
          )
        }
      >
        테스트버튼 (SET으로 포스트추가)
      </div>
      <Sidebar />

      <>{children}</>
      <Footer />
    </>
  );
}
