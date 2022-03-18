import { StepDTO, Step } from "../../common/types/Step";
import { day } from "@/lib/dateHelpers";

export function hasRecordedPracticeOnDate(
  step: Step | StepDTO,
  date: Date | number,
  collectionId?: string
): boolean {
  const dayStart = day(date);

  return Boolean(
    step.practice_records &&
      step.practice_records.some(
        record =>
          record.start_of_day === dayStart &&
          (!collectionId || record.collection_id === collectionId)
      )
  );
}

export function hasRecordedPracticeToday(
  step: Step | StepDTO,
  collectionId?: string
): boolean {
  return hasRecordedPracticeOnDate(step, Date.now(), collectionId);
}
