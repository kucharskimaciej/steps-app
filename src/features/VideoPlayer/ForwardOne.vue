<script lang="ts">
import { defineComponent } from "vue";
import Control from "@/features/VideoPlayer/VideoControl.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const ForwardOne = defineComponent({
  components: {
    Control,
    PureIcon,
  },
  props: {},
  emits: [],
});

export default ForwardOne;
</script>

<template>
  <Control v-bind="$attrs">
    <PureIcon class="text-2xl" type="chevron_right" />
  </Control>
</template>
