// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";
import { initializeApp } from "firebase/app" ;
import { getAuth } from "firebase/auth" ;
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
} ; 

// firebase.initializeApp(firebaseConfig) ;
// export const firebaseInstance = firebase ; 
// export const authService = firebase.auth() ; 
// export const dbService = firebase.firestore() ; 
// export const storageService = firebase.storage();
const app = initializeApp(firebaseConfig) ;
export const auth = getAuth(app) ;
export const db = getFirestore(app) ;
export const storage = getStorage(app) ;