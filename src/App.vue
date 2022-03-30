<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  provide,
  computed,
  watch
} from "@vue/composition-api";
import GlobalStyles from "@/components/GlobalStyles.vue";
import ModalContainer from "@/components/Modal/ModalContainer.vue";
import { AuthService } from "@/lib/firebase/auth.service";
import { Container } from "vue-typedi";
import { uiContextKey } from "@/uiContext";
import TheNavigationOverlay from "@/components/TheNavigationOverlay.vue";

const App = defineComponent({
  components: {
    GlobalStyles,
    ModalContainer,
    TheNavigationOverlay
  },
  setup(_, { root }) {
    const firebaseAuth = Container.get(AuthService);
    onMounted(() => firebaseAuth.setup());

    const navigationOpen = ref(false);

    function toggleNavigation() {
      navigationOpen.value = !navigationOpen.value;
    }

    provide(uiContextKey, {
      navigationOpen,
      toggleNavigation
    });

    root.$router.beforeEach((to, from, next) => {
      navigationOpen.value = false;
      next();
    });

    watch(
      () => navigationOpen.value,
      value => {
        if (value) {
          document.body.classList.add("overflow-hidden");
        } else {
          document.body.classList.remove("overflow-hidden");
        }
      }
    );

    return {
      ui: computed(() => navigationOpen.value)
    };
  }
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
