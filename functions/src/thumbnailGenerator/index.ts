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
    video => !video.thumbnail_url || !video.snapshot_url
  );

  if (!hasUnprocessedVideos) {
    logger.log("All videos for step already processed, skipping...");
    return;
  }

  const updatedVideos = await Promise.all(
    updatedStep.videos.map(async video => {
      if (video.thumbnail_url && video.snapshot_url) {
        return video;
      }

      const result = await generateThumbnailAndPreview(
        updatedStep.owner_uid,
        video
      );

      logger.log(`Files for video ${video.hash} ready: `, result);

      return {
        ...video,
        thumbnail_url: result.thumbnailUrl,
        snapshot_url: result.snapshotUrl
      };
    })
  );

  await change.after.ref.set({ videos: updatedVideos }, { merge: true });
}

async function generateThumbnailAndPreview(
  userId: string,
  video: VideoObject
): Promise<{ snapshotUrl: string; thumbnailUrl: string }> {
  logger.log(`Processing new video ${video.hash}`);

  const snapshotPath = normalize(
    join(SNAPSHOT_DIRECTORY, userId, `${video.hash}.png`)
  );

  const thumbnailPath = normalize(
    join(THUMBNAIL_DIRECTORY, userId, `${video.hash}.png`)
  );

  const tempVideoPath = join(tmpdir(), `video_${video.hash}`);
  const tempSnapshotPath = join(tmpdir(), `snapshot_${video.hash}.png`);
  const tempThumbnailPath = join(tmpdir(), `thumbnail_${video.hash}.png`);

  logger.log(`Downloading to ${tempVideoPath}...`);
  await pipeline(got.stream(video.url), createWriteStream(tempVideoPath));

  logger.log(`File downloaded to: ${tempVideoPath}, processing...`);
  const bucket = admin.storage().bucket();
  const snapshotFile = bucket.file(snapshotPath);
  const thumbnailFile = bucket.file(thumbnailPath);

  try {
    await Promise.all([
      wrapCommand(
        ffmpeg(tempVideoPath).takeScreenshots({
          count: 1,
          folder: tmpdir(),
          filename: `snapshot_${video.hash}.png`,
          timemarks: ["50%"]
        })
      ),
      wrapCommand(
        ffmpeg(tempVideoPath).takeScreenshots({
          count: 1,
          folder: tmpdir(),
          filename: `thumbnail_${video.hash}.png`,
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

  logger.log("Images uploaded, removing temp files...");
  [tempVideoPath, tempSnapshotPath, tempThumbnailPath].forEach(path =>
    unlinkSync(path)
  );

  logger.log("Cleaned-up, signing files...");
  const [[snapshotUrl], [thumbnailUrl]] = await Promise.all([
    snapshotFile.getSignedUrl({
      action: "read",
      expires: "01-01-2500"
    }),
    thumbnailFile.getSignedUrl({
      action: "read",
      expires: "01-01-2500"
    })
  ]);

  return {
    snapshotUrl,
    thumbnailUrl
  };
}

function wrapCommand(command: FfmpegCommand): Promise<void> {
  return new Promise((resolve, reject) => {
    command.on("end", () => resolve()).on("error", err => reject(err));
  });
}
