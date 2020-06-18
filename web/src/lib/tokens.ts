import { Token } from "vue-typedi";
import { DuplicateLocator } from "@/lib/duplicateLocator.interface";
import { RawStep } from "../../../common/types/Step";
import { Uploader } from "@/lib/uploader.interface";

export const StepsDuplicateLocatorToken = new Token<
  DuplicateLocator<RawStep, string>
>("StepsByUrlDuplicateLocatorToken");

export const VideoUploaderToken = new Token<Uploader>("VideoUploaderToken");
