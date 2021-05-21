import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD6ZYnFds_RYh2Xduzn1AVxcVs5RMivyG0",
    authDomain: "facebook-messenger-clone-645f7.firebaseapp.com",
    projectId: "facebook-messenger-clone-645f7",
    storageBucket: "facebook-messenger-clone-645f7.appspot.com",
    messagingSenderId: "36941131983",
    appId: "1:36941131983:web:e4d05f1a36d65a63ebc7ba",
    measurementId: "G-2FJL3RXZRR"
});

const db = firebaseApp.firestore();

export default db;