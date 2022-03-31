<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import Control from "@/features/VideoPlayer/Control.vue";

const MuteControl = defineComponent({
  components: {
    PureIcon,
    Control
  },
  props: {
    muted: {
      required: true,
      type: Boolean
    }
  }
});

export default MuteControl;
</script>

<template>
  <Control v-on="$listeners">
    <PureIcon v-if="muted" type="volume_off" />
    <PureIcon v-else type="volume_up" />
  </Control>
</template>
