
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4NdxyEAKrVU8TEtCCJojZRcxMHQZRS_Q",
  authDomain: "fitness-app-944fc.firebaseapp.com",
  projectId: "fitness-app-944fc",
  storageBucket: "fitness-app-944fc.appspot.com",
  messagingSenderId: "978327309093",
  appId: "1:978327309093:web:70c5f1616567931ab3a8cc",
  measurementId: "G-EDVH8RSJPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)

