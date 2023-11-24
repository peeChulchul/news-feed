import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Fieldset from "../fieldset";
import InputCheckRadio from "../inputCheckRadio";
import InputImg from "../inputImg";
import { data } from "../mockHashtag";
import PreviewImg from "../previewImg";
import { validateImgFiles, createImgFileState, uploadImg, getFeedById, deleteImgFile } from "utils/useForm";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { setPostsFirestore } from "redux/modules/postsFirestoreState";
import { useParams } from "react-router-dom";
import Spinner from "components/spinner";
function EditorForm() {
  const [selectImage, setSelectImage] = useState([]); // 쓰기 시 이미지
  const [storageImg, setStorageImg] = useState([]); //수정 시 이미지
  const [category, setCategory] = useState([]);
  const [hashtag, setHashtag] = useState([]);
  const [content, setContent] = useState("");
  const [currnetPostid, setCurrentPostid] = useState(uuid());

  const dispatch = useDispatch();
  const { userid, postid } = useParams();
  const onSubmit = async (e) => {
    e.preventDefault();
    // 1. 유효성 검사
    if (selectImage.length > 0 && hashtag.length > 0 && content !== "") {
      // 2. Storage에 이미지를 newFileName으로 저장
      const checkDone = new Array(selectImage).fill(null);
      for (let i = 0; i < selectImage.length; i++) {
        const downloadURL = await uploadImg("posts", currnetPostid, selectImage[i]);
        if (downloadURL) {
          checkDone[i] = downloadURL;
          console.log("업로드 중");
        }
      }
      const allDone = checkDone.every((n) => n !== null);
      if (allDone) {
        // 3. 이미지 업로드 후 FB에 데이터들 저장
        console.log("이미지 업로드 완료");
        const feedData = {
          category,
          content,
          hashtag,
          imgs: checkDone,
          postid: currnetPostid,
          uid: "user uid",
          displayName: "user displayName"
        };
        console.log(feedData);
        // FB 업로드
        dispatch(setPostsFirestore(feedData));
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

  useEffect(() => {
    if (postid) {
      getFeedById(postid).then((res) => {
        const { category, content, hashtag, imgs } = res;
        console.log(res);
        setCategory(category);
        setHashtag([...hashtag]);
        setContent(content);
        setCurrentPostid(postid);
        setStorageImg(imgs);
      });
    }
  }, []);

  useEffect(() => {
    console.log(storageImg);
  }, [storageImg]);

  return (
    <StFormWrap>
      <button
        onClick={() => {
          deleteImgFile("posts/60a5fa75-951e-45d8-b8eb-d6d35d21ae14/310fb6e9-bcfa-4c28-b098-448d0e2b130b");
        }}
      >
        삭제
      </button>
      <Spinner></Spinner>
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
                <PreviewImg src={n.url} newFileName={n.newFileName} key={uuid()} onDeleteImg={onDeleteImg} alt="" />
              );
            })}
          </StPreviewImgWrap>
          <InputImg onChange={onSelectImg} onDrop={onDrop} />
        </Fieldset>

        <Fieldset legend={"카테고리"}>
          <InputCheckRadio
            listData={data.allCategory}
            checkedData={category}
            type={"radio"}
            name={"category"}
            onChange={onChangeCategory}
          ></InputCheckRadio>
        </Fieldset>
        <Fieldset legend={"해시태그"}>
          <InputCheckRadio
            listData={data.allHashtag}
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
        <StBtn disabled={selectImage.length === 0 || hashtag.length === 0 || content === ""}>게시물 등록</StBtn>
      </StForm>
    </StFormWrap>
  );
}

const StFormWrap = styled.div`
  /* 임시 너비 */
  width: 500px;
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
