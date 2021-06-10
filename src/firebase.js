// Firebase App (the core Firebase SDK) is always required and must be listed first
import app from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyBo3VSraMY2yrAqXXcxlls3cB8qtsFFIVg",
  authDomain: "lend-your-ride-3615a.firebaseapp.com",
  projectId: "lend-your-ride-3615a",
  storageBucket: "lend-your-ride-3615a.appspot.com",
  messagingSenderId: "961519779201",
  appId: "1:961519779201:web:db9f3c5c58ed7b9f14bc80"
};

// // Initialize Firebase
const firebase_data = app.initializeApp(config);


const storage = app.storage()
const db = app.firestore();

export const auth = app.auth();
const googleProvider = new app.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
    let user = res.user;
    if (user != undefined) {
      db.collection('users').where('private.email', '==', user?.email).get().then(snapshot => {
        console.log(snapshot);
        if (snapshot.empty) {
          db.collection('users').add({
            admin: false,
            public: {
              prenom: user?.displayName,
              photo: user?.photoURL,
            },
            private: {
              email: user?.email,
              telephone: user?.phoneNumber,
            }
          })
        }
      });
    }
  }).catch((error) => {
    console.log(error.message)
  })
}

export {
  storage, db as default
}
