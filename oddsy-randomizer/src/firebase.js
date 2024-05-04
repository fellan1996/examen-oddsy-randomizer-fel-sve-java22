// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKbLjosd08rcUKWR2Imzv2G2OA-4PUG-Y",
  authDomain: "oddsy-randomizer.firebaseapp.com",
  projectId: "oddsy-randomizer",
  storageBucket: "gs://oddsy-randomizer.appspot.com",
  messagingSenderId: "558143348206",
  appId: "1:558143348206:web:dbba8171e5e1cb47f742ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);