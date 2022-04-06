<script lang="ts">
import { defineComponent } from "vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import PureButton from "@/components/PureButton/PureButton.vue";

const SearchWidget = defineComponent({
  components: {
    PureIcon,
    PureButton
  },
  props: {
    searchActive: Boolean
  }
});

export default SearchWidget;
</script>

<template>
  <PureButton
    kind="ghost"
    v-bind="$attrs"
    class="inline-flex justify-center items-center relative select-none"
  >
    <PureIcon type="search" class="text-xl mt-px mr-1 -ml-1" />
    Search
    <slot v-if="searchActive" name="activeSearch">
      <span class="bg-mono-200 ml-2 -mt-px rounded-full w-3 h-3"></span>
    </slot>
  </PureButton>
</template>
