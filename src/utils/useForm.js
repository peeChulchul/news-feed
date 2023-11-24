import { STORAGE } from "fb/myfirebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

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
    // uploadBytes(imgRef, imgFileState.file)
    //   .then((snapshot) => {
    //     return getDownloadURL(snapshot.ref);
    //   })
    //   .then((downloadURL) => {
    //     return downloadURL;
    //     // console.log("Download URL", downloadURL);
    //   });

    const snapshot = await uploadBytes(imgRef, imgFileState.file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
    // if (uploadTask) {
    //   console.log("downloadURL:");
    //   console.log(uploadTask.downloadURL);
    //   return true;
    // } else {
    //   console.log("업로드에 실패하였습니다.");
    // }
  } catch (error) {
    console.error(error);
  }
}

// function createStorageImgUrl = ()

// firebase/firestore Database 이용 함수

export { createImgFileState, uploadImg };
