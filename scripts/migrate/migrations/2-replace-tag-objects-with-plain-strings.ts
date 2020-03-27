import { RunFn } from "../types";
import Firebase from "firebase-admin";
import { Tag } from "../../../common/types/Tag";

const run: RunFn = async (db: Firebase.firestore.Firestore) => {
  const allStepsSnapshot = await db.collection("steps").get();

  for (let stepSnapshot of allStepsSnapshot.docs) {
    const stepTags: Tag[] = stepSnapshot.data().tags;

    await db
      .collection("steps")
      .doc(stepSnapshot.id)
      .set(
        {
          tags: stepTags.map(t => t.text)
        },
        { merge: true }
      );
  }
};

export default run;
