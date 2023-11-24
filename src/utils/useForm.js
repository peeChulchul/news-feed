import { STORAGE } from "fb/myfirebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

const alertMsg = {
  size: "최대 10MB 이내의 파일만 등록가능합니다.",
  type: "잘못된 파일 입니다."
};
const mb = 1024 ** 2;
const possibleImgType = ["image/jpeg", "image/png", "image/webp"];

function validateImgFiles(e, file) {
  const currentFile = e.type === "change" ? file : file.getAsFile();
  const typeCheck = possibleImgType.includes(currentFile.type);
  const sizeCheck = currentFile.size <= 10 * mb;

  if (!typeCheck) {
    alert(alertMsg.type);
  }
  if (!sizeCheck) {
    alert(alertMsg.size);
  }
  return typeCheck && sizeCheck;
}

function createImgFileState(file) {
  const previewImg = URL.createObjectURL(file);
  const newFileName = uuid();
  return {
    file,
    previewImg,
    newFileName
  };
}

/**
 * firebase/Storeage에 사진을 업로드하는 함수
 * @param {String} storageMainFolderName Storeage에 있는 메인 폴더명 (posts || users)
 * @param {String} id 메인 폴더 안에 있는 폴더명 (posts = 게시물 id || users = user id)
 * @param {File} imgFile 업로드할 이미지 데이터
 */
async function uploadImg(storageMainFolderName, id, imgFileState) {
  const path = [storageMainFolderName, id, imgFileState.newFileName];
  const imgRef = ref(STORAGE, path.join("/"));
  try {
    const snapshot = await uploadBytes(imgRef, imgFileState.file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error(error);
  }
}

export { validateImgFiles, createImgFileState, uploadImg };
