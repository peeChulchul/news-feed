import { STORAGE } from "fb/myfirebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { DB } from "fb/myfirebase";

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
    const imgObj = {
      storagePath: imgRef._location.path_,
      url: await getDownloadURL(snapshot.ref)
    };
    return imgObj;
  } catch (error) {
    console.error(error);
  }
}

//수정할 때 쓰는 함수
async function getFeedById(docId) {
  const docRef = doc(DB, "posts", docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error(`해당 id로 존재하는 게시물 없음 : ${docId}`);
  }
}

//수정할 때 쓰는 함수
// Storage에서 사진 지우기
async function deleteImgFile(storagePath) {
  const desertRef = ref(STORAGE, storagePath);

  try {
    const result = await deleteObject(desertRef);
    if (result) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}
export { validateImgFiles, createImgFileState, uploadImg, getFeedById, deleteImgFile };

// "ㄴㅇㄹㄴㅇㄹㄴㅇㄹ"

// // {
// //   root: "dfsdfsdf",
// //   url : "https://firebasestorage.googleapis.com/v0/b/newsfeed-200f7.appspot.com/o/posts%2Fmock01%2F357ccc24-6df3-468b-826a-5379a0141fa4?alt=media&token=373ba49c-89c3-4f62-942a-1731dc45792c"
// // }
