<script lang="ts">
export default {};
</script>

<template>
  <div
    tabindex="-1"
    class="text-3xl text-white leading-none
        p-1 inline-flex rounded-full
        hover:bg-gray-300 hover:bg-opacity-25
        cursor-pointer select-none outline-none"
    v-on="$listeners"
  >
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
div {
  text-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
}
</style>
