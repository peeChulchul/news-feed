import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputImg from "pages/manage_post/inputImg";
import Fieldset from "pages/manage_post/fieldset";
import PreviewImg from "pages/manage_post/previewImg";
import { validateImgFiles, createImgFileState, uploadImg, getFeedById, deleteImgFile } from "../useForm";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "firebase/auth";

import { setUsersFirestore } from "redux/modules/usersFirestoreState";
import Spinner from "components/spinner";
import { AUTH } from "fb/myfirebase";
import { setPostsFirestore } from "redux/modules/postsFirestoreState";
function Index() {
  const { currentUser, loading } = useSelector((modules) => modules.usersFirestoreState);
  const { posts } = useSelector((modules) => modules.postsFirestoreState);
  const { userid } = useParams();
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState({
    file: currentUser?.photoURL,
    previewImg: currentUser?.photoURL,
    newFileName: ""
  });

  async function currentUserUpdate({ displayName, photoURL }) {
    const result = await updateProfile(AUTH.currentUser, {
      displayName,
      photoURL
    });
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (typeof profileImg.file !== "string") {
      const preImgDeleteCheck = deleteImgFile(`users/${userid}`);
      if (preImgDeleteCheck) {
        const storageObj = await uploadImg("users", profileImg);
        if (storageObj) {
          await currentUserUpdate({ displayName: nickname, photoURL: storageObj.url });
          dispatch(setUsersFirestore({ ...currentUser, displayName: nickname, photoURL: storageObj.url }));
          //
          await posts.forEach((post) => {
            if (post.uid === currentUser.uid) {
              dispatch(setPostsFirestore({ ...post, displayName: nickname, photoURL: storageObj.url }));
            }
          });
        }
      }
    } else {
      await currentUserUpdate({ displayName: nickname, photoURL: currentUser?.photoURL });
      dispatch(setUsersFirestore({ ...currentUser, displayName: nickname, photoURL: currentUser?.photoURL }));
      //
      await posts.forEach((post) => {
        if (post.uid === currentUser.uid) {
          dispatch(setPostsFirestore({ ...post, displayName: nickname, photoURL: currentUser?.photoURL }));
        }
      });
    }

    return navigate("/");
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeImg = (e) => {
    const file = e.currentTarget.files[0];
    const imgObject = {
      file,
      previewImg: URL.createObjectURL(file),
      newFileName: userid
    };
    console.log(imgObject);
    setProfileImg(imgObject);
  };

  const onDropImg = (e) => {
    if (e.dataTransfer.items) {
      const firstImg = [...e.dataTransfer.items][0];
      const file = firstImg.getAsFile();
      const newImgFileState = createImgFileState(file, userid);
      setProfileImg(newImgFileState);
    }
  };

  // useEffect(() => {
  //   const userData = async () => {
  //     const currentUserData = await currentUser;
  //     if (currentUserData?.uid !== userid || currentUserData === null) {
  //       return false;
  //     } else {
  //       setUser(currentUser);
  //       return true;
  //     }
  //   };

  //   if (userData() === false) {
  //     navigate("/");
  //   }
  // }, []);

  useEffect(() => {
    if (currentUser === null) {
      return;
    }
    // setUser(currentUser);
    setNickname(currentUser?.displayName);
    setProfileImg((prev) => ({ ...prev, file: currentUser?.photoURL }));
  }, [currentUser]);

  // useEffect(() => {
  //   console.log(user);
  //   console.log(nickname);
  //   setNickname(user?.displayName);
  //   setProfileImg((prev) => ({ ...prev, file: user?.photourl }));
  // }, [user, nickname]);

  return (
    <StFormWrap>
      {loading ? (
        <StLoadingBox>
          <Spinner />
        </StLoadingBox>
      ) : (
        <StForm onSubmit={onSubmit}>
          <Fieldset legend={"이메일"}>
            <p>{currentUser?.email}</p>
          </Fieldset>
          <Fieldset legend={"닉네임"}>
            <StInput value={nickname} onChange={onChangeNickname} />
          </Fieldset>
          <Fieldset legend={"프로필 사진"}>
            <StPreviewImgWrap>
              <StImg src={profileImg?.previewImg} alt={"유저이미지"} />
            </StPreviewImgWrap>
            <InputImg onChange={onChangeImg} onDrop={onDropImg} />
          </Fieldset>

          <StBtn disabled={false}>수정하기</StBtn>
        </StForm>
      )}
    </StFormWrap>
  );
}

const StFormWrap = styled.div`
  /* 임시 너비 */
  width: 800px;
  margin: 0 auto;
`;

const StForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StPreviewImgWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.base};
`;

const StImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const StInput = styled.input`
  border: 1px solid lightgray;
  border-radius: 1em;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.base};
  outline: none;
  transition: ${({ theme }) => theme.animation.transition};
  &:focus {
    border: 1px solid ${({ theme }) => theme.color.base};
  }
`;

const StBtn = styled.button`
  padding: 0.5em 1em;
  border-radius: 1em;
  transition: ${({ theme }) => theme.animation.transition};
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.base};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: bold;
  cursor: pointer;
  margin: auto;

  &:hover {
    background-color: ${({ theme }) => theme.color.baseLight};
    color: ${({ theme }) => theme.color.white};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.baseDark};
    color: ${(props) => props.theme.color.white};
  }

  &:disabled {
    background-color: lightGray;
    color: ${({ theme }) => theme.color.white};
    cursor: not-allowed;
  }
`;

const StLoadingBox = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  & span {
    width: 200px;
    height: 200px;
  }
`;
export default Index;
