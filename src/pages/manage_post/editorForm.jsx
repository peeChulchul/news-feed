import React from "react";
import styled from "styled-components";
import FieldsetCheckBox from "./fieldsetCheckBox";
import mockHashtag from "./mockHashtag";
function EditorForm() {
  return (
    <StFormWrap>
      <StForm>
        <fieldset>
          <legend>사진</legend>
        </fieldset>
        <input type="file" name="" id="" />
        <FieldsetCheckBox listData={mockHashtag} type={"radio"} legend={"카테고리"}></FieldsetCheckBox>
        <FieldsetCheckBox listData={mockHashtag} type={"checkbox"} legend={"해시태그"}></FieldsetCheckBox>
        <textarea name="" id="" cols="30" rows="10"></textarea>
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
