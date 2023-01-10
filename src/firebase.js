// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyDI5hjRgZeT7v1nL3lCZN9Re_2RQH9E9rQ",
  authDomain: "puzzele-time.firebaseapp.com",
  databaseURL: "https://puzzele-time-default-rtdb.firebaseio.com",
  projectId: "puzzele-time",
  storageBucket: "puzzele-time.appspot.com",
  messagingSenderId: "768830658079",
  appId: "1:768830658079:web:d26d89cf69933f4aac272a",
  measurementId: "G-5V4Y8N5CE9"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);