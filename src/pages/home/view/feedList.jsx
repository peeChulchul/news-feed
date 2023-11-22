import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, query } from "firebase/firestore";
import { POST_DB } from "fb/myfirebase";
import FeedCard from "../feedCard";
// import { data } from "pages/manage_post/mockHashtag";

function FeedList() {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(POST_DB, "posts"));
      const querySnapshot = await getDocs(q);
      const initialFeeds = [];

      querySnapshot.forEach((doc) => {
        initialFeeds.push({ id: doc.id, ...doc.data() });
      });

      setFeeds(initialFeeds);
    };

    fetchData();
  }, []);

  return (
    <StListWrapper>
      <StFeedList>
        {feeds.map((feed) => {
          return <FeedCard feed={feed} />;
        })}
      </StFeedList>
    </StListWrapper>
  );
}

export default FeedList;

const StListWrapper = styled.ul`
  width: 1000px;
  background-color: ${({ theme }) => theme.color.white};
  margin: 30px auto;
  display: flex;
  justify-content: center;
`;

const StFeedList = styled.div`
  width: 850px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
`;
