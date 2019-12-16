import { Tag } from "./Tag";
import { DatabaseItem } from "./common/DatabaseItem";

export type VideoSource = "google_photos";

export interface Video {
  source: VideoSource;
  url: string;
}

export type Media = Video;
export interface Step extends DatabaseItem {
  id: number; // internal, auto-incremented identifier assigned per user
  owner_uid: string;
  name: string;
  media: Media[];
  tags?: Tag[];
  last_practiced_at?: number;
  last_viewed_at?: number;
  updated_at?: number;
  created_at: number;
}
