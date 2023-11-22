import React from "react";
import FeedList from "./feedList";
import Carousel from "./carousel";

export default function Home() {
  return (
    <div>
      <Carousel />
      <FeedList />
    </div>
  );
}
