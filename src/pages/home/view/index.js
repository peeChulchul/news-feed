import React, { useEffect, useState } from "react";
import FeedList from "../feedList";
import Carousel from "../carousel";
import { onSnapshot, query } from "firebase/firestore";
import { postsCollection } from "fb/myfirebase";
import { useDispatch, useSelector } from "react-redux";
import { subscribePostsFirestore } from "redux/modules/postsFirestoreState";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "components/spinner";

const StLoadingBox = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  & span {
    width: 200px;
    height: 200px;
  }
`;

export default function Home() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((modules) => modules.postsFirestoreState);
  const { category } = useParams();

  useEffect(() => {
    // posts컬렉션 을 실시간 수신대기 (구독)
    const q = query(postsCollection);
    const dbSubscribe = onSnapshot(q, async (querySnapshot) => {
      if (querySnapshot === null) return;
      const result = [];

      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });

      // result.sort((a, b) => {
      //   if (a.timesteam && b.timesteam) {
      //     return b.timesteamp.seconds - a.timesteamp.seconds;
      //   }
      //   return {};
      // });
      dispatch(subscribePostsFirestore(result));
    });

    // 클린업
    return () => dbSubscribe;
  }, [dispatch]);

  // const { posts } = useSelector((state) => state.postsFirestoreState);
  const [activeTag, setActiveTag] = useState("");

  useEffect(() => {
    setActiveTag("");
  }, [category]);

  return (
    <>
      {loading ? (
        <StLoadingBox>
          <Spinner />
        </StLoadingBox>
      ) : (
        <>
          <Carousel setActiveTag={setActiveTag} />
          <FeedList activeTag={activeTag} />
        </>
      )}
    </>
  );
}
