// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    //      apiKey: "AIzaSyBz29ZpTp2TRbVk3UdJZ-4qjfxMkaplMW0",
    //   authDomain: "studyhub-e949e.firebaseapp.com",
    //   projectId: "studyhub-e949e",
    //   storageBucket: "studyhub-e949e.firebasestorage.app",
    //   messagingSenderId: "978271873974",
    //   appId: "1:978271873974:web:0173627348512b26d7af17"

    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);