import { Service } from "vue-typedi";
import { CollectionRef, DocumentSnapshot } from "@/lib/firebase/firebase";
import { DatabaseItem } from "../../common/types/common/DatabaseItem";
import { Owned } from "../../common/types/common/Owned";
import { FirestoreService } from "@/lib/firebase/firestore.service";

type OwnedDatabaseItem = DatabaseItem & Owned;

@Service()
export abstract class Resource<
  T extends OwnedDatabaseItem,
  CreateParams,
  UpdateParams extends Partial<T>
> {
  protected abstract readonly collection: CollectionRef;

  constructor(protected firestore: FirestoreService) {}

  public async query(uid: string): Promise<T[]> {
    const querySnapshot = await this.collection
      .where("owner_uid", "==", uid)
      .get();

    return querySnapshot.docs.map(this.toDocument);
  }

  public async fetch(id: string): Promise<T> {
    const snapshot = await this.collection.doc(id).get();
    return this.toDocument(snapshot);
  }

  public abstract create(params: CreateParams): Promise<T>;

  public async update(id: string, update: UpdateParams): Promise<T> {
    const documentRef = this.collection.doc(id);

    await documentRef.set(update, { merge: true });
    return documentRef.get().then(this.toDocument);
  }

  public async remove(id: string): Promise<void> {
    const documentRef = this.collection.doc(id);
    await documentRef.delete();
  }

  protected toDocument(snapshot: DocumentSnapshot): T {
    return {
      ...snapshot.data(),
      id: snapshot.id
    } as T;
  }
}
