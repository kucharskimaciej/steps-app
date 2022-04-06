import { StepDTO } from "../../common/types/Step";
import { VideoObject } from "../../common/types/VideoObject";

export interface DuplicateLocator<ElementType, KeyType> {
  isDuplicate(key: KeyType, ignoreId?: string): boolean;
  getDuplicate(key: KeyType, ignoreId?: string): ElementType | void;
}

export type StepDuplicateLocator<T extends StepDTO = StepDTO> =
  DuplicateLocator<T, VideoObject>;
