import { RawStep } from "../../../common/types/Step";

export interface DuplicateLocator<ElementType, KeyType> {
  isDuplicate(key: KeyType, ignoreId?: string): boolean;
  getDuplicate(key: KeyType, ignoreId?: string): ElementType | void;
}

export type StepDuplicateLocator<
  T extends RawStep = RawStep
> = DuplicateLocator<T, string>;
