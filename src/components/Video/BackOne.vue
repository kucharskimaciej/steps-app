<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Control from "./Control.vue";
import PureIcon from "../PureIcon/PureIcon.vue";

@Component({
  components: {
    Control,
    PureIcon
  }
})
export default class BackOne extends Vue {}
</script>

<template>
  <Control v-on="$listeners">
    <PureIcon class="text-2xl" type="chevron_left" />
  </Control>
</template>
