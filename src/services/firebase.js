import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDwe8xI8HnB482koRJHfsK9AGw5gkzhyEU",
  authDomain: "patient-management-app-bda09.firebaseapp.com",
  projectId: "patient-management-app-bda09",
  storageBucket: "patient-management-app-bda09.appspot.com",
  messagingSenderId: "88025691663",
  appId: "1:88025691663:web:7b428611c96b5d2786957a",
});

const db = firebaseApp.firestore();

export default db;
