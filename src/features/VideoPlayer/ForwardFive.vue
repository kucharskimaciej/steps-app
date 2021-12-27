<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Control from "./Control.vue";
import PureIcon from "../../components/PureIcon/PureIcon.vue";

@Component({
  components: {
    Control,
    PureIcon
  }
})
export default class ForwardFive extends Vue {}
</script>

<template>
  <Control v-on="$listeners">
    <PureIcon class="text-2xl" type="arrow_forward_ios" />
  </Control>
</template>
