import { RawStep } from "../../../common/types/Step";
import { VideoObject } from "../../../common/types/VideoObject";

export interface DuplicateLocator<ElementType, KeyType> {
  isDuplicate(key: KeyType, ignoreId?: string): boolean;
  getDuplicate(key: KeyType, ignoreId?: string): ElementType | void;
}

export type StepDuplicateLocator<
  T extends RawStep = RawStep
> = DuplicateLocator<T, VideoObject>;
