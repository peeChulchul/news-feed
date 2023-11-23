import React from "react";
import FeedList from "./feedList";
import Carousel from "./carousel";

export default function Home() {
  // const [feeds, setFeeds] = useState([]);

  return (
    <div>
      <Carousel />
      <FeedList />
    </div>
  );
}
