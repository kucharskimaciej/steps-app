<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import PureButton from "../PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const TheTopBar = defineComponent({
  components: {
    PureIcon,
    PureButton
  },
  props: {
    isNavigationOpen: Boolean
  },
  emits: ["openNavigation"]
});

export default TheTopBar;
</script>

<template>
  <header
    class="top-bar sticky top-0 z-10 shadow-sm shadow-mono-200/10 p-3 desktop:p-5 bg-mono-white"
  >
    <div>
      <slot name="left"></slot>
    </div>

    <div>
      <nav class="flex gap-4 text-xl font-normal hidden desktop:block">
        <router-link to="/feed">
          <template #default="{ navigate, href, isActive }">
            <a
              :href="href"
              class=""
              :class="{
                'text-mono-600': !isActive,
                'text-mono-100': isActive
              }"
              @click="navigate"
              >Feed</a
            >
          </template>
        </router-link>
      </nav>
    </div>

    <aside class="flex justify-end gap-4">
      <slot name="right"></slot>

      <div class="hidden desktop:block">
        <router-link to="/create-step">
          <template #default="{ navigate }">
            <PureButton kind="ghost" @click="navigate">Create step</PureButton>
          </template>
        </router-link>
      </div>

      <PureButton
        class="desktop:hidden"
        :class="{
          'navigation-open': isNavigationOpen
        }"
        kind="ghost"
        @click="$emit('openNavigation')"
      >
        <PureIcon type="menu" />
      </PureButton>
    </aside>
  </header>
</template>

<style lang="scss" scoped>
.top-bar {
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
}
</style>
