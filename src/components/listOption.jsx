import React, { useState } from "react";
import styled from "styled-components";
import { copyCurrentURL, linkEditPage } from "utils/useLink";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePostsFirestore } from "redux/modules/postsFirestoreState";

function ListOption() {
  const { userid, postid } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((modules) => modules.usersFirestoreState);

  const onClickIcon = () => {
    setActive(!active);
  };

  const onDeletePost = () => {
    const payload = { postid };
    const reduxDeleteMethod = deletePostsFirestore(payload);

    const deleteCheck = window.confirm("해당 게시물을 삭제하시겠습니까?");
    if (deleteCheck) {
      dispatch(reduxDeleteMethod);
      navigate("/");
    }
  };

  return (
    <StIconWrap>
      <BsThreeDotsVertical className={`${active ? "active" : ""}`} onClick={onClickIcon} />
      {active && (
        <StOptionsWrap>
          <li onClick={copyCurrentURL}>공유하기</li>
          {userid === currentUser?.uid && (
            <>
              <li onClick={() => linkEditPage(currentUser.uid, postid, navigate)}>수정하기</li>
              <li onClick={onDeletePost}>삭제하기</li>
            </>
          )}
        </StOptionsWrap>
      )}
    </StIconWrap>
  );
}

const StIconWrap = styled.span`
  cursor: pointer;
  position: relative;
  user-select: none;

  & > .active {
    color: ${({ theme }) => theme.color.base};
  }

  & > svg :hover {
    color: ${({ theme }) => theme.color.baseLight};
  }

  & > svg :active {
    color: ${({ theme }) => theme.color.baseDark};
  }
`;

const StOptionsWrap = styled.ul`
  position: absolute;
  top: 100%;
  white-space: nowrap;
  right: 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.disable};
  overflow: hidden;
  border-radius: 0.5rem;
  z-index: 1;
  text-align: center;

  & li {
    font-size: ${({ theme }) => theme.fontSize.base};
    background-color: ${({ theme }) => theme.color.white};
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.color.disable};
    padding: ${({ theme }) => theme.spacing.base} ${({ theme }) => theme.spacing.lg};

    &:hover {
      color: ${({ theme }) => theme.color.baseLight};
    }

    &:active {
      color: ${({ theme }) => theme.color.baseDark};
    }
  }

  & li:last-child {
    border-bottom: none;
  }
`;
export default ListOption;
