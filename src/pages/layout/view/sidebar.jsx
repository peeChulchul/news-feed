import React, { useEffect, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { MdSettings } from "react-icons/md";
import { Accordion } from "pages/common/accordion";
import { IoIosArrowForward } from "react-icons/io";
import { IoCalendar, IoHome } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { GiMuscleUp } from "react-icons/gi";
import SvgBox from "components/svgbox";
import Avatar from "components/avatar";
import { accordionData } from "data/sidebar/accordion_data";
import { formatlocaleString } from "utils/format/number";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useThrottle } from "utils/usethrottle";
import { BiSolidCategoryAlt } from "react-icons/bi";
const StContainer = styled.aside`
  background-color: #f5f5f5;
  top: 100px;
  left: 0;
  height: 100%;
  position: fixed;
  z-index: 2;
  max-width: 100%;
`;

const StSidebarContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `calc(${theme.spacing.base} * 2)`};
  width: 350px;
  padding: ${({ theme }) => `0 calc(${theme.spacing.base} * 2)`};
  transition: all 0.3s;
  ${({ $show }) =>
    !$show &&
    css`
      overflow: hidden;
      padding: 0px;
      width: 0px;
      transform: translateX(-100%);
    `}
`;

const StAuthWrapper = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `calc(${theme.spacing.base} * 2)`};
  background-color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => `calc(${theme.spacing.base} * 2)`};
`;

const StAuthBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => `calc(${theme.spacing.base} * 2)`};
  padding: ${({ theme }) => `calc(${theme.spacing.base} * 2) 0`};
  h1 {
    flex: 1;
  }
`;

const StAuthPostInfoBox = styled.div`
  display: flex;
`;

const StAuthPostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  h1 {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: bold;
    padding: ${({ theme }) => `calc(${theme.spacing.base}) 0`};
    text-align: center;
  }
  p {
    color: #a6acbe;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const NavigationBox = styled.div`
  background-color: #f6623d1c;
  padding: ${({ theme }) => ` calc(${theme.spacing.base} * 3) calc(${theme.spacing.base} * 2)`};
  color: #ff6633;
  border-radius: 8px;
  cursor: pointer;
`;

const StAccordinonChildrenBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `calc(${theme.spacing.base} * 2)`};
  cursor: pointer;
`;

const StAccordionChildren = styled.div`
  border-radius: 8px;
  display: flex;
  color: ${({ $selected, theme }) => ($selected ? theme.color.white : "#7d8fb3")};
  justify-content: space-between;
  gap: ${({ theme }) => `calc(${theme.spacing.base} * 2)`};
  padding: ${({ theme }) => `calc(${theme.spacing.base} * 2)`};
  height: 60px;
  align-items: center;
  background-color: ${({ $selected, theme }) => ($selected ? theme.color.base : theme.color.white)};

  filter: ${({ $selected }) => $selected && "brightness(1.2)"};

  h1 {
    flex: 1;
  }
`;

const StSidebarToggleBox = styled.div`
  position: fixed;
  left: ${({ $show }) => ($show ? "calc(350px - 50px)" : "0px")};
  width: 50px;
  height: 50px;
  top: calc(100% - 50px);
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.disable};
  transform: ${({ $show }) => ($show ? "rotate(180deg)" : "")};
  transition: all 0.3s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [posts, setPosts] = useState({ sports: 0, food: 0 });
  const [selectedFilterBtn, setSelectedFilterBtn] = useState("All");
  const { users, currentUser } = useSelector((modules) => modules.usersFirestoreState);
  const param = useParams();

  useEffect(() => {
    if (currentUser) {
      const { user_posts } = currentUser;
      const sports = user_posts.filter((post) => post.category === "오운완").length;
      const food = user_posts.filter((post) => post.category === "오식완").length;

      setPosts((prev) => ({ ...prev, sports, food }));
    }
  }, [currentUser]);

  const onClickToggleBtn = useThrottle(() => {
    setShow((prev) => !prev);
  }, 350);

  const onClickNavigateBtn = (query) => {
    setSelectedFilterBtn(query);
    if (query === "All") {
      navigate(`/`);
      return;
    }
    navigate(`/${query}`);
  };

  return (
    <StContainer>
      {/* 사이드바 닫기 */}
      <StSidebarToggleBox onClick={onClickToggleBtn} $show={show}>
        <SvgBox>
          <IoIosArrowForward />
        </SvgBox>
      </StSidebarToggleBox>
      <StSidebarContents $show={show}>
        {/* <StSidebarClose onClick={() => setShow(false)}>
          <IoIosClose />
        </StSidebarClose> */}
        <StAuthWrapper>
          {/* 사용자부분 */}
          <StAuthBox>
            <Avatar width={"60px"} height={"60px"} />
            <h1>닉네임</h1>
            <SvgBox>
              <MdSettings />
            </SvgBox>
          </StAuthBox>

          {/* 게시물 */}
          <StAuthPostInfoBox>
            <StAuthPostInfo>
              <SvgBox fill={"#33BFFF"} fontSize={"3rem"}>
                <GiMuscleUp />
              </SvgBox>
              <h1>{currentUser ? formatlocaleString({ num: posts.sports }) : "정보없음"}</h1>
              <p>운동 게시물</p>
            </StAuthPostInfo>
            <StAuthPostInfo>
              <SvgBox fill={"#29CC39"} fontSize={"3rem"}>
                <IoCalendar />
              </SvgBox>
              <h1> {currentUser ? formatlocaleString({ num: posts.food }) : "정보없음"}</h1>
              <p>식단 게시물</p>
            </StAuthPostInfo>
            <StAuthPostInfo>
              <SvgBox fill={"#105EFB"} fontSize={"3rem"}>
                <FaMessage />
              </SvgBox>
              <h1> {currentUser ? formatlocaleString({ num: 0 }) : "정보없음"}</h1>
              <p>팔로워</p>
            </StAuthPostInfo>
          </StAuthPostInfoBox>

          {/* 페이지이동 */}
          {currentUser && (
            <>
              <NavigationBox onClick={() => navigate(`/manage/newpost/${currentUser}`)}>게시글 쓰기</NavigationBox>
              <NavigationBox>나의 게시글</NavigationBox>
            </>
          )}
        </StAuthWrapper>

        {/* 아코디언 버튼 */}
        <Accordion
          title={"Category"}
          btnIcon={<BiSolidCategoryAlt />}
          height={"60px"}
          padding={`calc( ${theme.spacing.base} * 2)`}
          iconSize={theme.fontSize.xl}
          gap={`calc( ${theme.spacing.base} * 2)`}
          bg={theme.color.base}
          borderRadius={"8px"}
        >
          <StAccordinonChildrenBox>
            {accordionData.map(({ fill, icon, title }) => (
              <StAccordionChildren
                $selected={selectedFilterBtn === title}
                onClick={() => onClickNavigateBtn(title)}
                key={title}
              >
                <SvgBox fill={fill}>{icon}</SvgBox>
                <h1>{title}</h1>
              </StAccordionChildren>
            ))}
          </StAccordinonChildrenBox>
        </Accordion>
      </StSidebarContents>
    </StContainer>
  );
}
