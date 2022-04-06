<script lang="ts">
import { defineComponent } from "vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const PureToggleButton = defineComponent({
  components: { PureButton, PureIcon },
  props: {
    toggled: Boolean,
  },
  emits: [],
});

export default PureToggleButton;
</script>

<template>
  <PureButton :kind="toggled ? 'primary' : 'ghost'" size="large">
    <PureIcon type="check" class="text-3xl" />
  </PureButton>
</template>
