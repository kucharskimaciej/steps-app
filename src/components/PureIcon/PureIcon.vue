<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const PureIcon = defineComponent({
  props: {
    type: String
  }
});

export default PureIcon;
</script>

<template>
  <i class="material-icons align-middle -mt-px">{{ type }}</i>
</template>
