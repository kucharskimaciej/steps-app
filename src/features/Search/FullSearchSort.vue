<script lang="ts">
import { defineComponent, PropType, reactive, watch } from "vue";
import FormGroup from "@/components/Forms/FormGroup.vue";
import Select from "@/components/Forms/Select.vue";
import {
  SearchSort,
  SortDirection,
  sortDirectionLabels,
  SortType,
  sortTypeLabels,
} from "@/features/Search/types";
import { useForm } from "vee-validate";
import { debounce } from "lodash";

const FullSearchSort = defineComponent({
  components: {
    FormGroup,
    Select,
  },
  props: {
    sort: {
      type: Object as PropType<SearchSort>,
      default: () => ({
        type: SortType.SCORE,
        direction: SortDirection.DESCENDING,
      }),
    },
  },
  emits: ["input"],
  setup(props, ctx) {
    const state = reactive<{ data: SearchSort }>({
      data: props.sort,
    });

    const form = useForm<SearchSort>({
      initialValues: state.data,
    });

    watch(
      form.values,
      debounce((value) => {
        ctx.emit("input", value);
      }, 50),
      { immediate: true, deep: true }
    );

    return {
      form,
      type: form.defineComponentBinds("type"),
      direction: form.defineComponentBinds("direction"),
      sortDirections: sortDirectionLabels,
      sortTypes: sortTypeLabels,
    };
  },
});

export default FullSearchSort;
</script>

<template>
  <section class="desktop:flex">
    <FormGroup label="Sort by" name="type" class="desktop:w-1/2 desktop:pr-3">
      <Select v-bind="type">
        <option v-for="(label, value) in sortTypes" :key="value" :value="value">
          {{ label }}
        </option>
      </Select>
    </FormGroup>

    <FormGroup
      label="Direction"
      name="direction"
      class="desktop:w-1/2 desktop:pl-3"
    >
      <Select v-bind="direction">
        <option
          v-for="(label, value) in sortDirections"
          :key="value"
          :value="value"
        >
          {{ label }}
        </option>
      </Select>
    </FormGroup>
  </section>
</template>
