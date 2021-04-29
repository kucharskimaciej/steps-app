<script lang="ts">
export default {};
</script>

<template>
  <div
    tabindex="-1"
    class="text-2xl text-white leading-none
        p-1 inline-flex rounded
        cursor-pointer select-none outline-none"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>
<style lang="scss" scoped>
div {
  text-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }
}
</style>
