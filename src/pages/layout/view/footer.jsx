import React from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa6";

function Footer() {
  const onClickGithubHandler = () => (window.location.href = "https://github.com/nbc-9gling/news-feed.git");
  return (
    <StFooterStyle>
      <StGithub>
        <FaGithub onClick={onClickGithubHandler} />
      </StGithub>
      <StOurTeam>
        <div>
          <h3>9gling</h3>
        </div>
        <StMember>
          <p>김현철</p>
          <p>도경구</p>
          <p>김세관</p>
        </StMember>
        <StMember>
          <p>천민정</p>
          <p>권보라</p>
        </StMember>
      </StOurTeam>
      <StCopyright>Copyright 2023 All ⓒ rights reserved</StCopyright>
    </StFooterStyle>
  );
}

export default Footer;

const StFooterStyle = styled.footer`
  background-color: lightgray;
  height: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 15px;
  & h3 {
    font-weight: 500;
    margin-bottom: 10px;
  }
  & p {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const StGithub = styled.div`
  font-size: 30px;
  cursor: pointer;
`;

const StCopyright = styled.div`
  font-size: 12px;
`;

const StOurTeam = styled.div`
  & p {
    margin-bottom: 3px;
    font-size: 13px;
  }
`;

const StMember = styled.div`
  display: flex;
`;
