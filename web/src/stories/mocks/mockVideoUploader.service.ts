import { Service } from "vue-typedi";
import { VideoUploaderToken } from "@/lib/tokens";
import { Uploader } from "@/lib/uploader.interface";

@Service(VideoUploaderToken)
class MockVideoUploaderService implements Uploader {
  upload(file: File, hash: string): Promise<string> {
    return Promise.resolve(`http://example.com/videos/${hash}`);
  }

  exists(name: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}
