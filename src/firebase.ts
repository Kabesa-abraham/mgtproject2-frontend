// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "managementproject-4627b.firebaseapp.com",
    projectId: "managementproject-4627b",
    storageBucket: "managementproject-4627b.firebasestorage.app",
    messagingSenderId: "513536284041",
    appId: "1:513536284041:web:527321c32e2337e0293d58",
    measurementId: "G-C9KS1KEBKB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);