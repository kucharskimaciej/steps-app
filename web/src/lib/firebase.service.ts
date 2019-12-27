import { Service } from "typedi";
import * as firebase from "firebase";

const FIREBASE_CONFIG = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID
};

export const Timestamp  = firebase.firestore.Timestamp;
export type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Service()
export class FirebaseService {
    private readonly firebaseApp: firebase.app.App;
    private readonly authProvider: firebase.auth.GoogleAuthProvider;
    private readonly firestore: firebase.firestore.Firestore;

    constructor() {
        this.firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
        this.authProvider = new firebase.auth.GoogleAuthProvider();
        this.firestore = firebase.firestore();
    }

    setup() {
        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .catch(err => /*noop*/ {});
    }

    get currentUser(): firebase.User | null {
        return firebase.auth().currentUser;
    }

    public onAuthStateChange(cb: (user: firebase.User | null) => void): void {
        firebase.auth().onAuthStateChanged(cb);
    }

    public async authenticate() {
        await firebase.auth().signInWithPopup(this.authProvider);
    }

    get db(): firebase.firestore.Firestore {
        return this.firestore;
    }
}
