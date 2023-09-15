<script lang="ts">
import { defineComponent, onMounted, ref, provide, computed, watch } from "vue";
import GlobalStyles from "@/components/GlobalStyles.vue";
import ModalContainer from "@/components/Modal/ModalContainer.vue";
import { AuthService } from "@/lib/firebase/auth.service";
import { Container } from "typedi";
import { uiContextKey } from "@/uiContext";
import TheNavigationOverlay from "@/components/TheNavigationOverlay.vue";
import { useRouter } from "vue-router";
import { dispatchHandleAuthStateChange, useStore } from "@/store";

const App = defineComponent({
  components: {
    GlobalStyles,
    ModalContainer,
    TheNavigationOverlay,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const firebaseAuth = Container.get(AuthService);
    onMounted(() => firebaseAuth.setup());

    firebaseAuth.onAuthStateChange((user) => {
      dispatchHandleAuthStateChange(store, user?.uid ?? "");
    });

    const navigationOpen = ref(false);

    function toggleNavigation() {
      navigationOpen.value = !navigationOpen.value;
    }

    provide(uiContextKey, {
      navigationOpen,
      toggleNavigation,
    });

    router.beforeEach((_to, _from, next) => {
      navigationOpen.value = false;
      next();
    });

    watch(
      () => navigationOpen.value,
      (value) => {
        if (value) {
          document.body.classList.add("overflow-hidden");
        } else {
          document.body.classList.remove("overflow-hidden");
        }
      }
    );

    return {
      ui: computed(() => navigationOpen.value),
    };
  },
});

export default App;
</script>

<template>
  <GlobalStyles>
    <router-view />
    <TheNavigationOverlay />
    <ModalContainer />
  </GlobalStyles>
</template>
