<script lang="ts">
import { defineComponent } from "vue";
import Control from "@/features/VideoPlayer/VideoControl.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const BackFive = defineComponent({
  components: {
    Control,
    PureIcon,
  },
});

export default BackFive;
</script>

<template>
  <Control v-bind="$attrs">
    <PureIcon class="text-2xl -mr-2" type="arrow_back_ios" />
  </Control>
</template>
