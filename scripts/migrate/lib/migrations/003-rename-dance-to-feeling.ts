import { RunFn } from "../types";

const run: RunFn = async (db) => {
  const allSteps = await db.collection("steps").get();
  allSteps.forEach((doc) => {
    const step = doc.data() as { dance: string };

    doc.ref.set(
      {
        feeling: step.dance,
        dance: null,
      },
      { merge: true }
    );
  });
};

export default run;
