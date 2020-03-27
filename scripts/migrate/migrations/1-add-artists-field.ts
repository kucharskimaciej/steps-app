import { RunFn } from "../types";
import Firebase from "firebase-admin";
import { RawStep } from "../../../common/types/Step";

const run: RunFn = async (db: Firebase.firestore.Firestore) => {
  const allStepsSnapshot = await db.collection("steps").get();

  for (let stepSnapshot of allStepsSnapshot.docs) {
    await db
      .collection("steps")
      .doc(stepSnapshot.id)
      .set(
        {
          artists: []
        } as Partial<RawStep>,
        { merge: true }
      );
  }
};

export default run;
