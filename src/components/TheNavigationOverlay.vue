<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";
import { useUi } from "@/uiContext";
import PureButton from "./PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const TheNavigationOverlay = defineComponent({
  components: {
    PureButton,
    PureIcon
  },
  setup() {
    const ui = useUi();

    return {
      open: computed(() => ui?.navigationOpen.value),
      toggle() {
        ui?.toggleNavigation();
      }
    };
  }
});

export default TheNavigationOverlay;
</script>

<template>
  <div
    class="desktop:hidden relative z-10"
    :class="{
      invisible: !open,
      visible: open
    }"
  >
    <aside
      class="fixed inset-0 bg-mono-black transition-all"
      :class="{
        'bg-opacity-40': open,
        'bg-opacity-0': !open
      }"
      @click="toggle()"
    ></aside>
    <main
      class="fixed inset-y-0 transition-transform w-4/5 bg-mono-900 flex flex-col p-5"
      :class="{
        '-translate-x-full': !open,
        'translate-x-0': open
      }"
    >
      <section>
        <header></header>
        <nav class="text-left text-lg font-normal">
          <router-link to="/feed">
            <template #default="{ navigate, href, isActive }">
              <a
                :href="href"
                class="py-2 block hover:text-mono-100"
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
      </section>
    </main>
  </div>
</template>
