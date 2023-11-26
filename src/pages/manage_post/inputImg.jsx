import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineUploadFile } from "react-icons/md";

function InputImg({ onChange, onDrop, multiple = true }) {
  const [dropZoneActive, setDropZoneActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setDropZoneActive(true);
  };

  const handleDragLeave = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setDropZoneActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDropZoneActive(false);
    onDrop(e);
  };

  return (
    <>
      <StInputWrap className={dropZoneActive ? "active" : ""}>
        <StInput
          type="file"
          id="posts__img"
          name="posts__img"
          accept="image/*"
          multiple={multiple}
          onChange={onChange}
        />
        <StLabel
          className={dropZoneActive ? "active" : ""}
          htmlFor="posts__img"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <MdOutlineUploadFile className="icon" />
          <p>
            <b>드래그 앤 드롭</b> 또는 <b>클릭</b>하여 업로드해주세요.
          </p>
          <p>
            최대 <b>10mb 이하</b> <b>jpeg, png, webp</b> 첨부 가능
          </p>
        </StLabel>
      </StInputWrap>
    </>
  );
}

const StInputWrap = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.base};
  background-color: ${({ theme }) => theme.color.white};
  border: 3px solid #a5a5a5;
  border-radius: 1rem;
  transition: ${({ theme }) => theme.animation.transition};
  &.active,
  &:hover {
    border: 3px solid ${({ theme }) => theme.color.base};
  }
`;

const StInput = styled.input`
  display: none;
`;

const StLabel = styled.label`
  width: 100%;
  min-height: 200px;
  border: 4px dashed #a5a5a5;
  border-radius: 1rem;
  color: #a5a5a5;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.base};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.animation.transition};

  b {
    font-weight: bold;
  }

  .icon {
    font-size: 80px;
  }

  &.active,
  &:hover {
    border: 4px dashed ${({ theme }) => theme.color.baseLight};
  }
`;

export default InputImg;
