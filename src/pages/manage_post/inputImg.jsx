import React from "react";

function InputImg({ onChange }) {
  return (
    <>
      <div>이미지 들어가는 곳</div>
      <input type="file" id="avatar" name="avatar" accept="image/*" multiple onChange={onChange} />
    </>
  );
}

export default InputImg;
