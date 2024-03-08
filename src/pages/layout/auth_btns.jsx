import { AUTH } from "fb/myfirebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function AuthBtns({ setModalOpen, setModalType }) {
  const { currentUser, loading } = useSelector((modules) => modules.usersFirestoreState);

  const logOut = async (event) => {
    event.preventDefault();
    await signOut(AUTH);
    alert("로그아웃이 완료되었습니다.");
  };

  return (
    <>
      {loading ? (
        ""
      ) : (
        <>
          {currentUser === null && (
            <StBtn
              onClick={() => {
                setModalOpen(true);
                setModalType("login");
              }}
            >
              로그인
            </StBtn>
          )}

          {currentUser !== null && <StBtn onClick={logOut}>로그아웃</StBtn>}

          {currentUser == null && (
            <StBtn
              onClick={() => {
                setModalOpen(true);
                setModalType("signup");
              }}
            >
              가입하기
            </StBtn>
          )}
        </>
      )}
    </>
  );
}

const StBtn = styled.button`
  border-radius: 15px;
  word-break: keep-all;
  padding: 5px 10px;
  cursor: pointer;
`;
