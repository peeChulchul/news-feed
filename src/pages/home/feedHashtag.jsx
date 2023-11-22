import React from "react";
import styled from "styled-components";
import Hashtag from "components/hashtag";

function FeedHashtag({ feed }) {
  return (
    <StTagBox>
      {feed.hashtag.map((tag) => {
        return <Hashtag hashtag={true} content={tag} size={"sm"} onClick={() => alert("안녕")} />;
      })}
    </StTagBox>
  );
}

export default FeedHashtag;

const StTagBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
