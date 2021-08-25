<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: {
    PureIcon
  }
})
export default class CopyToClipboard extends Vue {
  @Prop({ required: true }) private value!: string;

  copy() {
    navigator.clipboard.writeText(this.value);
  }
}
</script>

<template>
  <span class="cursor-pointer" @click="copy">
    <slot></slot>
  </span>
</template>
