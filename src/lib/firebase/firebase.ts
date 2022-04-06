import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
};

export type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
export type CollectionRef = firebase.firestore.CollectionReference;
export type UploadTask = firebase.storage.UploadTask;

firebase.initializeApp(FIREBASE_CONFIG);
export const authProvider = new firebase.auth.GoogleAuthProvider();

export { firebase };
