import { KeyValueTuple } from "@/components/Forms/TagsSelection/types";
import { ReadonlyRecord } from "../../../common/types/helperTypes";
import { Feeling } from "../../../common/types/Step";

export type SearchFilters = {
  query: string;
  feeling: KeyValueTuple<Feeling>[];
  includeAllTags: string[];
  excludeAnyTags: string[];
  anyArtists: string[];
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
