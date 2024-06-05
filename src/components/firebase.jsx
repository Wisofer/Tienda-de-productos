import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZgbr2PbVpDXoqJFjhZI7u9Ow6E19Be2k",
  authDomain: "fire-producto.firebaseapp.com",
  projectId: "fire-producto",
  storageBucket: "fire-producto.appspot.com",
  messagingSenderId: "366580040370",
  appId: "1:366580040370:web:3548f085a469aa44f03fab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service
const db = getFirestore(app);

export default db;
