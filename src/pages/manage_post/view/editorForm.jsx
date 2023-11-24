import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Fieldset from "../fieldset";
import InputCheckRadio from "../inputCheckRadio";
import InputImg from "../inputImg";
import { data } from "../mockHashtag";
import PreviewImg from "../previewImg";
import { createImgFileState, createSummitObj, uploadImg } from "utils/useForm";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { setFirestore } from "redux/modules/firestoreState";
function EditorForm() {
  const [selectImage, setSelectImage] = useState([]);
  const [category, setCategory] = useState(data.checkedCategory);
  const [hashtag, setHashtag] = useState([]);
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    // 1. 유효성 검사
    if (selectImage.length > 0 && hashtag.length > 0 && content !== "") {
      // 2. Storage에 이미지를 newFileName으로 저장
      const checkDone = new Array(selectImage).fill(false);
      const selectImgId = selectImage.map((n) => n.newFileName);
      for (let i = 0; i < selectImage.length; i++) {
        const uploadSuccess = await uploadImg("posts", "mock01", selectImage[i]);
        if (uploadSuccess === true) {
          checkDone[i] = true;
          console.log("업로드 중");
        }
      }
      const allDone = checkDone.every((n) => n === true);
      if (allDone) {
        // 3. 이미지 업로드 후 FB에 데이터들 저장
        alert("업로드 완료");
        const feedData = createSummitObj(category, content, hashtag, selectImgId);
        console.log(feedData);

        // FB 업로드
        dispatch(setFirestore(feedData));
      }
    }
  };

  const onSelectImg = (e) => {
    const files = e.currentTarget.files;
    for (let file of files) {
      const newImgFileState = createImgFileState(file);
      setSelectImage((preState) => [...preState, newImgFileState]);
    }
  };

  const onDeleteImg = (newFileName) => {
    const copy = selectImage.filter((n) => n.newFileName !== newFileName);
    setSelectImage(copy);
  };

  const onDrop = (e) => {
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (
          item.kind === "file" &&
          (item.type === "image/jpeg" || item.type === "image/png" || item.type === "image/webp")
        ) {
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
    console.log(selectImage);
  }, [selectImage]);

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
