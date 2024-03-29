import { Inject, Service } from "typedi";
import { StorageService } from "@/lib/firebase/storage.service";
import { provideStore } from "@/store";
import { Uploader } from "@/lib/uploader.interface";
import { StorageServiceToken, VideoUploaderToken } from "@/lib/tokens";

@Service(VideoUploaderToken)
export class VideoUploadService implements Uploader {
  @Inject(StorageServiceToken)
  private readonly storage!: StorageService;

  async upload(file: File, hash: string): Promise<string> {
    if (await this.exists(hash)) {
      return this.storage.getPublicUrl(this.getVideoUploadPath(hash));
    }

    const snapshot = await this.storage.upload(
      this.getVideoUploadPath(hash),
      file
    );

    console.log(await snapshot.ref.getDownloadURL());

    return snapshot.ref.getDownloadURL();
  }

  exists(hash: string): Promise<boolean> {
    return this.storage.exists(this.getVideoUploadPath(hash));
  }

  getVideoUploadPath(hash: string): string {
    return `videos/${provideStore().state.auth.uid}/${hash}`;
  }
}
