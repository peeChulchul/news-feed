import React, { useEffect, useState } from "react";
import FeedList from "../feedList";
import Carousel from "../carousel";
import { onSnapshot, query } from "firebase/firestore";
import { postsCollection } from "fb/myfirebase";
import { useDispatch, useSelector } from "react-redux";
import { subscribePostsFirestore } from "redux/modules/postsFirestoreState";

export default function Home() {
  const dispatch = useDispatch();
  // const { posts, loading } = useSelector((modules) => modules.postsFirestoreState);

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

  const { posts } = useSelector((state) => state.postsFirestoreState);
  const [activeTag, setActiveTag] = useState("");
  return (
    <div>
      <Carousel setActiveTag={setActiveTag} />
      <FeedList activeTag={activeTag} />
    </div>
  );
}
