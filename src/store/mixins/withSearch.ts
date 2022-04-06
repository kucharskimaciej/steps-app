import { Accessors } from "@/store/createModule";
import { Search, SortDirection, SortType } from "@/features/Search/types";
import { getStoreAccessors } from "typesafe-vuex";
import { RootState } from "@/store/types";
import { isEqual } from "lodash";
import { ActionContext } from "vuex";

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
      excludeAnyTags: [],
    },
    sort: {
      type: SortType.ADDED_DATE,
      direction: SortDirection.DESCENDING,
    },
  };
}

export function provideSearchState(): SearchState {
  return { search: initialSearch() };
}

function accessorTypeInference<TAccessors extends Accessors<SearchState>>(
  accessors: TAccessors
): TAccessors {
  return accessors;
}

export function searchMixin(namespace: string) {
  const moduleLike = {
    state: provideSearchState(),
    ...accessorTypeInference({
      actions: {
        search(context, value) {
          commitSetSearch(context, {
            ...context.state.search,
            ...value,
          });
        },
        clearSearch(context: ActionContext<SearchState, RootState>) {
          commitSetSearch(context, null);
        },
      },
      mutations: {
        setSearch(state, payload) {
          state.search = payload ? payload : initialSearch();
        },
      },
      getters: {
        getSearch(state) {
          return state.search;
        },
        searchEmpty(state) {
          const emptySearchState = initialSearch();
          return !state.search || isEqual(state.search, emptySearchState);
        },
      },
    }),
  };

  const { commit, dispatch, read } = getStoreAccessors<SearchState, RootState>(
    namespace
  );

  const commitSetSearch = commit(moduleLike.mutations.setSearch);
  const dispatchSearch = dispatch(moduleLike.actions.search);
  const dispatchClearSearch = dispatch(moduleLike.actions.clearSearch);
  const getSearchAccessor = read(moduleLike.getters.getSearch);
  const getIsSearchEmpty = read(moduleLike.getters.searchEmpty);

  return {
    ...moduleLike,
    commitSetSearch,
    dispatchSearch,
    dispatchClearSearch,
    getSearch: getSearchAccessor,
    getIsSearchEmpty,
  };
}
