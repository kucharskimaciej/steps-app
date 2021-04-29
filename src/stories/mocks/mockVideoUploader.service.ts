import { Service } from "vue-typedi";
import { VideoUploaderToken } from "@/lib/tokens";
import { Uploader } from "@/lib/uploader.interface";

@Service(VideoUploaderToken)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MockVideoUploaderService implements Uploader {
  upload(file: File, hash: string): Promise<string> {
    return Promise.resolve(`http://example.com/videos/${hash}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exists(name: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}
