<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Progress extends Vue {
  @Prop({ default: 0 }) private current!: number;
  @Prop({ required: true }) private total!: number;

  get progress() {
    return (this.current / this.total) * 100;
  }
}
</script>

<template>
  <div class="w-full">
    <div
      class="progress bg-green-lighter"
      :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  height: 3px;
}
</style>
