import React from "react";
import EditorForm from "../editorForm";
import Hashtag from "components/hashtag";
export default function ManagePost() {
  return (
    <div>
      <Hashtag hashtag={false} content="헬스" active={true} size={"sm"} />
      <Hashtag hashtag={true} content="헬스" active={true} />
      <Hashtag hashtag={false} content="헬스" active={false} />
      <Hashtag
        hashtag={true}
        content="헬스"
        active={false}
        onClick={() => {
          console.log(1);
        }}
      />
      <EditorForm></EditorForm>
    </div>
  );
}
