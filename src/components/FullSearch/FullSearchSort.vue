<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {
  SearchSort,
  SortDirection,
  sortDirectionLabels,
  SortType,
  sortTypeLabels
} from "@/components/FullSearch/types";
import FormGroup from "@/components/Forms/FormGroup.vue";
import Select from "@/components/Forms/Select.vue";
import { validationMixin } from "vuelidate";

@Component({
  components: {
    FormGroup,
    Select
  },
  mixins: [validationMixin],
  validations(this: FullSearchSort) {
    return {
      sort: {
        type: {},
        direction: {}
      }
    };
  }
})
export default class FullSearchSort extends Vue {
  @Prop({
    default: () => ({
      type: SortType.SCORE,
      direction: SortDirection.DESCENDING
    })
  })
  private sort!: SearchSort;

  get sortTypes() {
    return sortTypeLabels;
  }

  get sortDirections() {
    return sortDirectionLabels;
  }

  @Watch("sort", { deep: true })
  handleSearchChange(newSearch: SearchSort) {
    this.$emit("input", newSearch);
  }
}
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
