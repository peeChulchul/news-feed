// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase 기본설정 (key, id 등)
export const app = initializeApp(firebaseConfig);

// 계정과 연동된 인증서비스 및 데이터베이스
export const AUTH = getAuth(app);
export const DB = getFirestore(app);
export const STORAGE = getStorage(app);

// AUTH 세션지속성 설정 세션으로 설정함(창닫으면 로그인정보 사라짐)
setPersistence(AUTH, browserSessionPersistence);

// 데이터베이스의 콜랙션을 선택한 변수들
export const postsCollection = collection(DB, "posts");
export const usersCollection = collection(DB, "users");
