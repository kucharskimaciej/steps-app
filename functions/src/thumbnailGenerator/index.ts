import admin from "firebase-admin";
import { logger } from "firebase-functions";
import ffmpeg, { FfmpegCommand } from "fluent-ffmpeg";
import { join, normalize } from "path";
import { tmpdir } from "os";
import { unlinkSync, createWriteStream } from "fs";
import { promisify } from "util";
import stream from "stream";
import got from "got";
import { Change } from "firebase-functions/lib/cloud-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { VideoObject } from "../../../common/types/VideoObject";
import { RawStep } from "../../../common/types/Step";

const SNAPSHOT_DIRECTORY = "snapshots";
const THUMBNAIL_DIRECTORY = "thumbnails";

const pipeline = promisify(stream.pipeline);

export default async function handler(
  change: Change<DocumentSnapshot>
): Promise<void> {
  logger.log(
    `Function run for document ${change.after.id}`,
    change.after.data()
  );
  if (!change.after.exists) {
    // file deleted
    return;
  }

  const updatedStep = change.after.data() as RawStep;
  const hasUnprocessedVideos = updatedStep.videos.some(
    video => !hasBeenProcessed(video)
  );

  if (!hasUnprocessedVideos) {
    logger.log("All videos for step already processed, skipping...");
    return;
  }

  const updatedVideos = await Promise.all(
    updatedStep.videos.map(async video => {
      if (hasBeenProcessed(video)) {
        return video;
      }

      const result = await processVideo(updatedStep.owner_uid, video);

      logger.log(`Files for video ${video.hash} ready: `, result);

      return {
        ...video,
        thumbnail_url: result.thumbnailUrl,
        snapshot_url: result.snapshotUrl,
        width: result.width,
        height: result.height
      };
    })
  );

  await change.after.ref.set({ videos: updatedVideos }, { merge: true });
}

async function processVideo(
  userId: string,
  video: VideoObject
): Promise<{
  snapshotUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
}> {
  logger.log(`Processing new video ${video.hash}`);

  const snapshotPath = normalize(
    join(SNAPSHOT_DIRECTORY, userId, `${video.hash}.jpg`)
  );

  const thumbnailPath = normalize(
    join(THUMBNAIL_DIRECTORY, userId, `${video.hash}.jpg`)
  );

  const tempVideoPath = join(tmpdir(), `video_${video.hash}`);
  const tempSnapshotPath = join(tmpdir(), `snapshot_${video.hash}.jpg`);
  const tempThumbnailPath = join(tmpdir(), `thumbnail_${video.hash}.jpg`);

  logger.log(`Downloading to ${tempVideoPath}...`);
  await pipeline(got.stream(video.url), createWriteStream(tempVideoPath));

  logger.log(`File downloaded to: ${tempVideoPath}, processing...`);
  const bucket = admin.storage().bucket();

  try {
    await Promise.all([
      wrapCommand(
        ffmpeg(tempVideoPath).takeScreenshots({
          count: 1,
          folder: tmpdir(),
          filename: `snapshot_${video.hash}.jpg`,
          timemarks: ["50%"]
        })
      ),
      wrapCommand(
        ffmpeg(tempVideoPath).takeScreenshots({
          count: 1,
          folder: tmpdir(),
          filename: `thumbnail_${video.hash}.jpg`,
          timemarks: ["50%"],
          size: "256x?"
        })
      )
    ]);
  } catch (err) {
    logger.error(`Failed to create image`, err.message);
    logger.error(err);
    throw err;
  }

  logger.log("Images created successfully, uploading...");
  await Promise.all([
    bucket.upload(tempThumbnailPath, { destination: thumbnailPath }),
    bucket.upload(tempSnapshotPath, { destination: snapshotPath })
  ]);
  logger.log("Images uploaded");
  logger.log("Getting video dimensions...");
  const { width, height } = await getVideoDimensions(tempVideoPath);
  logger.log("Got dimensions", width, height);

  logger.log("Removing temp files...");
  [tempVideoPath, tempSnapshotPath, tempThumbnailPath].forEach(path =>
    unlinkSync(path)
  );

  logger.log("Cleaned-up, signing files...");

  return {
    snapshotUrl: snapshotPath,
    thumbnailUrl: thumbnailPath,
    width,
    height
  };
}

function wrapCommand(command: FfmpegCommand): Promise<void> {
  return new Promise((resolve, reject) => {
    command.on("end", () => resolve()).on("error", err => reject(err));
  });
}

function getVideoDimensions(
  pathToVideo: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    ffmpeg(pathToVideo).ffprobe((err, data) => {
      if (err) {
        return reject(err);
      }

      const { width, height } = data.streams[0];
      logger.debug(`Resolved ${pathToVideo} to be ${width}x${height}`);
      resolve({ width: width!, height: height! });
    });
  });
}

function hasBeenProcessed(video: VideoObject): boolean {
  const requiredValues: Array<keyof VideoObject> = [
    "snapshot_url",
    "thumbnail_url",
    "width",
    "height"
  ];

  return requiredValues.every(key => Boolean(video[key]));
}
