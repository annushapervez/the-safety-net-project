// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNWQqWv89Ma1CU1bMnXKIdFmaN3eBUMeg",
  authDomain: "thesafetynetproject-34662.firebaseapp.com",
  projectId: "thesafetynetproject-34662",
  storageBucket: "thesafetynetproject-34662.firebasestorage.app",
  messagingSenderId: "478786315236",
  appId: "1:478786315236:web:c58c101206ccd652389df1",
  measurementId: "G-PPX8ZWDW5H"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };