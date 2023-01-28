import { UploadTask } from "@/lib/firebase/firebase";

export interface FileStorage {
  upload(path: string, file: File): UploadTask;
  exists(path: string): Promise<boolean>;
  getPublicUrl(path: string): Promise<string>;
}
