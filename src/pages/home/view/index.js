import React, { useEffect, useState } from "react";
import FeedList from "./feedList";
import Carousel from "./carousel";
import { collection, getDocs, query } from "firebase/firestore";
import { DB } from "fb/myfirebase";

export default function Home() {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(DB, "posts"));
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
    <div>
      <Carousel feeds={feeds} />
      <FeedList feeds={feeds} />
    </div>
  );
}
