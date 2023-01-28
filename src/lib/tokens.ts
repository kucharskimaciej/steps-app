import { Token } from "typedi";
import { DuplicateLocator } from "@/lib/duplicateLocator.interface";
import { StepDTO } from "../../common/types/Step";
import { Uploader } from "@/lib/uploader.interface";
import { FileStorage } from "@/lib/fileStorage.interface";

export const StepsDuplicateLocatorToken = new Token<
  DuplicateLocator<StepDTO, string>
>("StepsByUrlDuplicateLocatorToken");

export const VideoUploaderToken = new Token<Uploader>("VideoUploaderToken");
export const StorageServiceToken = new Token<FileStorage>("FileStorage");
