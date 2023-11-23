import React, { useState } from "react";
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
      alert("업로드 완료");
      const feedData = createSummitObj(category, content, hashtag, selectImgId);
      console.log(feedData);
      // ===================
      // Storage 에 저장된 이미지의 id 값으로 전달해야하는지?
      // Storage 에 저장된 이미지의 id 값으로 가져올 수 있는 이미지의 URL을 저장해야하는지?
      // =============================
      dispatch(setFirestore(feedData));
    }
    // console.log(submitObj);
  };

  const onSelectImg = (e) => {
    const files = e.currentTarget.files;
    for (let file of files) {
      const newImgFileState = createImgFileState(file);
      setSelectImage((preState) => [...preState, newImgFileState]);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item, i) => {
        if (
          item.kind === "file" &&
          (item.type === "image/jpeg" || item.type === "image/png" || item.type === "image/webp")
        ) {
          const file = item.getAsFile();
          const newImgFileState = createImgFileState(file);
          setSelectImage((preState) => [...preState, newImgFileState]);
        }
      });
    } else {
      [...e.dataTransfer.files].forEach((file, i) => {
        console.log(`file[${i}].name = ${file.name}`);
        console.log(`file[${i}].type = ${file.type}`);
      });
    }
    console.log(selectImage);
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

  return (
    <StFormWrap>
      <StForm onSubmit={onSubmit}>
        <Fieldset legend={"사진"}>
          <div style={{ display: "flex" }}>
            {selectImage.map((n) => {
              return <PreviewImg src={n.preveiwImg} key={uuid()} alt="" />;
            })}
          </div>
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
          <textarea name="내용" id="" cols="30" rows="10" value={content} onChange={onChangeContent}></textarea>
        </Fieldset>
        <button>Summit</button>
      </StForm>
    </StFormWrap>
  );
}

const StFormWrap = styled.div``;

const StForm = styled.form`
  & .imgGroup {
  }
`;

export default EditorForm;
