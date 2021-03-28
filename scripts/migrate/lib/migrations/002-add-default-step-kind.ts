import { RunFn } from "../types";

const run: RunFn = async db => {
  const allSteps = await db.collection("steps").get();
  allSteps.forEach(doc => {
    doc.ref.set(
      {
        kind: "step"
      },
      { merge: true }
    );
  });
};

export default run;
