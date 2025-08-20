// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCigx3DJV1m4hEW6CGz395m51goRKx697A",
  authDomain: "borini-demo.firebaseapp.com",
  projectId: "borini-demo",
  storageBucket: "borini-demo.firebasestorage.app",
  messagingSenderId: "215573286770",
  appId: "1:215573286770:web:2c8adf46fa4be6c10017eb",
  measurementId: "G-SBEKJ8YBQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);