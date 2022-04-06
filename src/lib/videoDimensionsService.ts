import { Service } from "typedi";
import { VideoObject } from "../../common/types/VideoObject";

export type VideoMetadata = {
  width: number;
  height: number;
};

@Service()
export class VideoDimensionsService {
  getVideoDimensions(video: string | VideoObject): Promise<VideoMetadata> {
    return new Promise((resolve) => {
      if (isVideoObject(video) && video.width && video.height) {
        return resolve(video as VideoMetadata);
      }

      const videoEl = document.createElement("video");
      videoEl.crossOrigin = "anonymous";
      videoEl.src = isVideoObject(video) ? video.url : video;
      videoEl.currentTime = 1;

      videoEl.addEventListener(
        "loadeddata",
        () => {
          resolve({
            width: videoEl.videoWidth,
            height: videoEl.videoHeight,
          });
        },
        { once: true }
      );
    });
  }
}

function isVideoObject(x: string | VideoObject): x is VideoObject {
  return !!(x as VideoObject).url;
}
