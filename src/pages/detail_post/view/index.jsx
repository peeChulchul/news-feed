import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { DB } from "fb/myfirebase";
import Test from "../test";

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
        <>로딩중</>
      ) : (
        <>
          <Test data={selectedPost} />
        </>
      )}
    </>
  );
}
