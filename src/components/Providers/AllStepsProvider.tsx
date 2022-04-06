import { dispatchFetchAllSteps, useStore } from "@/store";
import { computed, defineComponent, onBeforeMount } from "vue";

const AllStepsProvider = defineComponent({
  props: {
    alwaysFetch: Boolean,
  },
  setup({ alwaysFetch }, { slots }) {
    const store = useStore();
    const loading = computed(() => store.state.steps.status === "pending");

    async function loadSteps() {
      if (!alwaysFetch && store.state.steps.status !== "clean") {
        return;
      }

      await dispatchFetchAllSteps(store);
    }

    onBeforeMount(loadSteps);

    return () => {
      if (loading.value) {
        return slots.loading?.() || <div>Loading</div>;
      } else {
        return slots.default?.();
      }
    };
  },
});

export default AllStepsProvider;
