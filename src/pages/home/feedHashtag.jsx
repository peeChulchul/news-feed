import React from "react";
import styled from "styled-components";
import Hashtag from "components/hashtag";
import { v4 as uuid } from "uuid";

function FeedHashtag({ hashtag = [] }) {
  return (
    <StTagBox>
      {hashtag.map((tag) => {
        return <Hashtag hashtag={true} content={tag} size={"sm"} key={uuid()} />;
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
