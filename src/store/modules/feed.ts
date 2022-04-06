import { searchMixin, SearchState } from "@/store/mixins/withSearch";
import { createModule } from "@/store/createModule";
import { provideStore } from "@/store";
import { Container } from "typedi";
import { SearchService } from "@/lib/StepSearch/search.service";
import { getStoreAccessors } from "typesafe-vuex";
import { RootState } from "@/store/types";

const MODULE_NAMESPACE = "feed";

const search = searchMixin(MODULE_NAMESPACE);

export const feed = createModule(
  {
    getters: {
      ...search.getters,
      stepsMatchingSearch(state): string[] {
        const searcher = Container.get(SearchService);
        const rawSteps = provideStore().state.steps.rawSteps;

        return searcher.search(rawSteps, state.search);
      },
    },
    mutations: {
      ...search.mutations,
    },
    actions: {
      ...search.actions,
    },
  },
  {
    ...search.state,
  }
);

export const {
  dispatchClearSearch,
  getIsSearchEmpty,
  getSearch,
  dispatchSearch,
} = search;

const { read } = getStoreAccessors<SearchState, RootState>(MODULE_NAMESPACE);

export const getStepsMatchingSearch = read(feed.getters.stepsMatchingSearch);
