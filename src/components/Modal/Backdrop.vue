<script lang="ts">
import { defineComponent } from "vue";

const Backdrop = defineComponent({});
export default Backdrop;
</script>

<template>
  <aside class="absolute inset-0 bg-black opacity-25" v-bind="$attrs" />
</template>
