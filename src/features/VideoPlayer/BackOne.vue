<script lang="ts">
import { defineComponent } from "vue";
import Control from "@/features/VideoPlayer/VideoControl.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const BackOne = defineComponent({
  components: {
    Control,
    PureIcon,
  },
});

export default BackOne;
</script>

<template>
  <Control>
    <PureIcon class="text-2xl" type="chevron_left" />
  </Control>
</template>
