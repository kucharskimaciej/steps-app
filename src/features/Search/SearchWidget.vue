<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: {
    PureIcon
  }
})
export default class SearchWidget extends Vue {
  @Prop() private searchActive!: boolean;
}
</script>

<template>
  <div
    v-bind="$attrs"
    class="text-sm inline-flex justify-center items-center relative rounded-full cursor-pointer select-none"
    v-on="$listeners"
  >
    <PureIcon type="search" class="text-xl mt-px mr-1 -ml-1" />
    Search
    <slot v-if="searchActive" name="activeSearch">
      <span class="bg-mono-200 ml-2 -mt-px rounded-full w-3 h-3"></span>
    </slot>
  </div>
</template>
