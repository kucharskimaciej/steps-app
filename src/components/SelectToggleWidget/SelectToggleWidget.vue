<script lang="ts">
import { defineComponent } from "vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const SelectToggleWidget = defineComponent({
  components: {
    PureIcon,
  },
  props: {
    selected: Boolean,
  },
  emits: ["toggle"],
});

export default SelectToggleWidget;
</script>

<template>
  <label
    class="block leading-none text-2xl cursor-pointer opacity-75 hover:opacity-100"
    @click.stop="() => {}"
  >
    <input
      type="checkbox"
      :checked="selected"
      class="hidden"
      @change.stop="$emit('toggle')"
    />
    <PureIcon v-if="selected" type="check_box" />
    <PureIcon v-else type="check_box_outline_blank" />
  </label>
</template>
