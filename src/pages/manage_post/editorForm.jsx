import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Fieldset from "./fieldset";
import InputCheckRadio from "./inputCheckRadio";

import { data } from "./mockHashtag";

function EditorForm() {
  const [category, setCategory] = useState(data.checkedCategory);
  const [hashtag, setHashtag] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
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

  return (
    <StFormWrap>
      <StForm onSubmit={onSubmit}>
        <Fieldset legend={"사진"}>
          <input type="file" name="" id="" />
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
          <textarea name="내용" id="" cols="30" rows="10"></textarea>
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
