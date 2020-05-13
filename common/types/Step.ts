import { Tag } from "./Tag";
import { DatabaseItem } from "./common/DatabaseItem";

export type StepDifficulty = 1 | 2 | 3 | 5 | 8;
export type Dance = "semba" | "kizomba" | "fusion" | "tarraxa" | "urban";

interface CommonFields extends DatabaseItem {
  identifier: number; // internal, auto-incremented identifier assigned per user
  owner_uid: string;
  name: string;
  url: string;
  last_practiced_at?: number;
  last_viewed_at?: number;
  updated_at?: number;
  created_at: number;
  notes: string;
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
}
