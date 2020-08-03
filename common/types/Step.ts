import { Tag } from "./Tag";
import { DatabaseItem } from "./common/DatabaseItem";
import { VideoObject } from "./VideoObject";
import { Owned } from "./common/Owned";

export type StepDifficulty = 1 | 2 | 3 | 5 | 8;
export type Dance = "semba" | "kizomba" | "fusion" | "tarraxa" | "urban";

interface CommonFields extends DatabaseItem, Owned {
  identifier: number; // internal, auto-incremented identifier assigned per user
  name: string;
  videos: VideoObject[];
  last_practiced_at?: number;
  last_viewed_at?: number;
  updated_at?: number;
  created_at: number;
  notes: string;
  variationKey: string;
}

export interface RawStep extends CommonFields {
  tags: string[];
  difficulty: StepDifficulty;
  dance: Dance[];
  artists: string[];
  smart_tags: string[];
  removed_smart_tags: string[];
  tokens: string[];
}

export interface Step extends CommonFields {
  tags: Tag[];
  variations: StepRef[];
}

export interface StepRef
  extends Pick<CommonFields, "identifier" | "name" | "id"> {}
