// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3AuTjX95-vMtEev6Ft6DGjJDNb2r2-yE",
  authDomain: "resume-builder-1d9d9.firebaseapp.com",
  projectId: "resume-builder-1d9d9",
  storageBucket: "resume-builder-1d9d9.appspot.com",
  messagingSenderId: "79041754832",
  appId: "1:79041754832:web:3469e368a080ccedcc90d5",
  measurementId: "G-ER0DYS3HQV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage=getStorage(app)
export {db, app, auth ,storage};








