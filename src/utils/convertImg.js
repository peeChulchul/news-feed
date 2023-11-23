class imgState {
  constructor(fileImg) {
    this.name = fileImg.name;
    this.objectURL = createObjectURL(fileImg);
    this.base64 = createBase64(fileImg);
  }
}

// 미리보기용
function createObjectURL(fileImg) {
  return URL.createObjectURL(fileImg);
}

// 업로드용
async function createBase64(fileImg) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileImg);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
}

async function createImgState(fileImg) {
  const previewURL = createObjectURL(fileImg);
  const uploadData = await createBase64(fileImg);
  const obj = {
    name: fileImg.name,
    previewURL,
    uploadData
  };
  return obj;
}

export { createImgState };
