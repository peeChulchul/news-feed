import React from "react";
import styled from "styled-components";

function Avatar({ width, height, src }) {
  return (
    <StAvatar width={width} height={height}>
      <img
        src={
          src
            ? src
            : "https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
        }
        alt="프로필이미지"
      />
    </StAvatar>
  );
}

export default Avatar;

const StAvatar = styled.figure`
  width: ${(props) => props.width || "40px"};
  height: ${(props) => props.height || "40px"};
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
