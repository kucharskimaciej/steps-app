<script lang="ts">
import { defineComponent } from "vue";
import Control from "@/features/VideoPlayer/Control.vue";
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
  <Control v-on="$listeners">
    <PureIcon class="text-2xl" type="chevron_left" />
  </Control>
</template>
