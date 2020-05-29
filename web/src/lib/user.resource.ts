import { Service } from "vue-typedi";
import { User } from "../../../common/types/User";
import { FirestoreService } from "@/lib/firebase/firestore.service";

@Service()
export class UserResource {
  private readonly collection = this.db.collection("users");

  constructor(private db: FirestoreService) {}

  fetch(uid: string): Promise<User> {
    return this.collection
      .doc(uid)
      .get()
      .then(response => (response.data() as User) || { practice: [] });
  }

  async upsert(uid: string, params: Partial<User>): Promise<User> {
    await this.collection.doc(uid).set(params, { merge: true });
    return this.fetch(uid);
  }
}
