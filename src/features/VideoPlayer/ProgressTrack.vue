<script lang="ts">
import { computed, defineComponent } from "vue";

const ProgressTrack = defineComponent({
  props: {
    current: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const progress = computed(() => (props.current / props.total) * 100);
    return { progress };
  },
});

export default ProgressTrack;
</script>

<template>
  <div class="w-full">
    <div class="progress bg-white" :style="{ width: progress + '%' }" />
  </div>
</template>

<style lang="scss" scoped>
.progress {
  height: 3px;
}
</style>
