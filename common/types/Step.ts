import { Tag } from "./Tag";
import { DatabaseItem } from "./common/DatabaseItem";
import { VideoObject } from "./VideoObject";
import { Owned } from "./common/Owned";
import { PracticeRecord } from "./PracticeRecord";

export type StepDifficulty = 1 | 2 | 3 | 5 | 8;
export type Dance = "semba" | "kizomba" | "fusion" | "tarraxa" | "urban";
export type StepKind = "step" | "routine" | "inspiration";

interface CommonFields extends DatabaseItem, Owned {
  identifier: number; // internal, auto-incremented identifier assigned per user
  name: string;
  videos: VideoObject[];
  last_viewed_at?: number;
  updated_at?: number;
  created_at: number;
  notes: string;
  variationKey: string;
  practice_records?: PracticeRecord[];
  view_records?: number[];
}

export interface RawStep extends CommonFields {
  tags: string[];
  difficulty: StepDifficulty;
  dance: Dance[];
  artists: string[];
  smart_tags: string[];
  removed_smart_tags: string[];
  tokens: string[];
  kind: StepKind;
}

export type TagCategory =
  | "dance"
  | "difficulty"
  | "artist"
  | "content"
  | "meta"
  | "kind"
  | "all";

export type TagCategories = Record<TagCategory, Tag[]>;

export interface Step extends CommonFields {
  tags: TagCategories;
  variations: StepRef[];
}

export type StepRef = Pick<CommonFields, "identifier" | "name" | "id">;
