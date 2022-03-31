<script lang="ts">
import { defineComponent } from "@vue/composition-api";
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
  <Control v-on="$listeners">
    <PureIcon class="text-2xl" type="arrow_forward_ios" />
  </Control>
</template>
