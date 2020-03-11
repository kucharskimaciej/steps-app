import Firebase from "firebase-admin";

export type RunFn = (db: Firebase.firestore.Firestore) => Promise<void>;
export type Migration = { id: string; run: RunFn };
