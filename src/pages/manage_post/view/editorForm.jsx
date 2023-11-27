import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Fieldset from "../fieldset";
import InputCheckRadio from "../inputCheckRadio";
import InputImg from "../inputImg";
// import { data } from "../mockHashtag";
import foodTagData from "data/foodTagData";
import tagData from "data/tagData";

import PreviewImg from "../previewImg";
import { validateImgFiles, createImgFileState, uploadImg, getFeedById, deleteImgFile } from "utils/useForm";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setPostsFirestore } from "redux/modules/postsFirestoreState";
import { useParams } from "react-router-dom";
import Spinner from "components/spinner";
import { useNavigate } from "react-router-dom";

function EditorForm() {
  const [selectImage, setSelectImage] = useState([]); // 쓰기 시 이미지
  const [storageImg, setStorageImg] = useState([]);
  const [junkStorageImg, setJunkStorageImg] = useState([]); //Storage에서 삭제할 이미지
  const [category, setCategory] = useState([]);
  const [hashtag, setHashtag] = useState([]);
  const [content, setContent] = useState("");
  const [currnetPostid, setCurrentPostid] = useState(uuid());
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.usersFirestoreState);
  const dispatch = useDispatch();
  const { userid, postid } = useParams();
  const onSubmit = async (e) => {
    e.preventDefault();
    // 1. 유효성 검사
    if ((selectImage.length > 0 || storageImg.length > 0) && hashtag.length > 0 && content !== "") {
      // 2. Storage에 이미지를 newFileName으로 저장
      const checkDone = new Array(selectImage).fill(null);
      for (let i = 0; i < selectImage.length; i++) {
        const storageObj = await uploadImg("posts", currnetPostid, selectImage[i]);
        if (storageObj) {
          checkDone[i] = storageObj;
          console.log("업로드 중");
        }
      }
      const allDone = postid && selectImage.length === 0 ? true : checkDone.every((n) => n !== null);
      if (allDone) {
        // 3. 이미지 업로드 후 FB에 데이터들 저장
        console.log("이미지 업로드 완료");
        const feedData = {
          category,
          content,
          hashtag,
          imgs: [...checkDone, ...storageImg].filter((n) => n !== null),
          postid: currnetPostid,
          uid: currentUser.uid,
          displayName: currentUser.displayName
        };
        // 4. 사용 안하는 이미지들 Storage에서 삭제
        junkStorageImg.forEach((n) => {
          deleteImgFile(n.storagePath);
        });
        // FB 업로드
        dispatch(setPostsFirestore(feedData));
        return navigate("/");
      }
    }
  };

  const onSelectImg = (e) => {
    const files = e.currentTarget.files;
    for (let file of files) {
      if (validateImgFiles(e, file)) {
        const newImgFileState = createImgFileState(file);
        setSelectImage((preState) => [...preState, newImgFileState]);
      }
    }
  };

  const onDeleteImg = (newFileName) => {
    const copy = selectImage.filter((n) => n.newFileName !== newFileName);
    setSelectImage(copy);
  };

  const onDrop = (e) => {
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (validateImgFiles(e, item)) {
          const file = item.getAsFile();
          const newImgFileState = createImgFileState(file);
          setSelectImage((preState) => [...preState, newImgFileState]);
        }
      });
    }
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const onChangeHashtag = (e) => {
    const hasValue = hashtag.includes(e.target.value);
    if (hasValue) {
      setHashtag(hashtag.filter((n) => n !== e.target.value));
    } else {
      const copy = [...hashtag];
      copy.push(e.target.value);
      setHashtag(copy);
    }
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onDeleteStorageImg = (url) => {
    const deleteStorageImg = storageImg.filter((n) => n.url === url);
    const copy = storageImg.filter((n) => n.url !== url);
    setStorageImg(copy);
    setJunkStorageImg([...junkStorageImg, ...deleteStorageImg]);
  };

  useEffect(() => {
    if (postid) {
      getFeedById(postid).then((res) => {
        const { category, content, hashtag, imgs } = res;
        setCategory(category);
        setHashtag([...hashtag]);
        setContent(content);
        setCurrentPostid(postid);
        setStorageImg(imgs);
      });
    }
  }, []);

  return (
    <StFormWrap>
      <StForm onSubmit={onSubmit}>
        <Fieldset legend={"사진"}>
          <StPreviewImgWrap>
            {selectImage.map((n) => {
              return (
                <PreviewImg
                  src={n.previewImg}
                  newFileName={n.newFileName}
                  key={uuid()}
                  onDeleteImg={onDeleteImg}
                  alt=""
                />
              );
            })}
            {storageImg.map((n) => {
              return (
                <PreviewImg src={n?.url} newFileName={n?.url} key={uuid()} onDeleteImg={onDeleteStorageImg} alt="" />
              );
            })}
          </StPreviewImgWrap>
          <InputImg onChange={onSelectImg} onDrop={onDrop} />
        </Fieldset>

        <Fieldset legend={"카테고리"}>
          <InputCheckRadio
            listData={["오운완", "오식완"]}
            checkedData={category}
            type={"radio"}
            name={"category"}
            onChange={onChangeCategory}
          ></InputCheckRadio>
        </Fieldset>
        <Fieldset legend={"해시태그"}>
          <InputCheckRadio
            listData={category === "오운완" ? tagData.map((n) => n.hashtag) : foodTagData.map((n) => n.hashtag)}
            checkedData={hashtag}
            type={"checkbox"}
            name={"hashtag"}
            onChange={onChangeHashtag}
          ></InputCheckRadio>
        </Fieldset>
        <Fieldset legend={"내용"}>
          <StTextarea
            name="내용"
            id=""
            cols="30"
            rows="10"
            value={content}
            onChange={onChangeContent}
            spellCheck="false"
            autoComplete="off"
          ></StTextarea>
        </Fieldset>
        <StBtn disabled={selectImage.length + storageImg.length === 0 || hashtag.length === 0 || content === ""}>
          게시물 등록
        </StBtn>
      </StForm>
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

const StTextarea = styled.textarea`
  border: 1px solid lightgray;
  border-radius: 1em;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.base};
  outline: none;
  resize: none;
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

export default EditorForm;
