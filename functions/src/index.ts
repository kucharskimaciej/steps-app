const functions = require("firebase-functions");
import { initializeApp } from "firebase-admin";
import thumbnailAndPreviewHandler from "./thumbnailGenerator";

initializeApp();

exports.generateThumbnailAndPreview = functions.firestore
  .document("steps/{stepId}")
  .onWrite(thumbnailAndPreviewHandler);
