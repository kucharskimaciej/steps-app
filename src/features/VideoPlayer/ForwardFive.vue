<script lang="ts">
import { defineComponent } from "vue";
import Control from "@/features/VideoPlayer/Control.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const ForwardFive = defineComponent({
  components: {
    Control,
    PureIcon
  }
});

export default ForwardFive;
</script>

<template>
  <Control v-bind="$attrs">
    <PureIcon class="text-2xl" type="arrow_forward_ios" />
  </Control>
</template>
