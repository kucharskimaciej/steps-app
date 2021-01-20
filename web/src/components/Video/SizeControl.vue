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
export default class SizeControl extends Vue {}
</script>

<template>
  <Control v-on="$listeners">
    <PureIcon type="fullscreen" />
  </Control>
</template>
