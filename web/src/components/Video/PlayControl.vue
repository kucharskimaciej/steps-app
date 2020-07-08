<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import Control from "@/components/Video/Control.vue";

@Component({
  components: {
    PureIcon,
    Control
  }
})
export default class PlayControl extends Vue {}
</script>

<template>
  <div
    class="text-6xl text-white leading-none
        px-2 py-1 inline-flex rounded
        cursor-pointer select-none outline-none"
    v-on="$listeners"
  >
    <PureIcon type="play_circle_outline" />
  </div>
</template>

<style lang="scss" scoped>
div {
  text-shadow: 2px 4px 2px rgba(0, 0, 0, 0.1);
}
</style>
