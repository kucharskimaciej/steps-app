<script lang="ts">
import { defineComponent, PropType, watch } from "@vue/composition-api";
import FormGroup from "@/components/Forms/FormGroup.vue";
import Select from "@/components/Forms/Select.vue";
import {
  SearchSort,
  SortDirection,
  sortDirectionLabels,
  SortType,
  sortTypeLabels
} from "@/features/Search/types";
import { validationMixin } from "vuelidate";

const FullSearchSort = defineComponent({
  mixins: [validationMixin],
  validations() {
    return {
      sort: {
        type: {},
        direction: {}
      }
    };
  },
  components: {
    FormGroup,
    Select
  },
  props: {
    sort: {
      type: Object as PropType<SearchSort>,
      default: () => ({
        type: SortType.SCORE,
        direction: SortDirection.DESCENDING
      })
    }
  },
  emits: ["input"],
  setup({ sort }, ctx) {
    watch(
      () => sort,
      (newSearch: SearchSort) => ctx.emit("input", newSearch),
      { deep: true }
    );

    return {
      sortDirections: sortDirectionLabels,
      sortTypes: sortTypeLabels
    };
  }
});

export default FullSearchSort;
</script>

<template>
  <section class="desktop:flex">
    <FormGroup
      label="Sort by"
      :validation="$v.sort.type"
      class="desktop:w-1/2 desktop:pr-3"
    >
      <Select v-model.lazy.trim="$v.sort.type.$model">
        <option v-for="(label, value) in sortTypes" :key="value" :value="value">
          {{ label }}
        </option>
      </Select>
    </FormGroup>

    <FormGroup
      label="Direction"
      :validation="$v.sort.direction"
      class="desktop:w-1/2 desktop:pl-3"
    >
      <Select v-model.lazy.trim="$v.sort.direction.$model">
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
