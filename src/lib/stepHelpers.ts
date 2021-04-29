import { RawStep, Step } from "../../common/types/Step";
import { day } from "@/lib/dateHelpers";

export function hasRecordedPracticeOnDate(
  step: Step | RawStep,
  date: Date | number,
  collectionId?: string
): boolean {
  const dayStart = day(date);

  return Boolean(
    step.practice_records &&
      step.practice_records.some(
        record =>
          record.date === dayStart &&
          (!collectionId || record.collection_id === collectionId)
      )
  );
}

export function hasRecordedPracticeToday(
  step: Step | RawStep,
  collectionId?: string
): boolean {
  return hasRecordedPracticeOnDate(step, Date.now(), collectionId);
}
