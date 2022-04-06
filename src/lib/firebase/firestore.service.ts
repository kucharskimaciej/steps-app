import { Service } from "typedi";
import { firebase, CollectionRef } from "@/lib/firebase/firebase";

@Service()
export class FirestoreService {
  private readonly firestore = firebase.firestore();

  collection(name: string): CollectionRef {
    return this.firestore.collection(name);
  }

  get db() {
    return this.firestore;
  }
}
