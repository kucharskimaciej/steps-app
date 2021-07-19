import { searchMixin } from "@/store/mixins/withSearch";
import { createModule } from "@/store/createModule";

const search = searchMixin("feed");

export const feed = createModule(
  {
    getters: {
      ...search.getters
    },
    mutations: {
      ...search.mutations
    },
    actions: {
      ...search.actions
    }
  },
  {
    ...search.state
  }
);

export const {
  dispatchSearch,
  dispatchClearSearch,
  commitSetSearch,
  getSearch,
  getIsSearchEmpty
} = search;
