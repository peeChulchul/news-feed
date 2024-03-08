import styled from "styled-components";
import { FaGithub } from "react-icons/fa6";

function Footer() {
  const onClickGithubHandler = () => (window.location.href = "https://github.com/peeChulchul/news-feed");
  return (
    <StFooterStyle>
      <FaGithub size={30} onClick={onClickGithubHandler} />
      <p>© 2023. 9gling 김현철 도경구 김세관 천민정 권보라. all rights reserved.</p>
    </StFooterStyle>
  );
}

export default Footer;

const StFooterStyle = styled.footer`
  background-color: lightgray;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
  width: 100%;

  & p {
    margin-bottom: 3px;
    font-size: 12px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
