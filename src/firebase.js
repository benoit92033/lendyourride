// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBo3VSraMY2yrAqXXcxlls3cB8qtsFFIVg",
    authDomain: "lend-your-ride-3615a.firebaseapp.com",
    projectId: "lend-your-ride-3615a",
    storageBucket: "lend-your-ride-3615a.appspot.com",
    messagingSenderId: "961519779201",
    appId: "1:961519779201:web:db9f3c5c58ed7b9f14bc80"
};

// Initialize Firebase
const firebase_data = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}

export default firebase_data;