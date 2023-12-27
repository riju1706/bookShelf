// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJk3lg-DHBlLj-Is3TvlKEcvPkAZgAqco",
  authDomain: "bookstore-792a0.firebaseapp.com",
  projectId: "bookstore-792a0",
  storageBucket: "bookstore-792a0.appspot.com",
  messagingSenderId: "267828161722",
  appId: "1:267828161722:web:e436db4c7683b598932683",
  measurementId: "G-M6NLL4EJL6",
  databaseURL: "https://bookstore-792a0-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
