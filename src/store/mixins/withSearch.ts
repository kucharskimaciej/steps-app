import { Accessors, ModuleWithState } from "@/store/createModule";
import { Search, SortDirection, SortType } from "@/components/FullSearch/types";
import {
  ActionHandlerNoPayload,
  ActionHandlerWithPayload,
  getStoreAccessors,
  GetterHandler,
  MutationHandlerWithPayload
} from "typesafe-vuex";
import { RootState } from "@/store/types";

export type SearchState = {
  search: Search;
};

function initialSearch(): Search {
  return {
    filters: {
      query: "",
      anyArtists: [],
      includeAllTags: [],
      feeling: [],
      excludeAnyTags: []
    },
    sort: {
      type: SortType.SCORE,
      direction: SortDirection.DESCENDING
    }
  };
}

export function provideSearchState(): SearchState {
  return { search: initialSearch() };
}

export function searchMixin(namespace: string) {
  const setSearch: MutationHandlerWithPayload<SearchState, Search | null> = (
    state,
    payload: Search | null
  ) => {
    state.search = payload ? payload : initialSearch();
  };

  const search: ActionHandlerWithPayload<
    SearchState,
    RootState,
    Partial<Search>,
    void
  > = (context, value) => {
    commitSetSearch(context, {
      ...context.state.search,
      ...value
    });
  };

  const clearSearch: ActionHandlerNoPayload<
    SearchState,
    RootState,
    void
  > = context => {
    commitSetSearch(context, null);
  };

  const searchGetter: GetterHandler<SearchState, RootState, Search> = state =>
    state.search;

  const { commit, dispatch, read } = getStoreAccessors<SearchState, RootState>(
    namespace
  );

  const commitSetSearch = commit(setSearch);
  const dispatchSearch = dispatch(search);
  const dispatchClearSearch = dispatch(clearSearch);
  const getSearch = read(searchGetter);

  const moduleLike: Pick<ModuleWithState<SearchState>, "state"> &
    Accessors<SearchState> = {
    state: provideSearchState(),
    actions: {
      search,
      clearSearch
    },
    mutations: {
      setSearch
    },
    getters: {
      getSearch: searchGetter
    }
  };

  return {
    ...moduleLike,
    commitSetSearch,
    dispatchSearch,
    dispatchClearSearch,
    getSearch
  };
}
