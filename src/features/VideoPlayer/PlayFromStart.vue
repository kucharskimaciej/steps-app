<script lang="ts">
import { defineComponent } from "vue";
import Control from "@/features/VideoPlayer/Control.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const PlayFromStart = defineComponent({
  components: {
    Control,
    PureIcon,
  },
  props: {},
});

export default PlayFromStart;
</script>

<template>
  <Control v-on="$listeners">
    <PureIcon class="text-2xl" type="first_page" />
  </Control>
</template>
