import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDB3LCp185DCcegtAnc3sM5T5WOiyxdoVo",
  authDomain: "instagramclone-e8b64.firebaseapp.com",
  databaseURL: "https://instagramclone-e8b64-default-rtdb.firebaseio.com",
  projectId: "instagramclone-e8b64",
  storageBucket: "instagramclone-e8b64.appspot.com",
  messagingSenderId: "504951699846",
  appId: "1:504951699846:web:2680cfde187627aaab9407",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };

//export default db;
