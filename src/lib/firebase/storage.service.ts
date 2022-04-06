import { Service } from "typedi";
import { firebase, UploadTask } from "@/lib/firebase/firebase";

@Service()
export class StorageService {
  private readonly storage = firebase.storage();

  upload(path: string, file: File): UploadTask {
    return this.storage.ref(path).put(file);
  }

  async exists(path: string): Promise<boolean> {
    try {
      await this.getPublicUrl(path);
      return true;
    } catch (err) {
      return false;
    }
  }

  getPublicUrl(path: string): Promise<string> {
    return this.storage.ref(path).getDownloadURL();
  }
}
