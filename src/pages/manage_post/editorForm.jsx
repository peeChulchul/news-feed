import React, { useState } from "react";
import styled from "styled-components";
import Fieldset from "./fieldset";
import InputCheckRadio from "./inputCheckRadio";
import InputImg from "./inputImg";
import { data } from "./mockHashtag";
import PreviewImg from "./previewImg";
import { createImgState } from "utils/convertImg";

function EditorForm() {
  const [selectImage, setSelectImage] = useState([]);
  const [category, setCategory] = useState(data.checkedCategory);
  const [hashtag, setHashtag] = useState([]);
  const [content, setContent] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    const submitObj = {
      category,
      hashtag,
      content
    };
    console.log(submitObj);
  };

  const onSelectImg = (e) => {
    const files = e.currentTarget.files;
    for (let file of files) {
      createImgState(file).then((res) => {
        setSelectImage((prev) => [...prev, res]);
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

  return (
    <StFormWrap>
      <div style={{ display: "flex" }}>
        {selectImage.map((n, i) => {
          return <PreviewImg src={n.previewURL} key={i} alt="" />;
        })}
      </div>
      <StForm onSubmit={onSubmit}>
        <Fieldset legend={"사진"}>
          <InputImg onChange={onSelectImg} />
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
