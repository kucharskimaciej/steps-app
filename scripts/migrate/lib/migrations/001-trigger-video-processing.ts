import { RunFn } from "../types";

const run: RunFn = async (db) => {
  const allSteps = await db.collection("steps").get();
  const updateToken = Date.now();
  allSteps.forEach((doc) => {
    doc.ref.set(
      {
        __t: updateToken,
      },
      { merge: true }
    );
  });
};

export default run;
