import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const FIREBASE_CONFIG = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID
};

export type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
export type CollectionRef = firebase.firestore.CollectionReference;
export type UploadTask = firebase.storage.UploadTask;

firebase.initializeApp(FIREBASE_CONFIG);
export const authProvider = new firebase.auth.GoogleAuthProvider();

export { firebase };
