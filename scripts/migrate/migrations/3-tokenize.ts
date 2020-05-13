import { RunFn } from "../types";
import Firebase from "firebase-admin";
import { RawStep } from "../../../common/types/Step";
import { Container } from "typedi";
import { TokenizeService } from "../../../web/src/lib/tokenize.service";

const run: RunFn = async (db: Firebase.firestore.Firestore) => {
  const tokenizer = Container.get(TokenizeService);
  const allStepsSnapshot = await db.collection("steps").get();

  for (let stepSnapshot of allStepsSnapshot.docs) {
    const name = (stepSnapshot.data() as RawStep).name;

    await db
      .collection("steps")
      .doc(stepSnapshot.id)
      .set(
        {
          tokens: tokenizer.tokenize(name)
        },
        { merge: true }
      );
  }
};

export default run;
