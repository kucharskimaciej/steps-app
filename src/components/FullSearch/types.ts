import { KeyValueTuple } from "@/components/Forms/TagsSelection/types";
import { Tag, TagTypes } from "../../../common/types/Tag";
import { ReadonlyRecord } from "../../../common/types/helperTypes";

export type SearchFilters = {
  query: string;
  feeling: KeyValueTuple[];
  includeAllTags: Tag[];
  excludeAnyTags: Tag[];
  anyArtists: Tag<TagTypes.ARTIST>[];
};

export enum SortType {
  SCORE = "SCORE",
  VIEW_DATE = "VIEW_DATE",
  VIEW_COUNT = "VIEW_COUNT",
  PRACTICE_DATE = "PRACTICE_DATE",
  ADDED_DATE = "ADDED_DATE",
  RANDOM = "RANDOM"
}

export enum SortDirection {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING"
}

export type SearchSort = {
  type: SortType;
  direction: SortDirection;
};

export const sortTypeLabels: ReadonlyRecord<SortType, string> = {
  [SortType.RANDOM]: "Random",
  [SortType.SCORE]: "Score",
  [SortType.ADDED_DATE]: "Date added",
  [SortType.PRACTICE_DATE]: "Last practice date",
  [SortType.VIEW_COUNT]: "View count",
  [SortType.VIEW_DATE]: "Last view date"
};

export const sortDirectionLabels: ReadonlyRecord<SortDirection, string> = {
  [SortDirection.ASCENDING]: "Ascending",
  [SortDirection.DESCENDING]: "Descending"
};

export type Search = {
  filters: SearchFilters;
  sort: SearchSort;
};
