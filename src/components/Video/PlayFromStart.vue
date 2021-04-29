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
export default class PlayFromStart extends Vue {}
</script>

<template>
  <Control v-on="$listeners">
    <PureIcon class="text-2xl" type="first_page" />
  </Control>
</template>
