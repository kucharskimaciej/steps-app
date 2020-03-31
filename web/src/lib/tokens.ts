import { Token } from "vue-typedi";
import { DuplicateLocator } from "@/lib/duplicateLocator.interface";
import { RawStep } from "../../../common/types/Step";

export const StepsByUrlDuplicateLocatorToken = new Token<
  DuplicateLocator<RawStep, string>
>("StepsByUrlDuplicateLocatorToken");
