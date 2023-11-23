import { STORAGE } from "fb/myfirebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

function createImgFileState(file) {
  const preveiwImg = URL.createObjectURL(file);
  const newFileName = uuid();

  return {
    file,
    preveiwImg,
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
    const uploadSuccess = await uploadBytes(imgRef, imgFileState.file);
    if (uploadSuccess) {
      return true;
    } else {
      console.log("업로드에 실패하였습니다.");
    }
  } catch (error) {
    console.error(error);
  }
}

// firebase/firestore Database 이용 함수
function createSummitObj(content, hashtags, imgsURL) {
  return {
    content: content,
    hashtag: hashtags,
    imgs: imgsURL,
    like: 0,
    postid: "mock01",
    uid: "admin01"
  };
}
export { createImgFileState, createSummitObj, uploadImg };
