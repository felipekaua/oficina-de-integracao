// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3Dm32JRjnSu4z0yqrZ8EX8vYJNYYdYXs",
  authDomain: "oficintegra.firebaseapp.com",
  projectId: "oficintegra",
  storageBucket: "oficintegra.appspot.com",
  messagingSenderId: "532361524771",
  appId: "1:532361524771:web:78ff1494a59bbbb575e396",
  measurementId: "G-9BSYELRK7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);