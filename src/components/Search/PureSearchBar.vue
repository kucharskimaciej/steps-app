<script lang="ts">
import { Prop, Component, Vue, Emit } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: {
    PureIcon
  }
})
export default class PureSearchBar extends Vue {
  @Prop() private initialQuery!: string;

  get query() {
    return this.initialQuery;
  }

  set query(value: string) {
    this.searchChange(value);
  }

  @Emit()
  searchChange(_query: string) {}
}
</script>

<template>
  <div class="relative text-gray-700 w-full">
    <input
      v-model.trim="query"
      type="text"
      placeholder="Search steps"
      class="w-full font-light bg-gray-200 outline-none rounded pl-3 pr-10 py-2 border border-gray-200 focus:bg-gray-100 focus:border-gray-100"
    />
    <PureIcon
      type="search"
      class="w-4 absolute right-0 top-0 mt-3 mr-4 fill-current"
    />
  </div>
</template>
