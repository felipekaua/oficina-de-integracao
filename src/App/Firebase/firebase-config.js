import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3Dm32JRjnSu4z0yqrZ8EX8vYJNYYdYXs",
  authDomain: "oficintegra.firebaseapp.com",
  projectId: "oficintegra",
  storageBucket: "oficintegra.appspot.com",
  messagingSenderId: "532361524771",
  appId: "1:532361524771:web:78ff1494a59bbbb575e396",
  measurementId: "G-9BSYELRK7J"
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
})