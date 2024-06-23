// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7XVkmvdtGiEP1Wxf7K3DqPp8BO4tQvRU",
  authDomain: "netflixgpt-960d8.firebaseapp.com",
  projectId: "netflixgpt-960d8",
  storageBucket: "netflixgpt-960d8.appspot.com",
  messagingSenderId: "267606646381",
  appId: "1:267606646381:web:2139b2ea914b04f7156964",
  measurementId: "G-YPNDL691PR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();