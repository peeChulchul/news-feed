import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { DB } from "fb/myfirebase";
import DetailPostContent from "../detailPostContent";
import Spinner from "components/spinner";
import styled from "styled-components";

const StLoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  width: 100%;

  & span {
    width: 200px;
    height: 200px;
  }
`;

export default function DetailPost() {
  const { postid } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);

  const getPost = useCallback(async () => {
    const docRef = doc(DB, "posts", postid);
    const docSnap = await getDoc(docRef);
    setSelectedPost(docSnap.data());
  }, [postid]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <>
      {!selectedPost ? (
        <StLoadingBox>
          <Spinner />
        </StLoadingBox>
      ) : (
        <>
          <DetailPostContent data={selectedPost} />
        </>
      )}
    </>
  );
}
