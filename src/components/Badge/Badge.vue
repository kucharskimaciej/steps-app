<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const Badge = defineComponent({});

export default Badge;
</script>

<template>
  <span
    class="bg-mono-200 rounded-sm text-2xs text-mono-white font-bold px-1 py-1"
    v-on="$listeners"
    ><slot
  /></span>
</template>
