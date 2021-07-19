import { Search } from "@/components/FullSearch/types";

export type GetSearchFn = () => Search;
export type SetSearchFn = (search: Search) => void;
export type ClearSearchFn = () => void;
