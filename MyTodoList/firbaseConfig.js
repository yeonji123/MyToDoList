// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnx_0F_HTfwVRPl8kEoShmUUkFotGqZJQ",
  authDomain: "mytodolist-e83a1.firebaseapp.com",
  projectId: "mytodolist-e83a1",
  storageBucket: "mytodolist-e83a1.appspot.com",
  messagingSenderId: "579218706190",
  appId: "1:579218706190:web:98dbe55877587f34df115f",
  measurementId: "G-ENY4FTV7QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
})
export { db }
