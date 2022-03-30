<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import PureButton from "@/components/PureButton/PureButton.vue";

@Component({
  components: {
    PureIcon,
    PureButton
  }
})
export default class SearchWidget extends Vue {
  @Prop() private searchActive!: boolean;
}
</script>

<template>
  <PureButton
    kind="ghost"
    v-bind="$attrs"
    class="inline-flex justify-center items-center relative select-none"
    v-on="$listeners"
  >
    <PureIcon type="search" class="text-xl mt-px mr-1 -ml-1" />
    Search
    <slot v-if="searchActive" name="activeSearch">
      <span class="bg-mono-200 ml-2 -mt-px rounded-full w-3 h-3"></span>
    </slot>
  </PureButton>
</template>
