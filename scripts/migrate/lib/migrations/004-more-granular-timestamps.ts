import { RunFn } from "../types";
import { StepDTO } from "../../../../common/types/Step";

type RawStepData = Omit<StepDTO, "id">;

const run: RunFn = async (db) => {
  const allSteps = await db.collection("steps").get();
  allSteps.forEach((doc) => {
    const step = doc.data() as RawStepData;
    if (!step.practice_records) {
      return;
    }

    const updatedRecords = step.practice_records.map((record) => {
      if (!record.start_of_day) {
        record.start_of_day = record.date;
      }

      return record;
    });

    doc.ref.set(
      {
        practice_records: updatedRecords,
      },
      { merge: true }
    );
  });
};

export default run;
